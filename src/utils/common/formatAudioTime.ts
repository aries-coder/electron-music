export const formatAudioTime = (time: number) => {
  let f: number | string = Math.floor(time / 60)
  let m: number | string = Math.floor(time % 60)

  f = f < 10 ? '0' + f : f
  m = m < 10 ? '0' + m : m

  return f + ':' + m
}