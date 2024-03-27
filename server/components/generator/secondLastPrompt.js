// readSecondLastPrompt.js
import fs from 'fs';
import path from 'path';

async function readSecondLastPrompt(outputDir, nextBatchNumber) {
  if (nextBatchNumber <= 1) {
    console.log("Generating BT_0001: No previous prompts to fetch because this is the first batch.");
    return false;
  }

  const targetBatchNumber = nextBatchNumber - 1;
  const targetFolderName = `BT_${String(targetBatchNumber).padStart(4, '0')}`;
  const targetFolderPath = path.join(outputDir, targetFolderName);
  
  try {
    const txtFiles = fs.readdirSync(targetFolderPath)
      .filter(file => path.extname(file).toLowerCase() === '.txt');

    if (txtFiles.length === 0) {
      console.log(`No .txt file found in ${targetFolderName}.`);
      return false;
    }

    const promptsFilePath = path.join(targetFolderPath, txtFiles[0]);
    const promptsContent = fs.readFileSync(promptsFilePath, 'utf-8');
    const promptsJson = JSON.parse(promptsContent);

    if (promptsJson && promptsJson.prompts) {
      const keys = Object.keys(promptsJson.prompts);
      if (keys.length < 2) {
        console.log(`Not enough prompts in ${targetFolderName} to fetch the second one.`);
        return false;
      }
      const secondPromptKey = keys[1];
      const secondPrompt = promptsJson.prompts[secondPromptKey];
      console.log(`In ${targetFolderName}, the second prompt is "${secondPrompt}"`);
      return secondPrompt;
    } else {
      console.log(`Prompts object not found in ${targetFolderName}.`);
      return false;
    }
  } catch (error) {
    console.error(`Error reading or parsing the prompts file in ${targetFolderName}:`, error);
    return false;
  }
}

export default readSecondLastPrompt;
