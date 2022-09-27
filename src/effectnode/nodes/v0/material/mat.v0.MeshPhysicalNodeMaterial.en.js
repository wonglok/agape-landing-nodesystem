import { getID } from '@/helpers/getID'
import { NodeMaterial } from 'three140/examples/jsm/nodes/Nodes'
import { MeshPhysicalMaterial } from 'three140'
// import { materialAlphaTest } from 'three/examples/jsm/nodes/Nodes'

export async function nodeData({ defaultData, nodeID }) {
  return {
    ...defaultData,

    //
    inputs: [
      //
      { _id: getID(), name: 'color', type: 'input', nodeID },
      //
      { _id: getID(), name: 'map', type: 'input', nodeID },
      //
      { _id: getID(), name: 'normalMap', type: 'input', nodeID },
      //
      { _id: getID(), name: 'roughness', type: 'input', nodeID },
      { _id: getID(), name: 'roughnessMap', type: 'input', nodeID },
      //
      { _id: getID(), name: 'metalness', type: 'input', nodeID },
      { _id: getID(), name: 'metalnessMap', type: 'input', nodeID },
      //
      { _id: getID(), name: 'transmission', type: 'input', nodeID },
      { _id: getID(), name: 'transmissionMap', type: 'input', nodeID },
      //
      { _id: getID(), name: 'metalness', type: 'input', nodeID },
      { _id: getID(), name: 'metalnessMap', type: 'input', nodeID },
      //
      { _id: getID(), name: 'emissive', type: 'input', nodeID },
      { _id: getID(), name: 'emissiveMap', type: 'input', nodeID },
      { _id: getID(), name: 'emissiveIntensity', type: 'input', nodeID },
      //
      { _id: getID(), name: 'side', type: 'input', nodeID },
      //
      { _id: getID(), name: 'transparent', type: 'input', nodeID },
      { _id: getID(), name: 'opacity', type: 'input', nodeID },
    ],

    // at least 1
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    uniforms: [],

    //

    //
    //
  }
}

// object.protected

export function effect({ node, mini, data, setComponent }) {
  let applyToIt = (v) => {
    mini.ready.itself.then((it) => {
      it.material = v
    })
  }
  let physicalMaterialInstance = new MeshPhysicalMaterial()
  let nodeMaterial = NodeMaterial.fromMaterial(physicalMaterialInstance)

  applyToIt(nodeMaterial)

  node.raw.inputs.forEach((it) => {
    node[`in_${it.name}`].stream((v) => {
      nodeMaterial[`${it.name}Node`] = v
    })
  })

  //

  // node.in_color.stream((v) => {
  //   nodeMaterial.colorNode = v
  // })

  // node.in_map.stream((v) => {
  //   nodeMaterial.mapNode = v
  // })

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
