import { getID } from '@/helpers/getID'
import { NodeMaterial } from 'three140/examples/jsm/nodes/Nodes'
import { MeshPhysicalMaterial } from 'three140'
// import { materialAlphaTest } from 'three/examples/jsm/nodes/Nodes'

export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,

    //
    //
    inputs: [
      //
      { _id: getID(), name: 'color', type: 'input', nodeID },
      { _id: getID(), name: 'map', type: 'input', nodeID },
      { _id: getID(), name: 'normalMap', type: 'input', nodeID },
      { _id: getID(), name: 'emissive', type: 'input', nodeID },
      { _id: getID(), name: 'emissiveMap', type: 'input', nodeID },
      { _id: getID(), name: 'emissiveIntensity', type: 'input', nodeID },
      { _id: getID(), name: 'opacity', type: 'input', nodeID },
      { _id: getID(), name: 'transparent', type: 'input', nodeID },
      { _id: getID(), name: 'side', type: 'input', nodeID },
      { _id: getID(), name: '', type: 'input', nodeID },
      { _id: getID(), name: '', type: 'input', nodeID },
    ],

    // at least 1
    //
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    uniforms: [],

    //
    //
  }
}

export function effect({ node, mini, data, setComponent }) {
  //
  //

  let applyToIt = (v) => {
    mini.ready.itself.then((it) => {
      it.material = v
    })
  }
  let physcialMat = new MeshPhysicalMaterial()

  //

  console.log(physcialMat)

  let material = NodeMaterial.fromMaterial(physcialMat)

  applyToIt(material)

  node.in0.stream((v) => {
    material.colorNode = v
  })

  //

  //

  //

  // console.log(data.raw)
}

//

//

//

//
