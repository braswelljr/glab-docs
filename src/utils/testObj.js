const documentation = require('./documentation')

const d = Object.entries(documentation).map(([key, value]) => [key, value])

const l = d.map(i => {
  if (typeof i[1] === 'object') {
    return [i[0], ...Object.entries(i[1]).map(([key, value]) => [key, value])]
  } else if (Array.isArray(i[1])) {
    return [i[0], ...i[1]]
  }
})

const e = l.map((i, k) => {
  if (k === 1) {
    return i.flatMap(hey => hey)
  } else {
    i.map((x, n) => {
      n == 0 ? x : x.shift()
    })

    return i.flatMap(hey => hey)
  }
})

console.log(e)
