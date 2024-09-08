import fs from 'fs/promises';
import Iconizr from '../src/main';

async function generateHTML() {
  const iconizr = new Iconizr({
    size: 100,
    gridSize: 4,
    minOpacity: 0.3,
    maxOpacity: 0.9
  });

  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Iconizr SVGs</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        .icon-container { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-top: 20px; }
        .icon { border: 1px solid #ccc; padding: 10px; }
    </style>
</head>
<body>
    <h1>5 Random Iconizr SVGs</h1>
    <div class="icon-container">
  `;

  for (let i = 0; i < 5; i++) {
    const randomInput = Math.random().toString(36).substring(7);
    const { svg } = iconizr.generate(randomInput);
    html += `
        <div class="icon">
            <p>Input: ${randomInput}</p>
            ${svg}
        </div>
    `;
  }

  html += `
    </div>
</body>
</html>
  `;

  await fs.writeFile('iconizr_output.html', html);
  console.log('HTML file generated: iconizr_output.html');
}

generateHTML().catch(console.error);