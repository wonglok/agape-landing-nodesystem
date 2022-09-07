import md5 from 'md5'

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

  return str
}

export const assignSignaturesToGLB = (glb) => {
  glb.scene.traverse((it) => {
    if (it) {
      it.userData.sigMD5 = md5(getSignature(it))
    }
  })
}
