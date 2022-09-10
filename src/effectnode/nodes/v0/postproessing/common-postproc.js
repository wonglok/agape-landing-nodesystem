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
    } else if (typeof v === 'number') {
      return 'float'
    } else if (typeof v === 'object' && typeof v.y !== 'undefined') {
      return 'vec2'
    } else if (typeof v === 'object' && typeof v.z !== 'undefined') {
      return 'vec3'
    } else if (typeof v === 'object' && typeof v.w !== 'undefined') {
      return 'vec4'
    } else if (typeof v === 'string') {
      return 'text'
    } else {
      return 'float'
    }
  }

  //

  for (let kn in defaultValues) {
    if (!data.raw.uniforms.some((u) => u.name === kn)) {
      let val = {
        id: getID(),
        nodeID: data.raw.nodeID,
        name: kn,
        type: getType(defaultValues[kn]),
        protected: true,
        value: defaultValues[kn],
      }
      data.raw.uniforms.push(val)
    }
  }

  let send = () => {
    let _id = getID()
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
