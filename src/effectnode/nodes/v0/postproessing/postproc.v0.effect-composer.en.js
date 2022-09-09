import { getID } from '@/helpers/getID'
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
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
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
      //
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

export function effect({ node, mini, data, setComponent }) {
  //

  let inputs = [
    'in0',
    'in1',
    'in2',
    'in3',
    'in4',
    'in5',
    'in6',
    'in7',
    'in8',
    'in9',
  ]

  let tree = {}
  inputs.forEach((inp) => {
    node[inp].ready.then((value) => {
      tree[inp] = value
      onSync()
    })
    node[inp].stream((signal) => {
      tree[inp] = signal.value
      onSync()
    })
  })

  let onSync = () => {
    let array = Object.values(tree).filter((e) => e)
    setPassArray(array)
  }
  //
  //
}

//
