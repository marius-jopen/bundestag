import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import BundestagGenerator from './components/generator.js'; // Assuming this is your generator component
import BundestagLooper from './components/looperFull.js'; // Your full looper component
import LatestFolderImageLooper from './components/looperLatest.js'; // Make sure the path matches your structure
import fs from 'fs';

const app = express();
const port = 4000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Assuming these paths match your project structure
const baseDir = 'E:\\output\\sd-api';
const bundestagGenerator = new BundestagGenerator(baseDir); // Initialize BundestagGenerator
const bundestagLooper = new BundestagLooper(baseDir); // Initialize BundestagLooper
const latestFolderImageLooper = new LatestFolderImageLooper(baseDir); // Initialize LatestFolderImageLooper

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('E:/output/sd-api/images'));



// Serve images dynamically from their path
app.get('/list-folders', async (req, res) => {
  try {
    // Assuming `baseDir` is the directory where your folders are located
    const folders = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());
    res.json(folders);
  } catch (error) {
    console.error('Failed to list folders', error);
    res.status(500).send('Failed to list folders');
  }
});

app.get('/images/*', (req, res) => {
  const filePath = req.params[0].replace(/\\/g, '/'); // Ensure we use forward slashes
  const absolutePath = path.join(baseDir, filePath);
  res.sendFile(absolutePath);
});

// New route for listing images from the latest folder
app.get('/list-latest-images', async (req, res) => {
  try {
    const images = await latestFolderImageLooper.findPngImagesInLatestFolder();
    res.json(images);
  } catch (error) {
    console.error('Error listing images from the latest folder:', error);
    res.status(500).json({ message: 'Error listing images from the latest folder.' });
  }
});

app.get('/list-static-images', async (req, res) => {
  const imagesDir = 'E:/output/sd-api/images';

  try {
    const files = await fs.promises.readdir(imagesDir);
    const imageFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
                            .sort((a, b) => fs.statSync(path.join(imagesDir, b)).mtime.getTime() - 
                                           fs.statSync(path.join(imagesDir, a)).mtime.getTime());
    res.json(imageFiles);
  } catch (error) {
    console.error('Failed to list images', error);
    // Make sure to return a JSON response
    res.status(500).json({ message: 'Failed to list images', error: error.message });
  }
});


// Add a new route to serve the images
app.get('/list-bundestag-images', async (req, res) => {
  try {
    const images = await bundestagLooper.findAllPngImages();
    res.json(images);
  } catch (error) {
    console.error('Error listing Bundestag images:', error);
    res.status(500).json({ message: 'Error listing Bundestag images.' });
  }
});

// New route for bundestag generation
app.post('/generate-bundestag', async (req, res) => {
  try {
    const { btUrl, info } = await bundestagGenerator.generateBundestag(req.body);
    res.json({ bts: [btUrl], info });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating or saving the video.' });
  }
});

// New route for Bundestag image generation
app.post('/generate-bundestag-image', async (req, res) => {
  try {
    const { imageUrl, info } = await bundestagGenerator.generateImage(req.body);
    res.json({ images: [imageUrl], info });
  } catch (error) {
    console.error('Error in generate-bundestag-image:', error);
    res.status(500).json({ message: 'Error generating or saving the Bundestag image.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
