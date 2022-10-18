import { getID } from '@/helpers/getID'
import { MeshPhysicalMaterial } from 'three'
import {
  NodeMaterial,
  checker,
  mul,
  add,
  uv,
  vec2,
  timerLocal,
} from 'three144/examples/jsm/nodes/Nodes'
// BoxGeometry,
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
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    uniforms: [
      //
    ],
  }
}

//

let orig = new WeakMap()
export function effect({ node, mini, data, setComponent }) {
  //
  let applyToIt = (v) => {
    mini.ready.itself.then((it) => {
      if (!orig.has(it)) {
        orig.set(it, it.material)
      }
      it.material = v

      it.userData.onBeforeExport = () => {
        it.material = orig.get(it)
      }
    })
    physicalMaterialInstance.needsUpdate = true
  }

  //
  let physicalMaterialInstance = NodeMaterial.fromMaterial(
    new MeshPhysicalMaterial()
  )

  //
  applyToIt(physicalMaterialInstance)

  node.raw.inputs.forEach((it) => {
    node[`in_${it.name}`].stream((v) => {
      physicalMaterialInstance[`${it.name}Node`] = v

      applyToIt(physicalMaterialInstance)
    })
  })

  //
}

//
//
//
