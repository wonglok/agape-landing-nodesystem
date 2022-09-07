// import { useGLTF } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { BoxBufferGeometry, GridHelper, Mesh, Object3D } from 'three140'
// import { BoxBufferGeometry, Mesh } from 'three'
// import { Scene } from 'three140'
import { useMultiverse } from './useMultiverse'

export function FloorObject({ object }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let setPostProcessing = useMultiverse((s) => s.setPostProcessing)
  let setPosition = useMultiverse((s) => s.setPosition)
  let scene = useThree((s) => s.scene)
  useEffect(() => {
    let cleans = []
    if (!object) {
      console.log('needs to use a object for floor')
      return
    }

    try {
      let prom = addNamedScene({ name: object.uuid, scene: object })

      // setPostProcessing(false)
      prom.then(
        (it) => {
          // geo.scale(1, 0.01, 1)
          //
          setPosition({ initPos: [0, 5, 5], cameraOffset: [0, -3, 3] })
        },
        () => {
          let o3 = new Object3D()
          o3.add(new Mesh(new BoxBufferGeometry(1000000, 0.1, 1000000)))

          let grid = new GridHelper(300, 300)
          scene.add(grid)
          cleans.push(() => {
            grid.removeFromParent()
          })
          addNamedScene({ name: object.uuid + '_fall', scene: o3 }).then(() => {
            setPosition({ initPos: [0, 5, 5], cameraOffset: [0, -3, 3] })
          })
        }
      )
    } catch (e) {
      ///
    }

    return () => {
      cleans.forEach((t) => t())
    }
  }, [addNamedScene, setPostProcessing, object, setPosition, scene])

  return (
    <group>
      {/*  */}

      <group>{/* <primitive object={glb.scene}></primitive> */}</group>

      {/*  */}
    </group>
  )
}
