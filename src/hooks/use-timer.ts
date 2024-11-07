import { useEffect, useState } from 'react';

export default function useTimer(amount: number) {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((c) => c + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (seconds >= amount) setRunning(false);
  }, [seconds, amount]);

  return {
    startTimer: () => setRunning(true),
    stopTimer: () => setRunning(false),
    reset: () => {
      setSeconds(0);
      setRunning(false);
    },
    current: seconds,
    done: seconds >= amount
  };
}
