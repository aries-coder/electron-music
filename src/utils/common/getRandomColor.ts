export function getRandomColor() {
  const allType = '1 2 3 4 5 6 7 8 9 a b c d e f'
  const allTypeArr = allType.split(" ")
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += allTypeArr[Math.floor(Math.random() * allTypeArr.length)]
  }

  return color
}