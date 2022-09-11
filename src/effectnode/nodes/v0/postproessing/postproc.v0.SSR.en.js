import { getID } from '@/helpers/getID'
import { Bloom } from '@react-three/postprocessing'
import { doSharedPostProc } from './common-postproc'
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
      //   `,
      // },
    ],

    //
    //
    shaders: [],

    //
  }
}

export async function effect({ node, mini, data, setComponent }) {
  let props = {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: false,
    USE_MRT: false,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    DITHERING: true,
    temporalResolveMix: 1,
    temporalResolveCorrectionMix: 1,
    maxSamples: 0,
    resolutionScale: 1,
    blurMix: 0.5543478260869565,
    blurKernelSize: 4,
    BLUR_EXPONENT: 16.73913043478261,
    rayStep: 0.5,
    intensity: 3.5,
    maxRoughness: 1,
    jitter: 1.4,
    jitterSpread: 0.05,
    jitterRough: 1,
    roughnessFadeOut: 1,
    rayFadeOut: 0,
    MAX_STEPS: 20,
    NUM_BINARY_SEARCH_STEPS: 10,
    maxDepthDifference: 8.369565217391305,
    maxDepth: 1,
    thickness: 8.043478260869566,
    ior: 1.33,
  }

  return await doSharedPostProc({
    componentName: 'SSR',
    defaultValues: props,
    node,
    mini,
    data,
    setComponent,
  })

  //

  //
  // //
  // //
  // let output = {
  //   _id: getID(),
  //   type: 'SSR',
  //   props: {
  //     //
  //   },
  // }

  // node.out0.pulse(output)
  //
}

//
