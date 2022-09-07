let r = require.context('../nodes/', true, /\.en\.js$/, 'lazy')

function importAll(r) {
  let arr = []
  r.keys().forEach((key) => {
    let filename = path.basename(key)
    filename = filename.replace('.en.js', '')

    if (!arr.map((e) => e.title).includes(filename)) {
      arr.push({
        key,
        title: filename,
        loader: () => r(key),
      })
    }
  })

  // console.log(arr)

  return arr
}

const codes = importAll(r)

export default codes
