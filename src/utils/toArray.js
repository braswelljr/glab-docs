export function toArray(array) {
  if (Array.isArray(array)) return array
  else if (typeof array === 'object') return Object.keys(array)
  else if (typeof array === 'string') return array.split('')
  else return undefined
}
