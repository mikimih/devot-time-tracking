import { useEffect, useRef } from 'react';

type CallbackFunction = () => void;
export function useInterval(callback: CallbackFunction, delay: number | null) {
  const savedCallback = useRef<CallbackFunction | null>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
