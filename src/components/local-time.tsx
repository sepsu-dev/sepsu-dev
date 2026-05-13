"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(timeString);
    };

    updateTime();
    // Update every second to show a ticking clock
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Return a placeholder of the same width during SSR to avoid layout shift
  if (!time) {
    return <span className="opacity-0 inline-block w-[95px]">00:00:00 AM</span>;
  }

  return <span>{time}</span>;
}
