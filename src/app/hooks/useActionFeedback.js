import {useRef, useState} from "react";

export const useActionFeedback = () => {
  const [message, setMessage] = useState("")
  const ref = useRef(0)

  const toast = (newMsg, ms = 2000) => {
    clearTimeout(ref.current);
    setMessage(newMsg);
    ref.current = setTimeout(() => {
      setMessage("")
    }, ms)
  }

  return {
    message,
    toast
  }
}
