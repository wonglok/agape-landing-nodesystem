import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Children, useEffect, useRef } from 'react'
import {
  BoxBufferGeometry,
  CircleBufferGeometry,
  GridHelper,
  SphereBufferGeometry,
  Vector3,
} from 'three'
import { LineStuff } from './LineDrop/LineStuff'
import { useMultiverse } from './useMultiverse'

let ttt = 0
export function Floor({ url }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let usePostProcessing = useMultiverse((s) => s.usePostProcessing)
  let setPostProcessing = useMultiverse((s) => s.setPostProcessing)
  let scene = useThree((s) => s.scene)
  let glb = useGLTF(url)
  useEffect(() => {
    let prom = addNamedScene({ name: url, scene: glb.scene })

    setPostProcessing(false)
    prom.then((it) => {
      let geo = it.geometry || new SphereBufferGeometry(5, 64, 64)
      // geo.scale(1, 0.01, 1)

      glb.scene.visible = false
      let line = new LineStuff({
        baseGeometry: geo,

        glb: glb,
        position: new Vector3(0.0, 0.0, 0.0),
      })
      line.run({
        done: () => {
          line.hide()
          line.removeFromParent()
          setTimeout(() => {
            setPostProcessing(true)
          }, 100)
        },
      })

      setPostProcessing(false)
      scene.add(line)
    })
    return () => {}
  }, [glb, url, scene, addNamedScene, setPostProcessing])

  return (
    <group>
      {/*  */}

      <group>
        <primitive object={glb.scene}></primitive>
      </group>

      {/*  */}
    </group>
  )
}
