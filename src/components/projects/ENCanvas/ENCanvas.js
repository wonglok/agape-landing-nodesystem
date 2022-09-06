import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Floor } from '@/helpers/Floor'
import { FloorEditor } from '@/helpers/FloorEditor'
import { Player } from '@/helpers/Player'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export function ENCanvas() {
  let activeGLBRawObject = useGLBEditor((s) => s.activeGLBRawObject)
  return (
    <div className='w-full h-full'>
      <Canvas className='w-full h-full'>
        {/* <color attach={'background'} args={['#cceeff']}></color> */}

        {activeGLBRawObject.scene && (
          <primitive
            key={activeGLBRawObject.scene.uuid}
            object={activeGLBRawObject.scene}
          ></primitive>
        )}
        {/* <OrbitControls></OrbitControls> */}
        <Environment preset='studio'></Environment>
        <ConnectKeyboard></ConnectKeyboard>
        <ConnectCameraControls></ConnectCameraControls>
        <ConnectSimulation></ConnectSimulation>
        <Player></Player>
        <FloorEditor
          key={activeGLBRawObject.uuid}
          name={activeGLBRawObject.uuid}
        ></FloorEditor>

        {/*  */}
        {/*  */}
      </Canvas>
    </div>
  )
}

//
//
//
//
//
