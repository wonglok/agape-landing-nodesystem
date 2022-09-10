import { getID } from '@/helpers/getID'
export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,
    inputs: [
      //
      { _id: getID(), type: 'input', nodeID },
    ],
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    material: [],
    uniforms: [],
    shaders: [],
  }
}

export async function effect({ node, mini, data, setComponent }) {
  let PresetValues = {
    luminanceThreshold: 0.1,
    luminanceSmoothing: 0.025,
    mipmapBlur: true,
    intensity: 1,
    radius: 0.85,
    levels: 8,
    resolutionScale: 0.5,
    // kernelSize: KernelSize.LARGE,
    // width: Resolution.AUTO_SIZE,
    // height: Resolution.AUTO_SIZE,
  }

  for (let kn in PresetValues) {
    // PresetValues[kn] =

    if (!data.raw.uniforms.some((u) => u.name === kn)) {
      data.raw.uniforms.push({
        id: getID(),
        nodeID: data.raw.nodeID,
        name: kn,
        type: typeof PresetValues[kn] === 'boolean' ? 'bool' : 'float',
        protected: true,
        value: PresetValues[kn],
      })
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
      type: 'Bloom',
      props,
    })
  }

  data.raw.uniforms.forEach((uni) => {
    data.uniforms[uni.name](() => {
      send()
    })
  })

  send()
}
