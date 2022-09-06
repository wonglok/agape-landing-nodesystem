// import { useGLTF } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
// import { BoxBufferGeometry, Mesh } from 'three'
// import { Scene } from 'three140'
import { useMultiverse } from './useMultiverse'

export function FloorObject({ object }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let setPostProcessing = useMultiverse((s) => s.setPostProcessing)

  useEffect(() => {
    if (!object) {
      console.log('needs to use a object for floor')
      return
    }
    let prom = addNamedScene({ name: object.uuid, scene: object })

    // setPostProcessing(false)
    prom.then((it) => {
      // geo.scale(1, 0.01, 1)
      //
    })
    return () => {}
  }, [addNamedScene, setPostProcessing, object])

  return (
    <group>
      {/*  */}

      <group>{/* <primitive object={glb.scene}></primitive> */}</group>

      {/*  */}
    </group>
  )
}
