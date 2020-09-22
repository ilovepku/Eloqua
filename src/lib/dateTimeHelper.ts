export enum WeekDayEnum {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export const getWeekDay = (date: Date) => {
  const day = date.getDay();

  return Object.values(WeekDayEnum)[day];
};

export const getReadableDuration = (duration: string) => {
  const durationSplit = duration.split(':');

  if (durationSplit.length === 2) {
    const [m, s] = durationSplit;
    return `${Number(m)}m ${Number(s)}s`;
  } else {
    const [h, m, s] = durationSplit;
    return h === '00'
      ? `${Number(m)}m ${Number(s)}s`
      : `${Number(h)}h ${Number(m)}m ${Number(s)}s`;
  }
};

export const buildTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  return hours > 0
    ? `${hours}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
};
