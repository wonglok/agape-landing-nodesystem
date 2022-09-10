import { getID } from '@/helpers/getID'

export function doSharedPostProc({
  node,
  mini,
  data,
  defaultValues,
  componentName,
}) {
  let getType = (v) => {
    if (typeof v === 'boolean') {
      return 'bool'
    } else if (typeof v === 'number' && !isNaN(Number(v + 0))) {
      return 'float'
    } else if (typeof v === 'object' && v.length === 2) {
      return 'vec2'
    } else if (typeof v === 'object' && v.length === 3) {
      return 'vec3'
    } else if (typeof v === 'object' && v.length === 4) {
      return 'vec4'
    }
  }

  for (let kn in defaultValues) {
    if (!data.raw.uniforms.some((u) => u.name === kn)) {
      let val = {
        id: getID(),
        nodeID: data.raw.nodeID,
        name: kn,
        type: getType(typeof defaultValues[kn]),
        protected: true,
        value: defaultValues[kn],
      }
      data.raw.uniforms.push(val)
    }
  }

  let _id = getID()
  let send = () => {
    let props = {}
    data.raw.uniforms.forEach((uni) => {
      props[uni.name] = data.value[uni.name]
    })

    node.out0.pulse({
      _id: _id,
      type: componentName,
      props,
    })
  }

  data.raw.uniforms.forEach((uni) => {
    data.uniforms[uni.name](() => {
      send()
    })
  })

  send()

  mini.onClean(() => {
    node.out0.pulse(false)
  })
}
