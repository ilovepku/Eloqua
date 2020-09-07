import {WeekDayEnum, getWeekDay, getReadableDuration} from './dateTimeHelper';

describe('dateTimeHelpers', () => {
  describe('#getWeekDay()', () => {
    test.each`
      date                                    | expected
      ${new Date('2020-09-06T17:22:30.445Z')} | ${WeekDayEnum.Sunday}
      ${new Date('2020-09-07T17:22:30.445Z')} | ${WeekDayEnum.Monday}
      ${new Date('2020-09-08T17:22:30.445Z')} | ${WeekDayEnum.Tuesday}
      ${new Date('2020-09-09T17:22:30.445Z')} | ${WeekDayEnum.Wednesday}
      ${new Date('2020-09-10T17:22:30.445Z')} | ${WeekDayEnum.Thursday}
      ${new Date('2020-09-11T17:22:30.445Z')} | ${WeekDayEnum.Friday}
      ${new Date('2020-09-12T17:22:30.445Z')} | ${WeekDayEnum.Saturday}
    `(
      'should return day of the week for the given date object',
      ({date, expected}) => {
        expect(getWeekDay(date)).toBe(expected);
      },
    );
  });

  describe('#getReadableDuration()', () => {
    it('should return readable duration', () => {
      expect(getReadableDuration('01:23:45')).toBe('1h 23m 45s');
      expect(getReadableDuration('10:09:08')).toBe('10h 9m 8s');
      expect(getReadableDuration('00:59:59')).toBe('59m 59s');
    });
  });
});
