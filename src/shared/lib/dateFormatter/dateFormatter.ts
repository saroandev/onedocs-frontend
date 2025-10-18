export const calculateDaysBetween = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    return "-";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiff = end.getTime() - start.getTime();
  const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

  return daysDiff;
};

export const formatDate = (
  isoDateString: string | null,
  type: "withText" | "withNumeric",
  locale = "tr"
) => {
  if (!isoDateString) {
    return "-";
  }

  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const month =
    type == "withNumeric"
      ? String(date.getMonth() + 1).padStart(2, "0")
      : date.toLocaleString(locale, { month: "long" }).charAt(0).toUpperCase() +
        date.toLocaleString(locale, { month: "long" }).slice(1);

  return type == "withNumeric" ? `${day}.${month}.${year}` : `${day} ${month} ${year}`;
};

export const calculateRemainingDaysFromToday = (date: string | null, absolute = false) => {
  if (!date) {
    return "-";
  }

  const targetDate = new Date(date);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

  return absolute ? Math.abs(daysDiff) : daysDiff;
};
