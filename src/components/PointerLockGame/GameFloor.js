import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { Environment, PointerLockControls, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function GameFloor() {
  let glb = useGLTF(`/scene/newyork/NYC_Expo_30.glb`)
  return (
    <group>
      <primitive object={glb.scene}></primitive>
      <EffectNodeRuntime glbObject={glb}></EffectNodeRuntime>
      {/*  */}
      {/*  */}

      {/*  */}
      {/*  */}
    </group>
  )
}

//

//

//

//
