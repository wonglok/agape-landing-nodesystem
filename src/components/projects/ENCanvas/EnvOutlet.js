import { Environment } from '@react-three/drei'

export function EnvOutlet() {
  return (
    <group>
      <Environment background preset='apartment' frames={1}></Environment>
    </group>
  )
}
