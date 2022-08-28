import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { Float, Preload, useFBO } from '@react-three/drei' //OrbitControls,
// import useStore from '@/helpers/store'
// import { useEffect, useRef } from 'react'
import {
  Camera,
  DoubleSide,
  NormalBlending,
  Scene,
  sRGBEncoding,
  Vector3,
} from 'three'
import { useMemo } from 'react'
import { useSystemStore } from '@/helpers/useSystemStore'

const PromotePage = ({ router, children }) => {
  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      onCreated={(st) => {
        st.gl.physicallyCorrectLights = true
        st.gl.outputEncoding = sRGBEncoding
      }}
    >
      {children}
    </Canvas>
  )
}

export { PromotePage }
