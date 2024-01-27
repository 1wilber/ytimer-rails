/**
 * helper to convert ms to time format
 *
 * @param {integer} ms
 */
export const msToTime = (ms) => {
  const time = parseFloat(ms) / 1000

  if (ms === 0) {
    return '0.000'
  }

  if (ms < 60000) {
    return `${Math.floor(time % 60)}.${Math.floor(time % 1 * 1000)}`
  }

  if (ms < 3600000) {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`
  }
}
