import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useMultiverse } from './useMultiverse'

export function Floor({ url }) {
  let addNamedScene = useMultiverse((s) => s.addNamedScene)

  let glb = useGLTF(url)
  useEffect(() => {
    addNamedScene({ name: url, scene: glb.scene })
    return () => {}
  }, [glb, url, addNamedScene])

  return (
    <group>
      {/*  */}
      <primitive object={glb.scene}></primitive>

      {/*  */}
    </group>
  )
}
