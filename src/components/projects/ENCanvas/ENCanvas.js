import { Canvas } from '@react-three/fiber'

export function ENCanvas() {
  return (
    <div className='w-full h-full'>
      <Canvas className='w-full h-full'>
        <color attach={'background'} args={['#cceeff']}></color>
      </Canvas>
    </div>
  )
}

//
//
//
//
