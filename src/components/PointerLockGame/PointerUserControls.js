import { useFrame, useThree } from '@react-three/fiber'

export function PointerUserControls() {
  let camera = useThree((s) => s.camera)
  let gl = useThree((s) => s.gl)
  let scene = useThree((s) => s.scene)
  //
  return null
}
