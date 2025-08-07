# Command Templates

This document provides ready-to-use templates for different types of commands.

## Basic Command Template

### CommandName.js
```javascript
import React from 'react';
import IconCommand, { ICON_COLOR } from '../components/IconCommand';
import { FiCommand } from 'react-icons/fi'; // Choose appropriate icon
import run from './CommandName.run';
import { COMMANDS } from '../const/commands';
import { useVariablesDropDown } from '../hooks/useVariablesDropDown';

const scheme = {
  type: COMMANDS.YOUR_COMMAND,
  input: '',
  saveTo: ''
};

const Control = ({ name }) => {
  const { jsx: inputField } = useVariablesDropDown({
    name: `${name}input`,
    placeholder: "Enter input value"
  });

  const { jsx: saveToField } = useVariablesDropDown({
    name: `${name}saveTo`,
    placeholder: "Variable to save result"
  });

  return (
    <>
      Process {inputField} and save to {saveToField}
    </>
  );
};

export const CommandNameCommand = {
  icon: <IconCommand Svg={FiCommand} className={ICON_COLOR.BLUE} />,
  label: "Command Name",
  Control,
  run,
  scheme,
  group: "Category"
};
```

### CommandName.run.js
```javascript
import { getSourceValue } from '../funcs/variables';
import Validator from '../validators/Validator';

const run = async ({ input, saveTo }, { getProperty, setProperty }) => {
  const inputValue = getSourceValue(input, { getProperty });
  
  // Validate input
  Validator.asNotEmpty(inputValue, "input");
  
  try {
    // Your command logic here
    const result = processInput(inputValue);
    
    // Save result if saveTo is specified
    if (saveTo) {
      setProperty(saveTo, result);
    }
    
    return result;
  } catch (error) {
    throw new Error(`Command failed: ${error.message}`);
  }
};

export default run;
```

## DOM Interaction Command Template

### DOMCommand.js
```javascript
import React from 'react';
import IconCommand, { ICON_COLOR } from '../../components/IconCommand';
import { FiTarget } from 'react-icons/fi';
import run from './DOMCommand.run';
import { COMMANDS } from '../../const/commands';
import { SCENARIO_EXECUTION_MODE } from '../../const/scheme';
import { useVariablesDropDown } from '../../hooks/useVariablesDropDown';

const scheme = {
  type: COMMANDS.YOUR_DOM_COMMAND,
  selector: '',
  action: 'click',
  value: '',
  saveTo: ''
};

const Control = ({ name }) => {
  const { jsx: selectorField } = useVariablesDropDown({
    name: `${name}selector`,
    placeholder: "CSS selector (e.g., #id, .class)"
  });

  const { jsx: valueField } = useVariablesDropDown({
    name: `${name}value`,
    placeholder: "Value (if needed)"
  });

  const { jsx: saveToField } = useVariablesDropDown({
    name: `${name}saveTo`,
    placeholder: "Save result to variable"
  });

  return (
    <>
      Find element {selectorField} and perform action with value {valueField}. 
      Save result to {saveToField}
    </>
  );
};

export const DOMCommandCommand = {
  icon: <IconCommand Svg={FiTarget} className={ICON_COLOR.GREEN} />,
  label: "DOM Command",
  Control,
  run,
  scheme,
  mode: SCENARIO_EXECUTION_MODE.CONTENT, // Runs in content script
  group: "Element"
};
```

### DOMCommand.run.js
```javascript
import { getSourceValue } from '../../funcs/variables';
import Validator from '../../validators/Validator';

const run = async ({ selector, action, value, saveTo }, { getProperty, setProperty }) => {
  const selectorValue = getSourceValue(selector, { getProperty });
  const actionValue = getSourceValue(action, { getProperty });
  const inputValue = getSourceValue(value, { getProperty });

  Validator.asNotEmpty(selectorValue, "selector");

  try {
    const element = document.querySelector(selectorValue);
    
    if (!element) {
      throw new Error(`Element not found: ${selectorValue}`);
    }

    let result;
    
    switch (actionValue) {
      case 'click':
        element.click();
        result = 'clicked';
        break;
      case 'getValue':
        result = element.value || element.textContent;
        break;
      case 'setValue':
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.value = inputValue;
        } else {
          element.textContent = inputValue;
        }
        result = 'value set';
        break;
      default:
        throw new Error(`Unknown action: ${actionValue}`);
    }

    if (saveTo) {
      setProperty(saveTo, result);
    }

    return result;
  } catch (error) {
    throw new Error(`DOM operation failed: ${error.message}`);
  }
};

export default run;
```

## Network Request Command Template

