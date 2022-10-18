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
      { _id: getID(), type: 'output', name: 'float', nodeID },
    ],

    //
    uniforms: [
      {
        _id: getID(),
        nodeID,
        name: 'float',
        type: 'float',
        value: 0,
        protected: true,
      },
    ],

    //
  }
}

//
export function effect({ node, mini, data, setComponent }) {
  let uniformNode = new UniformNode(0, 'float')

  data.uniforms['float']((v) => {
    uniformNode.value = v.value
    node['out_float'].pulse(uniformNode)
  })
}

//

//

//

//
