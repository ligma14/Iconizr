import { createHash } from 'node:crypto';

// Define the configuration interface for Iconizr
interface IconizrConfig {
  size: number;
  gridSize: number;
  seed: string;
  minOpacity: number;
  maxOpacity: number;
}

// Define the result interface for Iconizr
interface IconizrResult {
  svg: string;
}

class Iconizr {
  private config: Required<IconizrConfig>;

  // Constructor with default values for config
  constructor(config: Partial<IconizrConfig> = {}) {
    this.config = {
      size: config.size ?? 64,
      gridSize: config.gridSize ?? 5,
      seed: config.seed ?? Math.random().toString(36).substring(2),
      minOpacity: config.minOpacity ?? 0.2,
      maxOpacity: config.maxOpacity ?? 1.0
    };
    console.log('Iconizr initialized with config:', this.config);
  }

  private generateRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  private generateRandomOpacity(): number {
    return this.config.minOpacity + Math.random() * (this.config.maxOpacity - this.config.minOpacity);
  }

  // Main method to generate the icon
  generate(input: string): IconizrResult {
    const seedString = this.config.seed + input;
    const hash = createHash('md5').update(seedString).digest('hex');
    const svg = this.generateSvg(hash);
    return { svg };
  }

  // Generate an SVG string representation of the icon
  private generateSvg(hash: string): string {
    const cellSize = this.config.size / this.config.gridSize;
    let svg = `<svg width="${this.config.size}" height="${this.config.size}" xmlns="http://www.w3.org/2000/svg">`;

    for (let i = 0; i < this.config.gridSize; i++) {
      for (let j = 0; j < this.config.gridSize; j++) {
        const index = (i * this.config.gridSize + j) % hash.length;
        const shouldFill = parseInt(hash.charAt(index), 16) % 2 === 0;

        if (shouldFill) {
          const x = j * cellSize;
          const y = i * cellSize;
          const color = this.generateRandomColor();
          const opacity = this.generateRandomOpacity();
          svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" opacity="${opacity}"/>`;
        }
      }
    }

    svg += '</svg>';
    return svg;
  }
}

export default Iconizr;
