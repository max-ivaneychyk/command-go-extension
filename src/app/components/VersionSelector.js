import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from './Input';

const VersionSelector = () => {
  const { watch } = useFormContext();
  const currentVersion = watch('$$version');
  const minVersion  = useRef(currentVersion);

  const validateVersion = (value) => {
    if (!value) return 'Version is required';

    // Semantic versioning pattern: X.Y.Z
    const versionPattern = /^\d+\.\d+\.\d+$/;
    if (!versionPattern.test(value)) {
      return 'Invalid version format (use X.Y.Z)';
    }

    if (Number(value.split('.').join('')) < Number(minVersion.current.split('.').join(''))) {
      return `Version must be greater than ${minVersion.current}`;
    }

    return "";
  };

  const error = validateVersion(currentVersion);

  return (
    <div className={'flex items-center ml-4 pl-2 mb-4'}>
      <label className={'text-xs mr-2'}>Version:</label>
      <Input name="$$version" />
      {error && (
        <span className={'text-xs text-red-500 ml-2'}>{error}</span>
      )}
    </div>
  );
};

export default VersionSelector;
