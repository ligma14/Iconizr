# Iconizr-svg

![Example Iconizr Results](result-example.png)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ligma14/Iconizr-svg/ci.yml?branch=main)
![npm Version](https://img.shields.io/npm/v/iconizr-svg)
![License](https://img.shields.io/npm/l/iconizr-svg)


Iconizr-svg is a customizable SVG icon generator that creates unique, grid-based icons from input strings. Perfect for user avatars, identicons, and more!

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Unique Icon Generation**: Creates distinct icons based on input strings, ideal for user avatars or identicons.
- **Customizable Grid Size**: Adjust the complexity of the icon by changing the grid dimensions.
- **Configurable Icon Size**: Set the overall size of the generated SVG icon.
- **Random Color Generation**: Automatically generates a diverse range of colors for each cell in the grid.
- **Opacity Control**: Fine-tune the visual depth of icons by setting minimum and maximum opacity levels.
- **Consistent Randomness**: Use seed strings to ensure the same input always generates the same icon.
- **SVG Output**: Generate clean, scalable SVG code ready for use in web applications.
- **Lightweight**: Minimal dependencies for easy integration into any project.
- **TypeScript Support**: Fully written in TypeScript for better developer experience and type safety.


## Installation

Install Iconizr-svg using npm:

```bash
npm install iconizr-svg
```

## Usage

Here's a basic example of how to use Iconizr-svg:

```typescript
import Iconizr from 'iconizr-svg';
const iconizr = new Iconizr({
size: 100,
gridSize: 8,
minOpacity: 0.3,
maxOpacity: 0.9,
});
const { svg } = iconizr.generate('example');
console.log(svg);
```

This will output an SVG string that you can use in your application.

## Configuration

When creating a new Iconizr instance, you can pass a configuration object with the following options:

- `size` (number): The size of the generated SVG in pixels. **Default:** `64`
- `gridSize` (number): The number of cells in each row/column of the grid. **Default:** `5`
- `seed` (string): A seed string for consistent random generation. **Default:** Random string
- `minOpacity` (number): The minimum opacity for cells. **Default:** `0.2`
- `maxOpacity` (number): The maximum opacity for cells. **Default:** `1.0`
- `colorPalette` (string[]): An array of colors to use for generating the icon. **Default:** Random colors


## Examples

### Generate Multiple Icons

Generate and display multiple icons based on different input strings:
```typescript
import Iconizr from 'iconizr-svg';
const iconizr = new Iconizr({ size: 50, gridSize: 6 });
const inputs = ['user1', 'user2', 'user3'];
inputs.forEach((input, index) => {
const { svg } = iconizr.generate(input);
console.log(Icon ${index + 1}:, svg);
});
```

### Save SVG to File

Save the generated SVG to a file using Node.js:
```typescript
import fs from 'fs';
import Iconizr from 'iconizr-svg';
const iconizr = new Iconizr();
const { svg } = iconizr.generate('save-to-file');
fs.writeFileSync('icon.svg', svg);
console.log('SVG icon saved as icon.svg');
```


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

   Click the **Fork** button at the top-right corner of this repository's page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/Iconizr-svg.git
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

   Implement your feature or fix a bug.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

   Go to the original repository and click **Compare & pull request**. Provide a clear description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---