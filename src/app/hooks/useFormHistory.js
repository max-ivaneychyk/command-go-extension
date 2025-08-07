import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

export function useFormHistory() {
  const {watch, setValue, reset, getValues} = useFormContext();
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 represents the latest form state
  const values = watch();
  const version = values.$$updatedAt;

  useEffect(() => {
    const isDuplicated = history.find(({$$updatedAt}) => $$updatedAt === version);

    if (isDuplicated) return;

    // If at the latest change, add current values to the history
    setHistory((prevHistory) => {
      return [...prevHistory.slice(0, historyIndex+1), structuredClone(getValues())]
    });

    setHistoryIndex((prevIndex) => prevIndex + 1); // Update index to point to the latest entry
  }, [version, history, historyIndex, values]);

  const previous = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      const prevValues = history[historyIndex - 1];

       reset(prevValues)
      // for (const key in prevValues) {
      //   setValue(key, prevValues[key], {shouldTouch: true, shouldValidate: true, shouldDirty: true});
      // }
    }
  };

  const next = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      const nextValues = history[historyIndex + 1];
       reset(nextValues)
      // for (const key in nextValues) {
      //   setValue(key, nextValues[key], {shouldTouch: true, shouldValidate: true, shouldDirty: true});
      // }
    }
  };

  return {
    previous,
    next,
    history,
    historyIndex,
    isPreviousDisabled: historyIndex <= 0,
    isNextDisabled: historyIndex === history.length - 1,
  };
}
