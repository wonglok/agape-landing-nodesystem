import { Box, Text, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

export function IconComputer({ onClick = () => {} }) {
  return (
    // <Suspense fallback={null}>
    <ImplementationOfBtn onClick={onClick}></ImplementationOfBtn>
    // </Suspense>
  )
}

export function ImplementationOfBtn({ onClick }) {
  // let glb = useGLTF(`/effectnode/mac-draco.glb`)
  return (
    <group scale={1} onPointerDown={onClick}>
      <Text
        color={'#000000'}
        fontSize={0.7}
        maxWidth={200}
        lineHeight={1}
        textAlign={'center'}
        font='/font/Cronos-Pro-Light_12448.ttf'
        anchorX='center'
        anchorY='middle'
        outlineWidth={0.1}
        outlineColor='#ffffff'
        rotation-x={Math.PI * -0.25}
        position={[0, 3.5, 0]}
      >
        Click to Add Node Module
      </Text>

      <Box args={[5, 0.2, 1]}>
        <meshStandardMaterial color={'blue'} metalness={1} roughness={0} />
      </Box>

      <Box args={[1, 0.2, 5]}>
        <meshStandardMaterial color={'blue'} metalness={1} roughness={0} />
      </Box>
      {/* <primitive object={glb.scene}></primitive> */}
    </group>
  )
}

//
