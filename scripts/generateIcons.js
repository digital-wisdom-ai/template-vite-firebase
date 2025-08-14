#!/usr/bin/env node

/**
 * Icon Generation Script
 *
 * Generates all required favicon and PWA icons from BaseIcon.png
 * Supports multi-resolution ICO, SVG with dark mode, and comprehensive PWA icons
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configuration
const CONFIG = {
  sourceIcon: path.join(__dirname, '../public/BaseIcon.png'),
  publicDir: path.join(__dirname, '../public'),

  // Icon specifications
  favicon: {
    ico: {
      sizes: [16, 24, 32, 48],
      output: 'favicon.ico',
    },
    png: [
      { size: 16, output: 'favicon-16x16.png' },
      { size: 32, output: 'favicon-32x32.png' },
    ],
  },

  pwa: [
    { size: 48, output: 'pwa-48x48.png' },
    { size: 72, output: 'pwa-72x72.png' },
    { size: 96, output: 'pwa-96x96.png' },
    { size: 144, output: 'pwa-144x144.png' },
    { size: 192, output: 'pwa-192x192.png' },
    { size: 256, output: 'pwa-256x256.png' },
    { size: 384, output: 'pwa-384x384.png' },
    { size: 512, output: 'pwa-512x512.png' },
  ],

  apple: {
    size: 180,
    output: 'apple-touch-icon.png',
  },

  maskable: {
    size: 512,
    output: 'maskable-icon.png',
  },
}

class IconGenerator {
  constructor() {
    this.checkDependencies()
  }

  checkDependencies() {
    try {
      execSync('which convert', { stdio: 'ignore' })
      console.log('✓ ImageMagick found')
    } catch {
      console.error('❌ ImageMagick not found. Install with:')
      console.error('  macOS: brew install imagemagick')
      console.error('  Ubuntu: sudo apt-get install imagemagick')
      console.error(
        '  Windows: Download from https://imagemagick.org/script/download.php',
      )
      process.exit(1)
    }

    if (!fs.existsSync(CONFIG.sourceIcon)) {
      console.error(`❌ Source icon not found: ${CONFIG.sourceIcon}`)
      process.exit(1)
    }

    console.log(`✓ Source icon found: ${CONFIG.sourceIcon}`)
  }

  async generatePngIcon(size, outputPath) {
    const cmd = `convert "${CONFIG.sourceIcon}" -resize ${size}x${size} -quality 100 "${outputPath}"`
    try {
      execSync(cmd, { stdio: 'ignore' })
      console.log(`✓ Generated ${path.basename(outputPath)} (${size}x${size})`)
      return true
    } catch (error) {
      console.error(`❌ Failed to generate ${outputPath}:`, error.message)
      return false
    }
  }

  async generateMultiResolutionIco() {
    console.log('\n📱 Generating multi-resolution favicon.ico...')

    // Generate temp PNG files for each size
    const tempFiles = []
    for (const size of CONFIG.favicon.ico.sizes) {
      const tempFile = path.join(CONFIG.publicDir, `temp-${size}.png`)
      await this.generatePngIcon(size, tempFile)
      tempFiles.push(tempFile)
    }

    // Combine into multi-resolution ICO
    const icoPath = path.join(CONFIG.publicDir, CONFIG.favicon.ico.output)
    const cmd = `convert ${tempFiles.map((f) => `"${f}"`).join(' ')} "${icoPath}"`

    try {
      execSync(cmd, { stdio: 'ignore' })
      console.log(`✓ Generated multi-resolution ${CONFIG.favicon.ico.output}`)

      // Cleanup temp files
      tempFiles.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file)
        }
      })

      return true
    } catch (error) {
      console.error('❌ Failed to generate favicon.ico:', error.message)
      return false
    }
  }

  async generateFavicons() {
    console.log('\n🔗 Generating PNG favicons...')

    for (const favicon of CONFIG.favicon.png) {
      const outputPath = path.join(CONFIG.publicDir, favicon.output)
      await this.generatePngIcon(favicon.size, outputPath)
    }
  }

  async generatePwaIcons() {
    console.log('\n📱 Generating PWA icons...')

    for (const icon of CONFIG.pwa) {
      const outputPath = path.join(CONFIG.publicDir, icon.output)
      await this.generatePngIcon(icon.size, outputPath)
    }
  }

  async generateAppleIcon() {
    console.log('\n🍎 Generating Apple Touch Icon...')

    const outputPath = path.join(CONFIG.publicDir, CONFIG.apple.output)
    await this.generatePngIcon(CONFIG.apple.size, outputPath)
  }

  async generateMaskableIcon() {
    console.log('\n🎭 Generating maskable icon...')

    // Maskable icons need padding - create with 20% padding
    const outputPath = path.join(CONFIG.publicDir, CONFIG.maskable.output)
    const paddedSize = Math.round(CONFIG.maskable.size * 0.8)
    const cmd =
      `convert "${CONFIG.sourceIcon}" -resize ${paddedSize}x${paddedSize} ` +
      `-background transparent -gravity center -extent ${CONFIG.maskable.size}x${CONFIG.maskable.size} "${outputPath}"`

    try {
      execSync(cmd, { stdio: 'ignore' })
      console.log(`✓ Generated ${CONFIG.maskable.output} with proper padding`)
    } catch (error) {
      console.error('❌ Failed to generate maskable icon:', error.message)
    }
  }

  getThemeColors() {
    const defaults = { primaryColor: '#1976d2', primaryColorDark: '#90caf9' }
    const tokensPath = path.join(__dirname, '../src/gen/tokens.json')

    if (!fs.existsSync(tokensPath)) return defaults

    return this.loadColorsFromTokens(tokensPath, defaults)
  }

  loadColorsFromTokens(tokensPath, defaults) {
    try {
      const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))
      const colors = this.extractPrimaryColors(tokens, defaults)
      console.log(
        `✓ Using theme colors: ${colors.primaryColor} (light), ${colors.primaryColorDark} (dark)`,
      )
      return colors
    } catch {
      console.log('⚠️ Using default colors (design tokens not available)')
      return defaults
    }
  }

  extractPrimaryColors(tokens, defaults) {
    const primaryTokens = tokens.color?.primary || {}
    return {
      primaryColor: primaryTokens['700'] || defaults.primaryColor,
      primaryColorDark: primaryTokens['200'] || defaults.primaryColorDark,
    }
  }

  async generateSvgFavicon() {
    console.log('\n🎨 Generating SVG favicon with dark mode support...')

    const { primaryColor, primaryColorDark } = this.getThemeColors()

    const svgContent =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .icon { fill: ${primaryColor}; }
    @media (prefers-color-scheme: dark) {
      .icon { fill: ${primaryColorDark}; }
    }
  </style>
  <circle class="icon" cx="16" cy="16" r="14"/>
  <text x="16" y="20" text-anchor="middle" fill="white" ` +
      `font-family="system-ui" font-size="12" font-weight="bold">DW</text>
</svg>`

    const svgPath = path.join(CONFIG.publicDir, 'favicon.svg')
    fs.writeFileSync(svgPath, svgContent)
    console.log('✓ Generated favicon.svg with dark mode support')
  }

  async generateMaskIcon() {
    console.log('\n🖤 Generating Safari mask icon...')

    const svgContent =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="black"/>
  <text x="16" y="20" text-anchor="middle" fill="white" ` +
      `font-family="system-ui" font-size="12" font-weight="bold">DW</text>
</svg>`

    const maskPath = path.join(CONFIG.publicDir, 'mask-icon.svg')
    fs.writeFileSync(maskPath, svgContent)
    console.log('✓ Generated mask-icon.svg for Safari')
  }

  async run() {
    console.log('🚀 Starting icon generation from BaseIcon.png...\n')

    try {
      await this.generateMultiResolutionIco()
      await this.generateFavicons()
      await this.generatePwaIcons()
      await this.generateAppleIcon()
      await this.generateMaskableIcon()
      await this.generateSvgFavicon()
      await this.generateMaskIcon()

      console.log('\n✅ Icon generation complete!')
      console.log('\nGenerated files:')

      // List all generated files
      const generatedFiles = [
        'favicon.ico',
        'favicon.svg',
        'mask-icon.svg',
        ...CONFIG.favicon.png.map((f) => f.output),
        ...CONFIG.pwa.map((f) => f.output),
        CONFIG.apple.output,
        CONFIG.maskable.output,
      ]

      generatedFiles.forEach((file) => {
        const filePath = path.join(CONFIG.publicDir, file)
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath)
          const sizeKb = (stats.size / 1024).toFixed(1)
          console.log(`  ✓ ${file} (${sizeKb}KB)`)
        }
      })
    } catch (error) {
      console.error('\n❌ Icon generation failed:', error.message)
      process.exit(1)
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new IconGenerator()
  generator.run()
}

export default IconGenerator
