export default function flattenArray(array: any[]): any[] {
  return array.reduce(
    (flat, toFlat) =>
      flat.concat(Array.isArray(toFlat) ? flattenArray(toFlat) : toFlat),
    []
  )
}
