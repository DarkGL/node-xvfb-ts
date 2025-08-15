# node-xvfb-ts

A TypeScript library for easily managing X Virtual Frame Buffer (Xvfb) processes in Node.js applications. Perfect for headless GUI testing with tools like Puppeteer, Playwright, or Selenium.

## Installation

```bash
npm install xvfb-ts
```

## Prerequisites

- Linux/Unix system with Xvfb installed
- Node.js >= 20.17.0

## Quick Start

```typescript
import { Xvfb } from 'xvfb-ts';

const xvfb = new Xvfb();

// Start the virtual display
await xvfb.start();

// Run your headless GUI tests here
// e.g., launch a browser, run Electron app, etc.

// Clean up when done
await xvfb.stop();
```

## API Reference

### Constructor Options

```typescript
interface XvfbOptions {
    displayNum?: number;     // X display number (default: auto-assigned >= 99)
    reuse?: boolean;         // Reuse existing display (default: false)
    timeout?: number;        // Startup timeout in ms (default: 500)
    silent?: boolean;        // Suppress stderr output (default: false)
    xvfb_args?: string[];    // Additional Xvfb arguments (default: [])
}
```

### Methods

- `start()` - Start the Xvfb process (returns Promise<ChildProcess>)
- `stop()` - Stop the Xvfb process (returns Promise<void>)
- `display()` - Get the display string (e.g., ":99")

## Examples

### Basic Usage with Custom Display

```typescript
import { Xvfb } from 'xvfb-ts';

const xvfb = new Xvfb({ displayNum: 88 });

await xvfb.start();

console.log(`Display: ${xvfb.display()}`); // :88

await xvfb.stop();
```

### Reusing Existing Display

```typescript
const xvfb = new Xvfb({ 
    displayNum: 99, 
    reuse: true 
});

await xvfb.start(); // Won't fail if :99 already exists
```

### Custom Xvfb Arguments

```typescript
const xvfb = new Xvfb({
    xvfb_args: ['-screen', '0', '1024x768x24']
});

await xvfb.start();
```

### Error Handling

```typescript
try {
    await xvfb.start();
    // Your code here
} catch (error) {
    console.error('Failed to start Xvfb:', error.message);
} finally {
    await xvfb.stop();
}
```

## Credits

* [Rob--W](https://github.com/Rob--W) for the original [node-xvfb](https://github.com/Rob--W/node-xvfb)
