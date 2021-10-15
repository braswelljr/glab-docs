export default function flattenArray(array) {
  return array.reduce(
    (flat, toFlat) =>
      flat.concat(Array.isArray(toFlat) ? flattenArray(toFlat) : toFlat),
    []
  )
}
