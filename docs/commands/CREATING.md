# Creating New Commands

This guide explains how to create new commands for the Chrome Extension Command React framework.

## Overview

Commands in this framework follow a specific pattern that separates the UI component definition from the execution logic. Each command consists of two main files:

1. **Command Definition File** (`CommandName.js`) - Defines the UI and configuration
2. **Command Execution File** (`CommandName.run.js`) - Contains the execution logic

## Basic Command Structure

### Command Definition File

Every command definition file must export an object with the following structure:

```javascript
export const CommandNameCommand = {
  icon: <IconComponent />,          // Command icon
  label: "Command Label",           // Display name
  Control: ControlComponent,        // UI component
  run: runFunction,                 // Execution function (imported)
  scheme: schemeObject,             // Default values/structure
  group: "GroupName",               // Optional: categorization
  mode: EXECUTION_MODE,             // Optional: execution context
  permissions: [],                  // Optional: required permissions
  hidden: false                     // Optional: hide from UI
};
```

### Command Execution File

The execution file exports a function that handles the command logic:

```javascript
const run = async (commandData, utilities) => {
  // Command execution logic
  return result;
};

export default run;
```

## Step-by-Step Guide

### 1. Define the Command Type

First, add your command type to `src/app/const/commands.js`:

```javascript
export const COMMANDS = {
  // ... existing commands
  YOUR_COMMAND: "YOUR_COMMAND_IDENTIFIER",
};
```

**⚠️ Important**: Never change existing command identifiers as noted in the file comment "DO NOT CHANGE VALUES". Only add new ones.

### 2. Create the Command Definition File

Create `src/app/commands/category/YourCommand.js`:

```javascript
import React from 'react';
import IconCommand, { ICON_COLOR } from '../components/IconCommand';
import { YourIcon } from 'react-icons/your-icon-library';
import run from './YourCommand.run';
import { COMMANDS } from '../const/commands';
import { useVariablesDropDown } from '../hooks/useVariablesDropDown';

const scheme = {
  type: COMMANDS.YOUR_COMMAND,
  property1: '',
  property2: '',
  // ... other properties
};

const Control = ({ name }) => {
  const { jsx: property1Input } = useVariablesDropDown({
    label: "Property 1",
    name: `${name}property1`,
    placeholder: "Enter value..."
  });

  return (
    <>
      Your command description {property1Input}
    </>
  );
};

export const YourCommandCommand = {
  icon: <IconCommand Svg={YourIcon} className={ICON_COLOR.BLUE} />,
  label: "Your Command",
  Control,
  run,
  scheme,
  group: "Your Category"
};
```

### 3. Create the Command Execution File

Create `src/app/commands/category/YourCommand.run.js`:

```javascript
import { getSourceValue } from '../funcs/variables';
import Validator from '../validators/Validator';

const run = async ({ property1, property2 }, { getProperty, setProperty }) => {
  // Get actual values from variables or direct input
  const value1 = getSourceValue(property1, { getProperty });
  const value2 = getSourceValue(property2, { getProperty });

  // Validate inputs if needed
  Validator.asNotEmpty(value1, "Property 1");

  // Your command logic here
  const result = processData(value1, value2);

  // Save result if needed
  // setProperty('$result', result);

  return result;
};

export default run;
```

### 4. Register the Command

#### For UI Registration (map.controls.js)

Add import and include in the commands array in `src/app/map.controls.js`:

```javascript
import { YourCommandCommand } from './commands/category/YourCommand';

const commands = [
  // ... existing commands
  YourCommandCommand,
];
```

#### For Background Execution (map.bg.run.js)

If your command needs to run in background context, add it to `src/app/map.bg.run.js`:

```javascript
import YourCommandRun from './commands/category/YourCommand.run';

const entries = [
  // ... existing entries
  [COMMANDS.YOUR_COMMAND, YourCommandRun],
];
```

#### For Content Script Execution (map.page.run.js)

If your command interacts with page content, add it to `src/app/map.page.run.js`:

```javascript
import YourCommandRun from './commands/category/YourCommand.run';

const entries = [
  // ... existing entries
  [COMMANDS.YOUR_COMMAND, YourCommandRun],
];
```

## Common Patterns

### Simple Input Command

For commands that take basic inputs:

```javascript
const Control = ({ name }) => {
  const { jsx: valueInput } = useVariablesDropDown({
    name: `${name}value`,
    placeholder: "Enter value"
  });

  return <>Process {valueInput}</>;
};
```

### Dropdown Selection Command

