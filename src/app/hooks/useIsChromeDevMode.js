import {browser} from "../../chrome/const/extension";
import {useEffect, useState} from "react";


function isUserScriptsAvailable() {
  try {
    // Property access which throws if developer mode is not enabled.
    return !!browser.userScripts;
  } catch {
    // Not available.
    return false;
  }
}

export const useIsChromeDevMode = () => {
  const [available, setIsAvailable, ] = useState(isUserScriptsAvailable());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAvailable(isUserScriptsAvailable())
    }, 3000)

    return () => clearInterval(interval);
  }, []);

  return available;
}
