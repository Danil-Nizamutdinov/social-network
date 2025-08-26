import { useEffect, useState } from "react";

const useCooldownTimer = (cooldownDateString: string) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const cooldownDate = new Date(cooldownDateString);
    const now = new Date();
    const initialSeconds = Math.max(
      0,
      Math.floor((cooldownDate.getTime() - now.getTime()) / 1000)
    );

    setSecondsLeft(initialSeconds);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownDateString]);

  return secondsLeft;
};

export default useCooldownTimer;
