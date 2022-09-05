import { Canvas } from '@react-three/fiber'

export function ENGraph() {
  return (
    <div className='w-full h-full'>
      <Canvas className='w-full h-full'>
        <color attach={'background'} args={['#77aa33']}></color>
      </Canvas>
    </div>
  )
}
