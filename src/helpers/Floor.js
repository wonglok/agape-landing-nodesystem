import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import anime from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'

import { useMultiverse } from './useMultiverse'

export function Floor({ url }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let scene = useThree((s) => s.scene)
  let glb = useGLTF(url)

  useEffect(() => {
    addNamedScene({ name: url, scene: glb.scene })

    // setPostProcessing(false)

    // let gh = new GridHelper(100, 100, 0xff0000, 0xff00ff)
    // scene.add(gh)
    // ref.current = 0

    return () => {}
  }, [glb, url, scene, addNamedScene])

  return (
    <group>
      <Animated>
        <primitive object={glb.scene}></primitive>
      </Animated>
    </group>
  )
}

function Animated({ children }) {
  let ref = useRef()

  let s1 = new Vector3(1, 1, 1)
  let s0 = new Vector3(0, 0, 0)
  let showFloor = useMultiverse((s) => s.showFloor)

  useFrame(() => {
    if (showFloor) {
      ref.current.scale.lerp(s1, 0.1)
    } else {
      ref.current.scale.lerp(s0, 0.1)
    }
  })

  // useEffect(() => {
  //   value.current = 0
  //   anime({
  //     targets: [value],
  //     current: 1,
  //     duration: 3000,
  //     complete: () => {},
  //   })

  //   return () => {
  //     value.current = 1
  //     anime({
  //       targets: [value],
  //       current: 0,
  //       duration: 3000,
  //       complete: () => {},
  //     })
  //   }
  // }, [showFloor])

  return <group ref={ref}>{children}</group>
}
