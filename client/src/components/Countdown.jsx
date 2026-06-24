import { useEffect, useState } from "react";
import { getCountdown } from "../utils/dates.js";

// Live-updating countdown to (or since) an event. Ticks once a second.
function Countdown({ date }) {
  const [time, setTime] = useState(() => getCountdown(date));

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (time.past) {
    return (
      <span className="countdown countdown-past">
        Ended {time.label} ago
      </span>
    );
  }

  return (
    <span className="countdown countdown-upcoming">
      Starts in {time.label}
    </span>
  );
}

export default Countdown;
