import {useEffect, useState} from "react";

const THEME = {
  DARK: 'dark',
  LIGHT: "light"
}

const useTheme = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.theme === THEME.DARK
  });

  useEffect(() => {
    localStorage.theme = dark ? THEME.DARK : THEME.LIGHT;
    document.body.dataset.mode = dark ? THEME.DARK : THEME.LIGHT;
  }, [dark]);

  const onToggle = () => {
    setDark(prev => !prev)
  }

  return {
    dark,
    onToggle
  }
}

export default useTheme
