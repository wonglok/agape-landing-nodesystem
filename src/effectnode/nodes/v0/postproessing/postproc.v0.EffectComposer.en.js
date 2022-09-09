import { useEffectNode } from '@/effectnode/store/useEffectNode'
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
      // {
      //   _id: getID(),
      //   nodeID,
      //   name: 'speed',
      //   type: 'float',
      //   value: 1,
      // },
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

function InputSockets({ inputNames, node }) {
  let setPassArray = useEffectNode((s) => s.setPassArray)

  useEffect(() => {
    let tree = {}
    let sync = () => {
      console.log(tree)
      setPassArray(Object.values(tree).filter((e) => e))
    }
    inputNames.forEch((name) => {
      node[name].stream((signal) => {
        if (signal.value) {
          tree[name] = signal.value
        } else {
          tree[name] = false
        }
        sync()
      })
      //
      node[name].ready.then((value) => {
        tree[name] = value
        sync()
      })
    })

    return () => {
      setPassArray([])
    }
  }, [inputNames, node, setPassArray])

  //
  //
  return <></>
}

export function effect({ node, mini, data, setComponent }) {
  //
  let inputNames = [
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

  setComponent(
    <InputSockets
      key={getID()}
      node={node}
      data={data}
      inputNames={inputNames}
    ></InputSockets>
  )
  //
  //
}

//
