/**
 * toArray - returns undefined, split string to array, makes and object an array
 * @param {any} array
 * @returns undefined | array
 */
export default function toArray(array: any) {
  if (Array.isArray(array)) return array
  else if (typeof array === 'object')
    return Object.entries(array).map(([key, value]) => [key, value])
  else if (typeof array === 'string') return array.split('')
  return undefined
}
