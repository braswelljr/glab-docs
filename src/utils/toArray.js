export default function toArray(array) {
  if (Array.isArray(array)) return array
  else if (typeof array === 'object')
    return Object.entries(array).map(([key, value]) => [key, value])
  else if (typeof array === 'string') return array.split('')
  else return undefined
}
