import { getID } from '@/helpers/getID'
import { Color } from 'three'
import { OperatorNode, UniformNode } from 'three144/examples/jsm/nodes/Nodes'

export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,

    //
    //
    inputs: [
      //
      { _id: getID(), type: 'input', name: 'inputA', nodeID },
      { _id: getID(), type: 'input', name: 'inputB', nodeID },
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
        name: 'operand',
        type: 'text',
        value: '+',
        protected: true,
      },
    ],
  }
}

//

export function effect({ node, mini, data, setComponent }) {
  //
  let NULL_VALUE = new UniformNode(0, 'float')
  let NULL_VALUE2 = new UniformNode(0, 'float')
  //
  const operatorNode = new OperatorNode('+', NULL_VALUE, NULL_VALUE2)

  data.uniforms['operand']((v) => {
    operatorNode.op = v.value
    node.out_float.pulse(operatorNode)
  })

  node.in_inputA.stream((v) => {
    operatorNode.aNode.value = v.value
    node.out_float.pulse(operatorNode)
  })

  node.in_inputB.stream((v) => {
    operatorNode.bNode.value = v.value
    node.out_float.pulse(operatorNode)
  })
}

//

//

//
