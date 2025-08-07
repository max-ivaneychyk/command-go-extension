import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export const usePrevCommand = (name, find) => {
  //  commands.3.commands.0.commands.5.commands.4.commands.4.commands.3.

  const { getValues } = useFormContext();

  return useMemo(() => {
    const pathArr = name
      .split('.')
      .filter(Boolean)
      .map((item) => {
        return /\D/.test(item) ? item : +item;
      });

    while (pathArr.length > 1) {
      const last = pathArr.pop();

      if(/\D/.test(last) || last <= 0) {
        continue;
      }

      pathArr.push(last-1);

      const currentName = pathArr.join(".");
      const values = getValues(currentName);
      const result = find(values, currentName);

      if(result)return values;
    }
  }, [find, getValues, name]);
};
