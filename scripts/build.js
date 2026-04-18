#!/usr/bin/env node

/**
 * @fileoverview Build script for HTML PPT
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Log message with color
 * @param {string} message - Message to log
 * @param {string} color - Color to use
 */
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Log success message
 * @param {string} message - Message to log
 */
function success(message) {
  log(`✓ ${message}`, colors.green);
}

/**
 * Log error message
 * @param {string} message - Message to log
 */
function error(message) {
  log(`✗ ${message}`, colors.red);
}

/**
 * Log warning message
 * @param {string} message - Message to log
 */
function warning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

/**
 * Log info message
 * @param {string} message - Message to log
 */
function info(message) {
  log(`ℹ ${message}`, colors.cyan);
}

/**
 * Create directory if it doesn't exist
 * @param {string} dir - Directory path
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    success(`Created directory: ${dir}`);
  }
}

/**
 * Copy file
 * @param {string} src - Source path
 * @param {string} dest - Destination path
 */
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  success(`Copied: ${src} → ${dest}`);
}

/**
 * Copy directory recursively
 * @param {string} src - Source path
 * @param {string} dest - Destination path
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }

  success(`Copied directory: ${src} → ${dest}`);
}

/**
 * Clean build directory
 */
function clean() {
  info('Cleaning build directory...');
  
  const distPath = path.join(__dirname, '..', 'dist');
  
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    success('Cleaned build directory');
  } else {
    info('Build directory is already clean');
  }
}

/**
 * Build project
 */
function build() {
  info('Starting build process...');
  
  // Clean first
  clean();
  
  // Create dist directory
  const distPath = path.join(__dirname, '..', 'dist');
  ensureDir(distPath);
  
  // Copy source files
  const srcPath = path.join(__dirname, '..', 'src');
  copyDir(srcPath, distPath);
  
  // Copy package.json
  const packageJson = require('../package.json');
  fs.writeFileSync(
    path.join(distPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  success('Copied package.json');
  
  // Copy README
  const readmePath = path.join(__dirname, '..', 'README.md');
  if (fs.existsSync(readmePath)) {
    copyFile(readmePath, path.join(distPath, 'README.md'));
  }
  
  // Copy LICENSE
  const licensePath = path.join(__dirname, '..', 'LICENSE');
  if (fs.existsSync(licensePath)) {
    copyFile(licensePath, path.join(distPath, 'LICENSE'));
  }
  
  success('Build completed successfully!');
}

/**
 * Run tests
 */
function test() {
  info('Running tests...');
  
  try {
    execSync('npm test', { stdio: 'inherit' });
    success('All tests passed!');
  } catch (error) {
    error('Tests failed!');
    process.exit(1);
  }
}

/**
 * Lint code
 */
function lint() {
  info('Linting code...');
  
  try {
    execSync('npm run lint', { stdio: 'inherit' });
    success('Linting passed!');
  } catch (error) {
    error('Linting failed!');
    process.exit(1);
  }
}

/**
 * Format code
 */
function format() {
  info('Formatting code...');
  
  try {
    execSync('npm run format', { stdio: 'inherit' });
    success('Code formatted!');
  } catch (error) {
    error('Formatting failed!');
    process.exit(1);
  }
}

/**
 * Watch for changes
 */
function watch() {
  info('Watching for changes...');
  
  try {
    execSync('npm run watch', { stdio: 'inherit' });
  } catch (error) {
    error('Watch failed!');
    process.exit(1);
  }
}

/**
 * Create release
 * @param {string} version - Version to release
 */
function release(version) {
  info(`Creating release: ${version}`);
  
  // Run tests
  test();
  
  // Lint code
  lint();
  
  // Build
  build();
  
  // Update version in package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = require(packageJsonPath);
  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  success(`Updated version to ${version}`);
  
  // Create git tag
  try {
    execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
    success(`Created git tag: v${version}`);
  } catch (error) {
    warning('Failed to create git tag');
  }
  
  success(`Release ${version} created successfully!`);
}

/**
 * Show help
 */
function help() {
  console.log(`
HTML PPT Build Script

Usage:
  node scripts/build.js [command]

Commands:
  build       Build the project (default)
  clean       Clean build directory
  test        Run tests
  lint        Lint code
  format      Format code
  watch       Watch for changes
  release     Create release
  help        Show this help message

Examples:
  node scripts/build.js build
  node scripts/build.js test
  node scripts/build.js release 1.0.0
  `);
}

/**
 * Main function
 */
function main() {
  const command = process.argv[2] || 'build';
  
  switch (command) {
    case 'build':
      build();
      break;
    case 'clean':
      clean();
      break;
    case 'test':
      test();
      break;
    case 'lint':
      lint();
      break;
    case 'format':
      format();
      break;
    case 'watch':
      watch();
      break;
    case 'release':
      const version = process.argv[3];
      if (!version) {
        error('Please specify a version');
        process.exit(1);
      }
      release(version);
      break;
    case 'help':
    default:
      help();
      break;
  }
}

// Run main function
main();
