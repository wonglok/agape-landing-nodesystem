import md5 from 'md5'

let r = require.context('../../vfx-nodes/', true, /\.en\.js$/, 'lazy')

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

const getSignature = (it) => {
  let str = '' + it.name

  if (it.geometry) {
    str += it.geometry.attributes.position?.array?.length + '-'
    str += it.geometry.attributes.normal?.array?.length + '-'
  }

  let k = 0
  it.traverse((sb) => {
    str += `-${k}-${sb.name}-`
    k += 1
  })

  // console.log(str)
  return str
}

export const getPosMD5 = (glb) => {
  glb.scene.traverse((it) => {
    it.userData.posMD5 = md5(getSignature(it))
  })
}

export default codes
