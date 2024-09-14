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
  private hash: string;
  private hashIndex: number;

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
    this.hash = '';
    this.hashIndex = 0;
  }

  // Generates a deterministic value based on the hash
  private getDeterministicValue(max: number): number {
    if (this.hashIndex >= this.hash.length) {
      // Reset or handle overflow
      this.hashIndex = 0;
    }
    const hexChar = this.hash.charAt(this.hashIndex);
    this.hashIndex += 1;
    const value = parseInt(hexChar, 16);
    return value / 15 * max; // Normalize to [0, max]
  }

  // Main method to generate the icon
  generate(input: string): IconizrResult {
    const seedString = this.config.seed + input;
    this.hash = createHash('md5').update(seedString).digest('hex');
    this.hashIndex = 0;
    const svg = this.generateSvg();
    return { svg };
  }

  // Generate an SVG string representation of the icon
  private generateSvg(): string {
    const cellSize = this.config.size / this.config.gridSize;
    let svgParts: string[] = [
      `<svg width="${this.config.size}" height="${this.config.size}" xmlns="http://www.w3.org/2000/svg">`
    ];

    for (let i = 0; i < this.config.gridSize; i++) {
      for (let j = 0; j < this.config.gridSize; j++) {
        const shouldFill = this.shouldFillCell();
        if (shouldFill) {
          const x = j * cellSize;
          const y = i * cellSize;
          const color = this.getColor();
          const opacity = this.getOpacity();
          svgParts.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}" opacity="${opacity}"/>`);
        }
      }
    }

    svgParts.push('</svg>');
    return svgParts.join('');
  }

  // Determine whether to fill a cell based on the hash
  private shouldFillCell(): boolean {
    const value = this.getDeterministicValue(16); // since MD5 hex has 16 distinct values (0-15)
    return Math.floor(value) % 2 === 0;
  }

  // Generate a deterministic color from the hash
  private getColor(): string {
    const r = Math.floor(this.getDeterministicValue(256));
    const g = Math.floor(this.getDeterministicValue(256));
    const b = Math.floor(this.getDeterministicValue(256));
    return `rgb(${r},${g},${b})`;
  }

  // Generate a deterministic opacity from the hash
  private getOpacity(): string {
    const opacityRange = this.config.maxOpacity - this.config.minOpacity;
    const opacity = this.config.minOpacity + (this.getDeterministicValue(opacityRange * 100) / 100);
    return opacity.toFixed(2);
  }
}

export default Iconizr;

