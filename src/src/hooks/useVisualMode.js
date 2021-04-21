import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  const transition = (newMode, replace = false) => {
    if (replace !== true) {
      setHistory(prev => [...prev, mode])
    }
    setMode(newMode);
  }

  const back = () => {
    let historyClone = [...history];
    if (historyClone.length > 0) {
      setMode(historyClone.pop());
      setHistory(historyClone);
    }
  }

  return { mode, transition, back };
}

export default useVisualMode;