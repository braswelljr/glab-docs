export default function importAll(r: any) {
  return r.keys().map((fileName: any) => ({
    fileName,
    module: r(fileName)
  }))
}
