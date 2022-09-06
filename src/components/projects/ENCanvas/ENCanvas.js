import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { FloorEditor } from '@/helpers/FloorEditor'
import { FloorObject } from '@/helpers/FloorObject'
import { Player } from '@/helpers/Player'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export function ENCanvas() {
  let activeGLBRawObject = useGLBEditor((s) => s.activeGLBRawObject)
  let editorNavigationMode = useGLBEditor((s) => s.editorNavigationMode)
  return (
    <div className='w-full h-full bg-white'>
      <Canvas className='w-full h-full'>
        {/* <color attach={'background'} args={['#cceeff']}></color> */}

        {activeGLBRawObject.scene && (
          <primitive
            key={activeGLBRawObject.scene.uuid}
            object={activeGLBRawObject.scene}
          ></primitive>
        )}

        {editorNavigationMode === 'floor' && (
          <>
            <Environment preset='apartment'></Environment>
            <gridHelper args={[500, 500]}></gridHelper>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectCameraControls></ConnectCameraControls>
            <ConnectSimulation></ConnectSimulation>
            <Player></Player>
            <FloorEditor
              key={activeGLBRawObject.uuid}
              name={activeGLBRawObject.uuid}
            ></FloorEditor>
          </>
        )}

        {editorNavigationMode === 'meta' && activeGLBRawObject.scene && (
          <>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectCameraControls></ConnectCameraControls>
            <ConnectSimulation></ConnectSimulation>
            <Player></Player>
            <FloorObject object={activeGLBRawObject.scene}></FloorObject>
            <Environment background preset='apartment'></Environment>
          </>
        )}

        {editorNavigationMode === 'orbit' && (
          <>
            <OrbitControls></OrbitControls>
            <Environment background preset='apartment'></Environment>
          </>
        )}
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
