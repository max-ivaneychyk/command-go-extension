# Command System Documentation

This directory contains comprehensive documentation for creating and working with commands in the Chrome Extension Command React framework.

## Overview

The command system is the core of this Chrome extension framework, allowing users to create automated scenarios by chaining together various commands. Each command represents a specific action or operation that can be performed in different contexts (content scripts, background, etc.).

## Architecture

### Command Structure
Commands follow a consistent pattern with two main components:
- **Definition File** (`Command.js`) - UI components and configuration
- **Execution File** (`Command.run.js`) - Runtime logic

### Execution Contexts
Commands can run in different contexts:
- **Content Script** - DOM manipulation, page interaction
- **Background** - Extension APIs, cross-tab operations  
- **Popup/Options** - UI-specific operations

### Registration System
Commands are registered in multiple map files:
- `map.controls.js` - UI registration for command selection
- `map.page.run.js` - Content script execution mapping
- `map.bg.run.js` - Background script execution mapping

## Documentation Files

### 📖 Core Documentation
- **[`SETUP.md`](./SETUP.md)** - Getting started with the command system
  - Prerequisites and installation
  - Development environment setup
  - Build and test instructions
  - Troubleshooting guide
- **[`CREATING.md`](./CREATING.md)** - Complete guide for creating new commands
  - Step-by-step instructions
  - Architecture explanation
  - Best practices and common pitfalls
  - Registration process

### 🛠️ Templates & Examples  
- **[`TEMPLATES.md`](./TEMPLATES.md)** - Ready-to-use command templates
  - Basic command template
  - DOM interaction commands
  - Network request commands
  - Utility commands
  - Group commands
  - Registration templates

## Quick Start

1. **Read the Basics**: Start with [`CREATING.md`](./docs/commands/CREATING.md) to understand the command system
2. **Use Templates**: Copy from [`TEMPLATES.md`](./docs/commands/TEMPLATES.md) for quick development
3. **Study Examples**: Examine existing commands in `src/app/commands/`
4. **Test Your Command**: Use the extension UI to verify functionality

## Command Categories

The framework includes several built-in command categories:

### 🔧 Logic & Control
- Variables and data manipulation
- Conditional statements (If/Then/Else)
- Loops and iterations
- Function definitions and calls

### 🌐 Network Operations
- HTTP requests (GET, POST, PUT, DELETE)
- API interactions
- Data fetching and processing

### 📄 DOM Manipulation
- Element finding and selection
- Content reading and modification
- Event handling and triggering
- Node creation and removal

### 💾 Data Storage
- IndexedDB operations
- Variable management
- State persistence

### ⏱️ Timing & Flow
- Delays and timeouts
- Scenario orchestration
- Event-driven execution

### 🛠️ Utilities
- String, Array, Object, Math utilities
- JSON processing
- Template rendering
- Code execution

## Development Workflow

1. **Plan Your Command**
   - Define what the command should do
   - Determine execution context needed
   - Plan input/output parameters

2. **Create Command Type**
   - Add to `COMMANDS` constant in `commands.js`
   - Choose unique identifier

3. **Build Command Files**
   - Create definition file with UI components
   - Create execution file with logic
   - Use templates as starting point

4. **Register Command**
   - Add to `map.controls.js` for UI
   - Add to appropriate execution map
   - Import necessary dependencies

5. **Test & Iterate**
   - Test in extension environment
   - Handle edge cases and errors
   - Validate user inputs

## Best Practices

### Naming Conventions
- Commands: `CategoryActionCommand` (e.g., `DOMFindNodeCommand`)
- Files: `CategoryAction.js` and `CategoryAction.run.js`
- Folders: Group related commands in category folders

### Error Handling
- Always validate inputs using `Validator` class
- Provide meaningful error messages
- Handle async operations properly
- Use try-catch blocks for external operations

### UI Design
- Use consistent icons and colors
- Provide clear labels and placeholders
- Support variable inputs where appropriate
- Group related controls logically

### Performance
- Minimize DOM operations in content scripts
- Use appropriate execution context
- Handle large datasets efficiently
- Avoid blocking operations in UI

## Contributing

When contributing new commands:

1. Follow the established patterns and conventions
2. Include proper documentation and examples
3. Test in multiple scenarios and contexts
4. Ensure backward compatibility
5. Update relevant documentation files

## Support

For questions or issues with command development:
1. Check existing command implementations for patterns
2. Review this documentation thoroughly
3. Test commands in isolation before integration
4. Consider the appropriate execution context for your use case
