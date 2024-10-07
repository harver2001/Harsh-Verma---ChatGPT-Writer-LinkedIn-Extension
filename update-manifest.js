const fs = require('fs');
const path = require('path');
const glob = require('glob');

const buildDir = path.join(__dirname, 'build');
const manifestPath = path.join(buildDir, 'manifest.json');

// Find the main JavaScript file
const mainJsFile = glob.sync('static/js/main.*.js', { cwd: buildDir })[0];

if (!mainJsFile) {
  throw new Error('Main JavaScript file not found');
}

// Read and update the manifest file
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.content_scripts[0].js = [mainJsFile.replace(/\\/g, '/')];

// Write the updated manifest file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Manifest updated successfully');