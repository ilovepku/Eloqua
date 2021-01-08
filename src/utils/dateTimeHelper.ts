export const buildTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600)
  const remainingSeconds = totalSeconds % 3600
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = Math.floor(remainingSeconds % 60)

  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  return hours > 0
    ? `${hours}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`
}

export const buildDateString = (date: string): string =>
  new Date(date).toDateString()
