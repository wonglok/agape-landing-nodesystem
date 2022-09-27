import { getID } from '@/helpers/getID'
import { MeshPhysicalMaterial } from 'three'
import * as Nodes from 'three/examples/jsm/nodes/Nodes'
import { nodeFrame } from 'three/examples/jsm/renderers/webgl/nodes/WebGLNodes'
//BoxGeometry,
// import { Mesh, MeshStandardMaterial } from 'three140'
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

    //
    outputs: [{ _id: getID(), type: 'output', nodeID }],

    //
    uniforms: [],

    //
  }
}

if (typeof window !== 'undefined') {
  setInterval(() => {
    nodeFrame.update()
  })
}

export function effect({ node, mini, data, setComponent }) {
  //
  let applyToIt = (v) => {
    mini.ready.itself.then((it) => {
      it.material = v
    })
  }

  //
  let physicalMaterialInstance = Nodes.NodeMaterial.fromMaterial(
    new MeshPhysicalMaterial()
  )

  //
  applyToIt(physicalMaterialInstance)

  node.raw.inputs.forEach((it) => {
    node[`in_${it.name}`].stream((v) => {
      //
      physicalMaterialInstance[`${it.name}Node`] = v
      physicalMaterialInstance.needsUpdate = true

      //
      applyToIt(physicalMaterialInstance)
    })
  })

  //
}

//

//

//