### NetworkCommand.js
```javascript
import React from 'react';
import IconCommand, { ICON_COLOR } from '../../components/IconCommand';
import { FiGlobe } from 'react-icons/fi';
import run from './NetworkCommand.run';
import { COMMANDS } from '../../const/commands';
import { useVariablesDropDown } from '../../hooks/useVariablesDropDown';
import Dropdown from '../../components/Dropdown';

const methods = [
  { name: 'GET', id: 'GET' },
  { name: 'POST', id: 'POST' },
  { name: 'PUT', id: 'PUT' },
  { name: 'DELETE', id: 'DELETE' }
];

const scheme = {
  type: COMMANDS.YOUR_NETWORK_COMMAND,
  url: '',
  method: 'GET',
  headers: '{}',
  body: '',
  saveTo: ''
};

const Control = ({ name }) => {
  const { jsx: urlField } = useVariablesDropDown({
    name: `${name}url`,
    placeholder: "https://api.example.com/data"
  });

  const { jsx: headersField } = useVariablesDropDown({
    name: `${name}headers`,
    placeholder: '{"Content-Type": "application/json"}'
  });

  const { jsx: bodyField } = useVariablesDropDown({
    name: `${name}body`,
    placeholder: "Request body (JSON string)"
  });

  const { jsx: saveToField } = useVariablesDropDown({
    name: `${name}saveTo`,
    placeholder: "Variable to save response"
  });

  return (
    <>
      Make <Dropdown options={methods} name={`${name}method`} /> request to {urlField}
      <br />
      Headers: {headersField}
      <br />
      Body: {bodyField}
      <br />
      Save response to: {saveToField}
    </>
  );
};

export const NetworkCommandCommand = {
  icon: <IconCommand Svg={FiGlobe} className={ICON_COLOR.BLUE} />,
  label: "Network Request",
  Control,
  run,
  scheme,
  group: "Network"
};
```

### NetworkCommand.run.js
```javascript
import { getSourceValue } from '../../funcs/variables';
import Validator from '../../validators/Validator';

const run = async ({ url, method, headers, body, saveTo }, { getProperty, setProperty }) => {
  const urlValue = getSourceValue(url, { getProperty });
  const methodValue = getSourceValue(method, { getProperty });
  const headersValue = getSourceValue(headers, { getProperty });
  const bodyValue = getSourceValue(body, { getProperty });

  Validator.asNotEmpty(urlValue, "URL");

  try {
    const requestOptions = {
      method: methodValue,
      headers: headersValue ? JSON.parse(headersValue) : {}
    };

    if (bodyValue && ['POST', 'PUT', 'PATCH'].includes(methodValue)) {
      requestOptions.body = bodyValue;
    }

    const response = await fetch(urlValue, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();

    if (saveTo) {
      setProperty(saveTo, responseData);
    }

    return responseData;
  } catch (error) {
    throw new Error(`Network request failed: ${error.message}`);
  }
};

export default run;
```

## Utility Command Template

### UtilCommand.js
```javascript
import React from 'react';
import IconCommand, { ICON_COLOR } from '../../components/IconCommand';
import { FiTool } from 'react-icons/fi';
import run from './UtilCommand.run';
import { COMMANDS } from '../../const/commands';
import { useVariablesDropDown } from '../../hooks/useVariablesDropDown';
import { useSaveResultTo } from '../../hooks/useSaveResultTo';
import Dropdown from '../../components/Dropdown';

const operations = [
  { name: 'Format', id: 'format' },
  { name: 'Transform', id: 'transform' },
  { name: 'Validate', id: 'validate' }
];

const scheme = {
  type: COMMANDS.YOUR_UTIL_COMMAND,
  input: '',
  operation: 'format',
  options: '{}',
  saveTo: ''
};

const Control = ({ name }) => {
  const { jsx: inputField } = useVariablesDropDown({
    name: `${name}input`,
    placeholder: "Input data"
  });

  const { jsx: optionsField } = useVariablesDropDown({
    name: `${name}options`,
    placeholder: "Options (JSON)"
  });

  const { jsx: saveToJsx } = useSaveResultTo({
    name: `${name}saveTo`,
    text: "Save result to"
  });

  return (
    <>
      Perform <Dropdown options={operations} name={`${name}operation`} /> 
      on {inputField} with options {optionsField}
      <br />
      {saveToJsx}
    </>
  );
};

export const UtilCommandCommand = {
  icon: <IconCommand Svg={FiTool} className={ICON_COLOR.GREEN} />,
  label: "Utility Command",
  Control,
  run,
  scheme,
  group: "Utils"
};
```

