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
  const [h, m, s] = duration.split(':');
  return `${Number(h)}h ${Number(m)}m ${Number(s)}s`;
};
