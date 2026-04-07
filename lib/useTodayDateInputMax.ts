"use client";

import { useEffect, useState } from "react";
import { formatLocalDateISO } from "@/lib/calculations";

export function useTodayDateInputMax() {
  const [today, setToday] = useState<string>();

  useEffect(() => {
    setToday(formatLocalDateISO(new Date()));
  }, []);

  return today;
}
