import {buildTime, buildDateString} from '../src/utils/dateTimeHelper'

describe('buildTime', () => {
  it('should generate MM:SS from seconds', () => {
    expect(buildTime(0)).toEqual('00:00')
    expect(buildTime(3599)).toEqual('59:59')
  })

  it('should generate H:MM:SS from seconds', () => {
    expect(buildTime(3600)).toEqual('1:00:00')
    expect(buildTime(7199)).toEqual('1:59:59')
    expect(buildTime(36000)).toEqual('10:00:00')
  })
})

describe('buildDateString', () => {
  it('should generate more friendly date string', () => {
    expect(buildDateString('1989-01-01')).toEqual('Sun Jan 01 1989')
  })
})
