import { getID } from '@/helpers/getID'
import { BlendFunction, KernelSize, Resolution } from 'postprocessing'
// import { Bloom } from '@react-three/postprocessing'
// import { createPortal } from '@react-three/fiber'
// import { useEffect, useState } from 'react'
// import { Object3D } from 'three140'
//

export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,

    //
    //
    inputs: [
      //
      { _id: getID(), type: 'input', nodeID },
    ],

    // at least 1
    //
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    material: [],

    //
    uniforms: [
      // {
      //   _id: getID(),
      //   nodeID,
      //   name: 'speed',
      //   type: 'float',
      //   value: 1,
      // },
      //
      // {
      //   _id: getID(),
      //   nodeID,
      //   name: 'colorA',
      //   type: 'color',
      //   value: '#00ff89',
      // },
      // {
      //   id: getID(),
      //   nodeID,
      //   name: 'shader',
      //   type: `glsl`,
      //   value: `
      //   `,d
      // },
      // mipmapBlur: true,
      // radius: number,
      // levels: number,
      // luminanceThreshold: 0.2,
      // luminanceSmoothing: number,
      // intensity: number,
      // width: number,
      // height: number,
      //
    ],

    //
    //
    shaders: [],

    //
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
    // kernelSize: KernelSize.LARGE,
    resolutionScale: 0.5,
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

  send()

  data.raw.uniforms.forEach((uni) => {
    data.uniforms[uni.name]((value) => {
      send()
    })
  })
  //
}

//

//
