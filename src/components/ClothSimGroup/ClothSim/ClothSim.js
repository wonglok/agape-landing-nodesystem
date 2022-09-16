import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { MyCloth } from './MyCloth'

export function ClothSim() {
  //
  let gl = useThree((s) => s.gl)
  let mouse = useThree((s) => s.mouse)
  let [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])
  return (
    <group>
      {/*  */}
      {ready && <myCloth args={[{ gl, mouse }]} key={MyCloth.key}></myCloth>}
      {/*  */}
    </group>
  )
}
