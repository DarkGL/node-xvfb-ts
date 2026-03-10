# AGENT.md - node-xvfb-ts

## Project Overview
TypeScript library for managing X Virtual Frame Buffer (Xvfb) processes. Single module library that provides a wrapper around the Xvfb system utility for headless GUI testing.

## Build & Test Commands
- `npm run build` - Compile TypeScript to dist/
- `npm run test` - Build and run the single test file
- `npm run check` - Run Biome linter and formatter
- `npm run ci` - Full CI pipeline (build + check + check-exports)
- Single test: `node --loader ts-node/esm ./test/test.ts` (after build)

## Architecture
- **Main module**: `/src/index.ts` - Single Xvfb class with start/stop lifecycle
- **Test**: `/test/test.ts` - Basic integration test 
- **Build output**: `/dist/` - Compiled JS and type definitions
- No databases, APIs, or subprojects - pure Node.js utility library

## Code Style (Biome)
- **Indentation**: 4 spaces
- **Line width**: 100 characters  
- **Quotes**: Single quotes for JS, double for JSX
- **Semicolons**: Always required
- **Trailing commas**: Always
- **Imports**: Use `node:` prefix for Node.js modules, organize imports enabled
- **Types**: Explicit interface definitions, strict TypeScript settings
- **Error handling**: Throw Error objects with descriptive messages
- **Naming**: camelCase for methods/variables, PascalCase for classes/interfaces
