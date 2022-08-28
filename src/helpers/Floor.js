import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useMultiverse } from './useMultiverse'

export function Floor({ url }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let player = useMultiverse((s) => s.player)

  let glb = useGLTF(url)
  useEffect(() => {
    addNamedScene({ name: url, scene: glb.scene })
    return () => {}
  }, [glb, url, addNamedScene])

  return (
    <group>
      {/*  */}
      <primitive object={glb.scene}></primitive>

      <primitive object={player}></primitive>

      {/*  */}
    </group>
  )
}

//
