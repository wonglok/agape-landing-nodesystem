import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { FloorFlat } from '@/helpers/FloorFlat'
import { FloorObject } from '@/helpers/FloorObject'
import { Player } from '@/helpers/Player'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Environment, OrbitControls, Select } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { useState } from 'react'
import { UseObjectAsPlayer } from '../UseObjectAsPlayer/UseObjectAsPlayer'
import { AdaptTC } from './AdaptTC'
import { ENTopBarr } from './ENTopBar'

export function ENCanvas() {
  let activeGLBRawObject = useGLBEditor((s) => s.activeGLBRawObject)
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  let editorNavigationMode = useGLBEditor((s) => s.editorNavigationMode)
  let setSelection = useGLBEditor((s) => s.setSelection)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let setOrbit = useGLBEditor((s) => s.setOrbit)
  let [screenPass, setScreenPass] = useState(null)
  return (
    <div className='relative w-full h-full'>
      <Canvas className='w-full h-full'>
        {/* <color attach={'background'} args={['#cceeff']}></color> */}

        <EffectComposer>{screenPass}</EffectComposer>
        <AdaptTC
          onScreenPass={(v) => {
            //
            // setScreenPass(v)
          }}
          node={activeGLBRuntimeObject.scene}
        ></AdaptTC>
        {activeSceneSelection && (
          <boxHelper
            key={activeSceneSelection.uuid}
            args={[activeSceneSelection, 0xff0000]}
          ></boxHelper>
        )}

        {activeGLBRawObject?.scene && (
          <>
            <Select
              onChange={(v) => {
                //
                let first = v[0]

                if (first) {
                  setSelection(first)
                }
                console.log(v)
              }}
              //
              //
            >
              <primitive
                key={activeGLBRuntimeObject.scene.uuid + 'display'}
                object={activeGLBRuntimeObject.scene}
              ></primitive>
              {/*  */}
              {/*  */}
            </Select>
            <EffectNodeRuntime
              key={activeGLBRuntimeObject.scene.uuid + 'runtime'}
              glbObject={activeGLBRuntimeObject}
              glbRaw={activeGLBRawObject}
            ></EffectNodeRuntime>
            {/*  */}
            {/*  */}
          </>
        )}

        {editorNavigationMode === 'avatar' && (
          <>
            <Environment preset='apartment' frames={1}></Environment>
            <gridHelper args={[500, 500]}></gridHelper>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectCameraControls></ConnectCameraControls>
            <ConnectSimulation></ConnectSimulation>
            {/* <Player></Player> */}
            <UseObjectAsPlayer
              glbObject={activeGLBRuntimeObject}
            ></UseObjectAsPlayer>
            <FloorFlat
              key={activeGLBRawObject.uuid + 'floorflat'}
              name={activeGLBRawObject.uuid}
            ></FloorFlat>
          </>
        )}

        {editorNavigationMode === 'floor' && (
          <>
            <Environment preset='apartment' frames={1}></Environment>
            <gridHelper args={[500, 500]}></gridHelper>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectCameraControls></ConnectCameraControls>
            <ConnectSimulation></ConnectSimulation>
            <Player></Player>
            <FloorFlat
              key={activeGLBRawObject.uuid + 'floorflat'}
              name={activeGLBRawObject.uuid}
            ></FloorFlat>
          </>
        )}

        {editorNavigationMode === 'meta' && activeGLBRawObject.scene && (
          <>
            <Environment background preset='apartment' frames={1}></Environment>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectCameraControls></ConnectCameraControls>
            <ConnectSimulation></ConnectSimulation>
            <Player></Player>
            <FloorObject
              key={activeGLBRawObject.uuid + 'floorobj'}
              object={activeGLBRawObject.scene}
            ></FloorObject>
          </>
        )}

        {editorNavigationMode === 'orbit' && (
          <>
            <Environment background preset='apartment' frames={1}></Environment>
            <OrbitControls
              ref={(ref) => {
                setOrbit(ref)
              }}
            ></OrbitControls>
          </>
        )}
      </Canvas>
      <ENTopBarr></ENTopBarr>
    </div>
  )
}

//
//
//
//
//
//
//
