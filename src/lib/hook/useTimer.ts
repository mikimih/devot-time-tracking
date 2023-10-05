import { useCallback, useState, useEffect } from 'react';

const interval =
  (delay = 0) =>
  (callback: () => void) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);

const useOneSecondInterval = interval(1000);
export const useTimer = ({
  seconds: initialSeconds = 0,
  running: initiallyRunning = false,
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );
  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  useOneSecondInterval(tick);

  return { pause, running, seconds, start };
};
