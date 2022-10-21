import { getID } from '@/helpers/getID'
import { Color } from 'three'
import { UniformNode } from 'three144/examples/jsm/nodes/Nodes'

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
    outputs: [
      //
      { _id: getID(), type: 'output', name: 'color', nodeID },
    ],

    //
    uniforms: [
      {
        _id: getID(),
        nodeID,
        name: 'color',
        type: 'color',
        value: '#ff0000',
        protected: true,
      },
    ],

    //
  }
}

//
export function effect({ node, mini, data, setComponent }) {
  let colorObj = new Color(data.value.color)
  let uniform = new UniformNode(colorObj, 'color')

  data.uniforms['color']((v) => {
    colorObj.set(v.value)
    node['out_color'].pulse(uniform)
  })
}

//
