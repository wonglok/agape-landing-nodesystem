import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { MyCloth } from './MyCloth'

export function ClothSim() {
  //
  let gl = useThree((s) => s.gl)
  let [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])
  return (
    <group>
      {/*  */}
      {ready && <myCloth args={[{ gl }]} key={MyCloth.key}></myCloth>}
      {/*  */}
    </group>
  )
}
