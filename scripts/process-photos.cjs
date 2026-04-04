#!/usr/bin/env node
// Processes all photos in assets/photos/{id}/ folders:
//   - Converts to JPEG at 85% quality
//   - Resizes to max 800px wide (1200px for magic_kingdom hero)
//   - Renames to 01.jpg, 02.jpg, 03.jpg ... (alphabetical order of originals)
//   - Deletes originals and .gitkeep once done

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PHOTO_DIR = path.join(__dirname, '..', 'assets', 'photos');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.tiff', '.bmp', '.heic']);
const SKIP_FILES = new Set(['.gitkeep', '.DS_Store', 'Thumbs.db']);

function fileSize(filePath) {
  const bytes = fs.statSync(filePath).size;
  return bytes < 1024 * 1024
    ? (bytes / 1024).toFixed(0) + ' KB'
    : (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const folders = fs.readdirSync(PHOTO_DIR)
  .filter(f => fs.statSync(path.join(PHOTO_DIR, f)).isDirectory())
  .sort();

let totalIn = 0, totalOut = 0, totalFiles = 0;

for (const folder of folders) {
  const folderPath = path.join(PHOTO_DIR, folder);
  const maxWidth = folder === 'magic_kingdom' ? 1200 : 800;

  const originals = fs.readdirSync(folderPath)
    .filter(f => {
      if (SKIP_FILES.has(f)) return false;
      const ext = path.extname(f).toLowerCase();
      // Skip already-processed numbered files from a previous run
      if (/^\d{2}\.jpg$/.test(f)) return false;
      return IMAGE_EXTS.has(ext);
    })
    .sort();

  // If no originals, check if numbered files need resizing
  const numbered = fs.readdirSync(folderPath)
    .filter(f => /^\d{2}\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .sort();

  const toProcess = originals.length > 0 ? originals : numbered;

  if (toProcess.length === 0) {
    console.log(`  ${folder}: no photos yet`);
    continue;
  }

  console.log(`\n${folder}:`);
  let idx = 1;

  for (const file of toProcess) {
    const inputPath = path.join(folderPath, file);
    const outputName = String(idx).padStart(2, '0') + '.jpg';
    const outputPath = path.join(folderPath, outputName);

    const sizeBefore = fileSize(inputPath);

    // sips: convert to JPEG, set quality to 85, resize to maxWidth
    const result = spawnSync('sips', [
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', '85',
      '--resampleWidth', String(maxWidth),
      inputPath,
      '--out', outputPath
    ], { encoding: 'utf8' });

    if (result.status !== 0) {
      console.error(`  ✗ ${file}: ${result.stderr || result.stdout}`);
      continue;
    }

    const sizeAfter = fileSize(outputPath);
    const arrow = inputPath === outputPath ? '(in-place)' : `← ${file}`;
    console.log(`  ✓ ${outputName}  ${sizeBefore} → ${sizeAfter}  ${arrow}`);

    totalIn  += fs.statSync(inputPath).size;
    totalOut += fs.statSync(outputPath).size;
    totalFiles++;

    // Remove original if it differs from output
    if (inputPath !== outputPath) {
      fs.unlinkSync(inputPath);
    }

    idx++;
  }

  // Remove .gitkeep now that real photos exist
  const gitkeep = path.join(folderPath, '.gitkeep');
  if (fs.existsSync(gitkeep) && idx > 1) {
    fs.unlinkSync(gitkeep);
  }
}

const saved = ((1 - totalOut / totalIn) * 100).toFixed(0);
console.log(`\n─────────────────────────────────────`);
console.log(`Processed ${totalFiles} photos`);
console.log(`Total size: ${(totalIn / (1024*1024)).toFixed(1)} MB → ${(totalOut / (1024*1024)).toFixed(1)} MB  (${saved}% smaller)`);
