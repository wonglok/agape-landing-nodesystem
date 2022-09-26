import { Box, Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
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

  let wall = useRef()
  let ball = useRef()
  useFrame((_) => {
    if (wall.current) {
      wall.current.lookAt(_.camera.position)
    }
    if (ball.current) {
      ball.current.position.copy(point)
    }
  })
  return (
    <group>
      <Sphere ref={ball} args={[25, 32, 32]}>
        <meshPhysicalMaterial
          transmission={1}
          roughness={0}
          ior={1.5}
          reflectivity={1.0}
          thickness={20}
          metalness={0.1}
        ></meshPhysicalMaterial>
      </Sphere>
      <Box
        ref={wall}
        onPointerMove={(ev) => {
          // console.log(ev.point.x, ev.point.y, ev.point.z)

          point.copy(ev.point)
        }}
        onPointerDown={(ev) => {
          // console.log(ev.point.x, ev.point.y, ev.point.z)

          point.copy(ev.point)
        }}
        position={[0, 0, 0.0]}
        args={[1000, 1000, 0.1]}
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
