import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { FloorFlat } from '@/helpers/FloorFlat'
import { FloorObject } from '@/helpers/FloorObject'
import { Player } from '@/helpers/Player'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Environment, OrbitControls, Select } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { useEffect, useState } from 'react'
// import { UseObjectAsPlayer } from '../UseObjectAsPlayer/UseObjectAsPlayer'
import { AdaptTC } from './transform/AdaptTC'
import { ENTopBarr } from './ENTopBar'
import { PostProcCallers } from '@/effectnode/component/PostProcCallers'
import { EnvOutlet } from './EnvOutlet'

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

        <EffectComposer>
          {screenPass}
          <PostProcCallers></PostProcCallers>
          {/* <Bloom luminanceThreshold={0.1}></Bloom> */}
          {/* <SSR></SSR> */}
        </EffectComposer>
        {/*  */}
        <AdaptTC
          onScreenPass={(v) => {
            setScreenPass(v)
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
                let first = v[0]
                if (first) {
                  setSelection(first)
                }
              }}
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

        {editorNavigationMode === 'floor' && (
          <>
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
            <OrbitControls
              ref={(ref) => {
                setOrbit(ref)
              }}
            ></OrbitControls>
            {/* <CamTrack activeSceneSelection={activeSceneSelection}></CamTrack> */}
          </>
        )}

        {/*
        {editorNavigationMode === 'avatar' && (
          <>
            <Environment background preset='apartment' frames={1}></Environment>
            <gridHelper args={[500, 500]}></gridHelper>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectCameraControls></ConnectCameraControls>
            <ConnectSimulation></ConnectSimulation>
            <Player></Player>
            <UseObjectAsPlayer
              glbObject={activeGLBRuntimeObject}
            ></UseObjectAsPlayer>
            <FloorFlat
              key={activeGLBRawObject.uuid + 'floorflat'}
              name={activeGLBRawObject.uuid}
            ></FloorFlat>
          </>
        )}

        */}

        <EnvOutlet></EnvOutlet>
      </Canvas>
      <ENTopBarr></ENTopBarr>
    </div>
  )
}

// function CamTrack({ activeSceneSelection }) {
//   let orbit = useGLBEditor((s) => s.orbit)
//   let camera = useThree((s) => s.camera)
//   useEffect(() => {
//     if (activeSceneSelection && orbit) {
//       activeSceneSelection.getWorldPosition(orbit.target)
//       if (orbit.target.length() === 0) {
//         orbit.target.y = 1.5
//       }
//       camera.position.x = orbit.target.x
//       camera.position.y = orbit.target.y
//       camera.position.z = orbit.target.z + 1
//       orbit.update()
//     }
//   }, [orbit, activeSceneSelection, camera.position])
//   return null
// }

//
//
//
//
//
//
//
