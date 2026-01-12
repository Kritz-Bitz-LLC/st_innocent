#!/usr/bin/env node
/**
 * st_innocent/scripts/convert_images.js
 *
 * Converts jpg/jpeg/png images to webp format.
 *
 * Usage:
 *     node convert_images.js <input_dir> [--output <output_dir>]
 *
 * Examples:
 *     node convert_images.js snapshot/
 *     node convert_images.js snapshot/ --output ui/public/img
 *     node convert_images.js /path/to/images -o /path/to/output
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('sharp is required. Install it with: npm install sharp');
  process.exit(1);
}

async function convertToWebp(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    return true;
  } catch (e) {
    console.log(`  ✗ Error converting ${path.basename(inputPath)}: ${e.message}`);
    return false;
  }
}

function copySvg(inputPath, outputPath) {
  try {
    fs.copyFileSync(inputPath, outputPath);
    return true;
  } catch (e) {
    console.log(`  ✗ Error copying ${path.basename(inputPath)}: ${e.message}`);
    return false;
  }
}

function parseArgs(args) {
  const result = {
    inputDir: null,
    output: 'ui/public/img',
    quality: 85,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg === '-o' || arg === '--output') {
      result.output = args[++i];
    } else if (arg === '-q' || arg === '--quality') {
      result.quality = parseInt(args[++i], 10);
    } else if (arg === '-h' || arg === '--help') {
      console.log(`
Usage: node convert_images.js <input_dir> [options]

Convert JPG/PNG images to WebP format

Options:
  -o, --output <dir>   Output directory (default: ui/public/img)
  -q, --quality <num>  WebP quality 1-100 (default: 85)
  -h, --help           Show this help message

Examples:
  node convert_images.js snapshot/
  node convert_images.js snapshot/ --output ui/public/img
  node convert_images.js /path/to/images -o /path/to/output
`);
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      result.inputDir = arg;
    }
    i++;
  }

  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.inputDir) {
    console.error('Error: input_dir is required');
    console.error('Usage: node convert_images.js <input_dir> [--output <output_dir>]');
    process.exit(1);
  }

  // Resolve paths
  const scriptDir = __dirname;
  const projectRoot = path.dirname(scriptDir);

  let inputDir = args.inputDir;
  if (!path.isAbsolute(inputDir)) {
    inputDir = path.join(projectRoot, inputDir);
  }

  let outputDir = args.output;
  if (!path.isAbsolute(outputDir)) {
    outputDir = path.join(projectRoot, outputDir);
  }

  console.log('='.repeat(60));
  console.log('Image Converter (JPG/PNG -> WebP)');
  console.log('='.repeat(60));
  console.log(`\nSource:      ${inputDir}`);
  console.log(`Destination: ${outputDir}`);
  console.log(`Quality:     ${args.quality}`);

  // Check source directory
  if (!fs.existsSync(inputDir)) {
    console.log(`\n✗ Input directory not found: ${inputDir}`);
    process.exit(1);
  }

  const inputStat = fs.statSync(inputDir);
  if (!inputStat.isDirectory()) {
    console.log(`\n✗ Input path is not a directory: ${inputDir}`);
    process.exit(1);
  }

  // Create output directory
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('\n✓ Output directory ready');

  // Find all images
  const imageExtensions = new Set(['.jpg', '.jpeg', '.png']);
  const svgExtension = '.svg';

  let converted = 0;
  let copied = 0;
  let skipped = 0;

  console.log('\nProcessing images...\n');

  const files = fs.readdirSync(inputDir).sort();

  for (const fileName of files) {
    const filePath = path.join(inputDir, fileName);
    const stat = fs.statSync(filePath);

    if (!stat.isFile()) {
      continue;
    }

    const ext = path.extname(fileName).toLowerCase();

    if (imageExtensions.has(ext)) {
      // Convert to webp
      const outputName = path.basename(fileName, ext) + '.webp';
      const outputPath = path.join(outputDir, outputName);

      if (await convertToWebp(filePath, outputPath, args.quality)) {
        // Get file sizes for comparison
        const originalSize = stat.size / 1024;
        const newSize = fs.statSync(outputPath).size / 1024;
        const savings = originalSize > 0 ? ((originalSize - newSize) / originalSize) * 100 : 0;

        console.log(`  ✓ ${fileName} -> ${outputName}`);
        console.log(`      ${originalSize.toFixed(1)}KB -> ${newSize.toFixed(1)}KB (${savings.toFixed(1)}% smaller)`);
        converted++;
      } else {
        skipped++;
      }
    } else if (ext === svgExtension) {
      // Copy SVG as-is
      const outputPath = path.join(outputDir, fileName);

      if (copySvg(filePath, outputPath)) {
        console.log(`  ✓ ${fileName} (copied as-is)`);
        copied++;
      } else {
        skipped++;
      }
    } else {
      // Skip non-image files
      if (!['.json', '.txt', '.md'].includes(ext)) {
        console.log(`  - ${fileName} (skipped)`);
      }
      skipped++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Converted to WebP: ${converted}`);
  console.log(`  SVGs copied:       ${copied}`);
  console.log(`  Skipped:           ${skipped}`);
  console.log(`  Output directory:  ${outputDir}`);
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
