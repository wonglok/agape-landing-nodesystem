import { sRGBEncoding } from 'three'
import { Canvas } from '@react-three/fiber'

export function ENGraph() {
  return (
    <div className='w-full h-full'>
      <Canvas
        className='w-full h-full'
        onCreated={(st) => {
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
        }}
      >
        <group></group>
        <group></group>
        <group></group>
        <group></group>
        <group></group>
        {/* <color attach={'background'} args={['#77aa33']}></color> */}
      </Canvas>
    </div>
  )
}
