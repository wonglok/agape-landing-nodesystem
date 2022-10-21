import { getID } from '@/helpers/getID'
import { Color } from 'three'
import {
  MathNode,
  OperatorNode,
  UniformNode,
} from 'three144/examples/jsm/nodes/Nodes'

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
      // {
      //   _id: getID(),
      //   nodeID,
      //   name: 'color',
      //   type: 'color',
      //   value: '#ff0000',
      //   protected: true,
      // },
    ],
  }
}

export function effect({ node, mini, data, setComponent }) {
  //
  let NULL_VALUE = new UniformNode(0, 'float')
  //
  const operatorNode = new OperatorNode('+', NULL_VALUE, NULL_VALUE)

  node.in_inputA.stream((v) => {
    operatorNode.aNode.value = v.value
    node.out_float.pulse(operatorNode)
  })

  node.in_inputB.stream((v) => {
    operatorNode.bNode.value = v.value
    node.out_float.pulse(operatorNode)
  })

  // let applyToIt = (v) => {
  //   mini.ready.itself.then((it) => {
  //     it.material = v
  //   })
  // }
  //
  //

  // let physicalMaterialInstance = new MeshPhysicalMaterial()
  // let nodeMaterial = NodeMaterial.fromMaterial(physicalMaterialInstance)
  // applyToIt(nodeMaterial)
  // node.raw.inputs.forEach((it) => {
  //   node[`in_${it.name}`].stream((v) => {
  //     nodeMaterial[`${it.name}Node`] = v
  //   })
  // })
  //

  //
  // node.in_normalMap.stream((v) => {
  //   nodeMaterial.normalMapNode = v
  // })
  //
  // console.log(data.raw)
}

//

//

//

//
