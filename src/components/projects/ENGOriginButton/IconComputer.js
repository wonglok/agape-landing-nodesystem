import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

export function IconComputer({ onClick = () => {} }) {
  return (
    <Suspense fallback={null}>
      <IconComputerInside onClick={onClick}></IconComputerInside>
    </Suspense>
  )
}

export function IconComputerInside({ onClick }) {
  let glb = useGLTF(`/effectnode/mac-draco.glb`)
  return (
    <group scale={0.5} onPointerDown={onClick}>
      <primitive object={glb.scene}></primitive>
    </group>
  )
}

//
