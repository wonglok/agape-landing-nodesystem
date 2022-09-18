import { Box } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { MyCloth } from './MyCloth'

export function ClothSim() {
  //
  let gl = useThree((s) => s.gl)
  let mouse = useThree((s) => s.mouse)
  let [ready, setReady] = useState(false)
  let point = new Vector3()
  useEffect(() => {
    setReady(true)
  }, [])
  return (
    <group>
      <Box
        onPointerMove={(ev) => {
          // console.log(ev.point.x, ev.point.y, ev.point.z)

          point.copy(ev.point)
        }}
        position={[0, 0, 0.0]}
        args={[1000, 1000, 0.0]}
      >
        <meshStandardMaterial
          transparent={true}
          opacity={0}
        ></meshStandardMaterial>
      </Box>
      {/*  */}
      {ready && (
        <myCloth args={[{ gl, mouse: point }]} key={MyCloth.key}></myCloth>
      )}
      {/*  */}
    </group>
  )
}