### UtilCommand.run.js
```javascript
import { getSourceValue } from '../../funcs/variables';
import Validator from '../../validators/Validator';

const run = async ({ input, operation, options, saveTo }, { getProperty, setProperty }) => {
  const inputValue = getSourceValue(input, { getProperty });
  const operationValue = getSourceValue(operation, { getProperty });
  const optionsValue = getSourceValue(options, { getProperty });

  Validator.asNotEmpty(inputValue, "input");

  try {
    const parsedOptions = optionsValue ? JSON.parse(optionsValue) : {};
    let result;

    switch (operationValue) {
      case 'format':
        result = formatData(inputValue, parsedOptions);
        break;
      case 'transform':
        result = transformData(inputValue, parsedOptions);
        break;
      case 'validate':
        result = validateData(inputValue, parsedOptions);
        break;
      default:
        throw new Error(`Unknown operation: ${operationValue}`);
    }

    setProperty(saveTo, result);
    return result;
  } catch (error) {
    throw new Error(`Utility operation failed: ${error.message}`);
  }
};

// Helper functions
const formatData = (data, options) => {
  // Implementation specific to your needs
  return data;
};

const transformData = (data, options) => {
  // Implementation specific to your needs
  return data;
};

const validateData = (data, options) => {
  // Implementation specific to your needs
  return { valid: true, data };
};

export default run;
```

## Group Command Template

### GroupCommand.js
```javascript
import React from 'react';
import IconCommand, { ICON_COLOR } from '../components/IconCommand';
import { FiLayers } from 'react-icons/fi';
import run from './GroupCommand.run';
import { COMMANDS } from '../const/commands';
import { useCollapse } from '../hooks/useCollapse';
import { Commands } from '../containers/Commands';
import NestedView from '../components/NestedView';
import Input from '../components/Input';

const scheme = {
  type: COMMANDS.YOUR_GROUP_COMMAND,
  name: "Command Group",
  commands: [],
  condition: '', // Optional condition to execute group
  saveTo: ''
};

const Control = ({ name }) => {
  const collapse = useCollapse();

  return (
    <>
      {collapse.control} Group: <Input name={`${name}name`} />
      {collapse.render(
        <NestedView>
          <Commands prefixName={name} nested />
        </NestedView>
      )}
    </>
  );
};

export const GroupCommandCommand = {
  icon: <IconCommand Svg={FiLayers} className={ICON_COLOR.GREEN} />,
  label: "Command Group",
  Control,
  run,
  scheme,
  group: "Logic"
};
```

### GroupCommand.run.js
```javascript
import { getSourceValue } from '../funcs/variables';

const run = async ({ commands, condition, saveTo }, { call, getProperty, setProperty }) => {
  // Check condition if provided
  if (condition) {
    const conditionValue = getSourceValue(condition, { getProperty });
    if (!conditionValue) {
      return null; // Skip execution if condition is false
    }
  }

  try {
    // Execute all commands in the group
    const results = [];
    
    for (const command of commands) {
      const result = await call(command);
      results.push(result);
    }

    const groupResult = {
      executed: commands.length,
      results: results.filter(r => r !== undefined)
    };

    if (saveTo) {
      setProperty(saveTo, groupResult);
    }

    return groupResult;
  } catch (error) {
    throw new Error(`Group execution failed: ${error.message}`);
  }
};

export default run;
```

## Registration Template

Add these lines to the appropriate map files:

### In src/app/map.controls.js
```javascript
// Add import at the top
import { YourCommandCommand } from './commands/category/YourCommand';

// Add to commands array
const commands = [
  // ... existing commands
  YourCommandCommand,
];
```

### In src/app/map.page.run.js (for content script commands)
```javascript
// Add import at the top
import YourCommandRun from './commands/category/YourCommand.run';

// Add to entries array
const entries = [
  // ... existing entries
  [COMMANDS.YOUR_COMMAND, YourCommandRun],
];
```

### In src/app/map.bg.run.js (for background commands)
```javascript
// Add import at the top
import YourCommandRun from './commands/category/YourCommand.run';

// Add to entries array
const entries = [
  // ... existing entries
  [COMMANDS.YOUR_COMMAND, YourCommandRun],
];
```

## Quick Start Checklist

1. ✅ Add command type to `src/app/const/commands.js`
2. ✅ Create command definition file (`YourCommand.js`)
3. ✅ Create command execution file (`YourCommand.run.js`)
4. ✅ Import and add to `src/app/map.controls.js`
5. ✅ Add to appropriate execution map (`map.page.run.js` or `map.bg.run.js`)
6. ✅ Test the command in the extension
7. ✅ Add proper error handling and validation
8. ✅ Choose appropriate icon and color
9. ✅ Set correct execution mode if needed
10. ✅ Add to appropriate command group