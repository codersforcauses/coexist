import { useEffect, useState } from "react";

/* Hook to enable delaying a specified amount of time before showing a pending state */
/* Use for form submission, page loading, etc */
/* Prevents flickering and improves user experience */
export function useDelayedPending(
  isPending: boolean,
  delayMs: number = 250,
): boolean {
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    if (isPending) {
      const timeout = setTimeout(() => setShowPending(true), delayMs);
      return () => clearTimeout(timeout);
    } else {
      setShowPending(false);
    }
  }, [isPending, delayMs]);

  return showPending;
}
