import fs from 'fs';
import path from 'path';

class LatestFolderImageLooper {
  constructor(baseDir) {
    this.baseDir = baseDir; // Base directory containing folders
  }

  async findPngImagesInLatestFolder() {
    let directories = await fs.promises.readdir(this.baseDir, { withFileTypes: true });
    directories = directories
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name)
      .sort()
      .reverse(); // Sort directories in descending order

    if (directories.length === 0) {
      return []; // Return an empty array if no directories are found
    }

    // Only consider the latest folder
    const latestDir = directories[0];
    const latestDirPath = path.join(this.baseDir, latestDir);
    const files = await this.readDirForPngFiles(latestDirPath);
    // Convert each absolute file path to a relative path from `this.baseDir`
    const relativeFiles = files.map(file => path.relative(this.baseDir, file));
    return relativeFiles;
  }

  async readDirForPngFiles(dir) {
    let files = await fs.promises.readdir(dir, { withFileTypes: true });
    files = files
      .filter(file => !file.isDirectory() && file.name.endsWith('.png'))
      .map(file => file.name)
      .sort();
    // Convert file names to full paths
    return files.map(file => path.join(dir, file));
  }
}

export default LatestFolderImageLooper
