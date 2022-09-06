// import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { BoxBufferGeometry, Mesh } from 'three'
import { Scene } from 'three140'
import { useMultiverse } from './useMultiverse'

export function FloorEditor({ name = 'floor-editor' }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let setPostProcessing = useMultiverse((s) => s.setPostProcessing)

  useEffect(() => {
    let myScene = new Scene()
    myScene.add(new Mesh(new BoxBufferGeometry(1000000, 0.1, 1000000)))
    let prom = addNamedScene({ name: name, scene: myScene })

    // setPostProcessing(false)
    prom.then((it) => {
      // geo.scale(1, 0.01, 1)
      //
    })
    return () => {}
  }, [addNamedScene, setPostProcessing, name])

  return (
    <group>
      {/*  */}

      <group>{/* <primitive object={glb.scene}></primitive> */}</group>

      {/*  */}
    </group>
  )
}
