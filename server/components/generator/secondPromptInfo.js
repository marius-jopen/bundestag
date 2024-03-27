// saveSecondPromptInfo.js
import fs from 'fs';
import path from 'path';

async function saveSecondPromptInfo(outputDir, batchName, prompts) {
  const promptKeys = Object.keys(prompts).sort((a, b) => parseInt(a) - parseInt(b));
  const secondPromptKey = promptKeys[1]; // Assumes keys can be sorted to find the second prompt
  let secondPrompt = prompts[secondPromptKey];

  if (secondPrompt) {
    // Identify the first part of the prompt before the first '('
    const endIndex = secondPrompt.indexOf('//');
    if (endIndex !== -1) {
      // Extract everything before the first '//'
      secondPrompt = secondPrompt.substring(0, endIndex).trim();
    }

    const batchFolderPath = path.join(outputDir, batchName);
    const infoFilePath = path.join(batchFolderPath, 'info.txt');

    // Ensure the directory exists
    await fs.promises.mkdir(batchFolderPath, { recursive: true });

    // Write the modified second prompt to info.txt in the batch folder
    await fs.promises.writeFile(infoFilePath, secondPrompt, 'utf8');
    console.log(`info.txt saved in ${batchFolderPath} with the prompt portion before '//'`);
  }
}

export default saveSecondPromptInfo;
