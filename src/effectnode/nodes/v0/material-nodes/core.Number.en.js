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
      { _id: getID(), type: 'output', name: 'number', nodeID },
    ],

    //
    uniforms: [
      {
        _id: getID(),
        nodeID,
        name: 'number',
        type: 'number',
        value: '#ff0000',
        protected: true,
      },
    ],

    //
  }
}

//
export function effect({ node, mini, data, setComponent }) {
  let numberObj = new Number(data.value.number)
  let uniform = new UniformNode(numberObj, 'number')

  data.uniforms['number']((v) => {
    uniform = new UniformNode(v.value, 'number')
    node['out_number'].pulse(uniform)
  })
}

//

//

//

//

//
