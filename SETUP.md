# Chrome Extension Commands - Setup Guide

This guide will help you set up and run the Chrome Extension Commands project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Chrome** browser

You can verify your Node.js installation by running:
```bash
node --version
npm --version
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Tailwind CSS

This project uses Tailwind CSS. You need to set up the Tailwind CLI:

```bash
# Download Tailwind CLI for macOS
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-x64

# Make it executable
chmod +x tailwindcss-macos-x64

# Rename for easier use
mv tailwindcss-macos-x64 tailwindcss
```

### 3. Start Development Server

```bash
npm start
```

This will:
- Start the webpack dev server with hot reload
- Build the extension files
- Enable automatic reloading when you make changes

### 4. Build CSS (Optional - for styling changes)

If you're working on styling, you'll need to watch and compile the CSS files. Open new terminal windows/tabs and run:

```bash
# For main extension styles
./tailwindcss -i ./src/app/index.css -o src/app/output.css --watch


```

### 5. Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `build` folder from your project directory
6. The extension should now appear in your extensions list

## Development Workflow

### Making Changes

- **Code changes**: The development server will automatically reload the extension
- **Manifest changes**: You may need to manually reload the extension in Chrome
- **New files**: Restart the development server (`npm start`)

### Available Scripts

```bash
# Development
npm start              # Start dev server for Chrome
npm run start:ff       # Start dev server for Firefox

# Production Build
npm run build          # Build for Chrome
npm run build:ff       # Build for Firefox

# CSS Compilation
npm run css:extension  # Watch extension CSS

# Code Formatting
npm run prettier      # Format all code files
```

### Project Structure

```
src/
├── app/                 # Main extension application
│   ├── commands/        # Command implementations
│   ├── components/      # React components
│   └── ...
├── pages/
│   ├── Background/      # Background script
│   ├── Content/         # Content script
│   ├── Options/         # Extension options page

├── manifest/
│   ├── chrome/          # Chrome manifest
│   └── firefox/         # Firefox manifest
└── assets/              # Images and static files
```

## Browser-Specific Builds

### Chrome (Default)
```bash
npm start
npm run build
```

### Firefox
```bash
npm run start:ff
npm run build:ff
```

## Production Build

When ready to package your extension:

```bash
NODE_ENV=production npm run build
```

The `build` folder will contain your production-ready extension files.

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   PORT=6002 npm start
   ```

2. **Extension not loading**
   - Make sure you selected the `build` folder, not the project root
   - Check the Chrome console for errors
   - Try refreshing the extension in `chrome://extensions/`

3. **CSS not updating**
   - Make sure Tailwind CSS watcher is running
   - Check that output files are being generated

4. **Hot reload not working**
   - Restart the development server
   - Check that Developer mode is enabled in Chrome

### Development Tips

- Use Chrome DevTools to debug the extension
- Check the background script console in `chrome://extensions/` (click "service worker")
- Content script errors appear in the page's console
- Options and popup pages can be debugged like regular web pages

## Environment Variables

You can customize the development server:

```bash
PORT=3000 npm start        # Change development server port
BROWSER=firefox npm start  # Use Firefox instead of Chrome
```

## Need Help?

- Check the existing documentation in the `docs/` folder
- Review the original Chrome Extension Boilerplate documentation in `README.md`
- Open an issue if you encounter problems

---

Happy coding! 🚀