For commands with predefined options:

```javascript
import Dropdown from '../components/Dropdown';

const options = [
  { name: "Option 1", id: "opt1" },
  { name: "Option 2", id: "opt2" }
];

const Control = ({ name }) => {
  return (
    <>
      Select option: 
      <Dropdown 
        options={options}
        name={`${name}selectedOption`}
      />
    </>
  );
};
```

### Commands with Save Result

For commands that save results to variables:

```javascript
import { useSaveResultTo } from '../hooks/useSaveResultTo';

const Control = ({ name }) => {
  const { jsx: saveToJsx } = useSaveResultTo({ 
    name: `${name}saveTo`, 
    text: "Save result to" 
  });

  return (
    <>
      Your command logic here
      {saveToJsx}
    </>
  );
};
```

### Nested Commands (Groups)

For commands that contain other commands:

```javascript
import { useCollapse } from '../hooks/useCollapse';
import { Commands } from '../containers/Commands';
import NestedView from '../components/NestedView';

const Control = ({ name }) => {
  const collapse = useCollapse();

  return (
    <>
      {collapse.control} Group Description
      {collapse.render(
        <NestedView>
          <Commands prefixName={name} nested />
        </NestedView>
      )}
    </>
  );
};
```

## Execution Context and Utilities

### Available Utilities in Run Functions

The second parameter of your run function provides these utilities:

```javascript
const run = async (commandData, utilities) => {
  const {
    getProperty,    // Get variable value
    setProperty,    // Set variable value
    call,           // Execute nested commands
    scope,          // Current scope context
    ctx,            // Execution context
  } = utilities;
};
```

### Variable Handling

```javascript
// Get variable value (handles both direct values and variable references)
const value = getSourceValue(inputData, { getProperty });

// Set a variable
setProperty('$myVariable', 'some value');

// Get a variable directly
const existingValue = getProperty('$myVariable');
```

### Validation

```javascript
import Validator from '../validators/Validator';

// Common validations
Validator.asNotEmpty(value, "field name");
Validator.asNumber(value, "field name");
Validator.asPositiveNumber(value, "field name");
```

## Execution Modes

Commands can specify execution context:

```javascript
import { SCENARIO_EXECUTION_MODE } from '../const/scheme';

export const YourCommandCommand = {
  // ... other properties
  mode: SCENARIO_EXECUTION_MODE.CONTENT, // Runs in content script
  // mode: SCENARIO_EXECUTION_MODE.BG,   // Runs in background
};
```

## Advanced Features

### Command Permissions

For commands requiring special permissions:

```javascript
export const YourCommandCommand = {
  // ... other properties
  permissions: ['tabs', 'storage'], // Chrome extension permissions
};
```

### Hidden Commands

For internal/utility commands:

```javascript
export const YourCommandCommand = {
  // ... other properties
  hidden: true, // Won't appear in UI
};
```

### Command Groups

Organize related commands:

```javascript
export const YourCommandCommand = {
  // ... other properties
  group: "Network",     // Groups: Utils, Network, File, etc.
};
```

## Icon Guidelines

Choose appropriate icons and colors:

```javascript
import { ICON_COLOR } from '../components/IconCommand';

// Available colors:
// ICON_COLOR.YELLOW - Default/general
// ICON_COLOR.GREEN  - Success/utility operations
// ICON_COLOR.BLUE   - Network/data operations
// ICON_COLOR.GREY   - Delays/waiting
// ICON_COLOR.RED    - Destructive operations
```

## Best Practices

1. **Naming**: Use descriptive names following the pattern `CategoryActionCommand`
2. **Organization**: Place commands in appropriate category folders
3. **Validation**: Always validate inputs in run functions
4. **Error Handling**: Use try-catch blocks for external operations
5. **Documentation**: Add clear labels and placeholders
6. **Testing**: Test commands in different execution contexts

## Common Pitfalls

1. **Missing Registration**: Forgetting to add command to map files
2. **Wrong Execution Context**: Command requiring DOM access registered only in background
3. **Variable References**: Not using `getSourceValue` for variable inputs
4. **Async Operations**: Not properly handling Promise-based operations
5. **Validation**: Skipping input validation leading to runtime errors

## Examples

See existing commands for reference:
- Simple: `src/app/commands/Delay.js`
- With Variables: `src/app/commands/Variable.js`
- DOM Interaction: `src/app/commands/element/FindNode.js`
- Network: `src/app/commands/network/Fetch.js`
- Utils: `src/app/commands/utils/JSON.js`