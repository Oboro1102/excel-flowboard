import Rabbit from 'crypto-js/rabbit'
import encUtf8 from 'crypto-js/enc-utf8'
export const encodeString = (source: string, key: string) => {
  return Rabbit.encrypt(JSON.stringify(source), key)
}
export const decodeString = (source: string, keyName: string) => {
  const key = sessionStorage.getItem(keyName)
  return JSON.parse(Rabbit.decrypt(source, key).toString(encUtf8))
}
export const generateRandomColor = (count = 1) => {
  const colors = []
  const min = 50
  const max = 200

  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * (max - min + 1)) + min
    const g = Math.floor(Math.random() * (max - min + 1)) + min
    const b = Math.floor(Math.random() * (max - min + 1)) + min
    const toHex = (c: number) => {
      const hex = c.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    colors.push(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
  }

  return colors
}
