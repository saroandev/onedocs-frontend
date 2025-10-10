/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import styles from "../styles/date-navigator.module.scss";

const fmtTR = (d: any) => {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
};

const startOfDay = (d: any) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const DateNavigator = () => {
  const today = startOfDay(new Date());
  const [current, setCurrent] = useState(today);
  const isToday = current.getTime() === today.getTime();

  const goPrev = () => {
    const next = new Date(current);
    next.setDate(current.getDate() - 1);
    setCurrent(startOfDay(next));
  };

  const goNext = () => {
    if (isToday) return;
    const next = new Date(current);
    next.setDate(current.getDate() + 1);
    const normalized = startOfDay(next);
    setCurrent(normalized.getTime() > today.getTime() ? today : normalized);
  };

  return (
    <div className={styles.container}>
      <div
        // size="icon"
        // variant="ghost"
        className={styles.navButton}
        onClick={goPrev}
        aria-label="Önceki gün"
      >
        <ChevronLeft className={styles.icon} />
      </div>
      <div
        // variant="secondary"
        className={styles.dateButton}
        // disabled
        aria-label="Tarih filtresi"
        title="Tarih filtresi"
      >
        <Calendar className={styles.calendarIcon} />
        <span>{isToday ? "Bugün" : fmtTR(current)}</span>
      </div>
      <div
        // size="icon"
        // variant="ghost"
        className={styles.navButton}
        onClick={goNext}
        // disabled={isToday}
        aria-label="Sonraki gün"
      >
        <ChevronRight className={styles.icon} />
      </div>
    </div>
  );
};
