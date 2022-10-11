import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { GLSSR } from '@/helpers/GLSSR'
import { Player } from '@/helpers/Player'
import { UIContent } from '@/helpers/UIContent'
import { Environment } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GameFloor } from './GameFloor'
import { PointerUserControls } from './PointerUserControls'

export function PointerLockGame() {
  let gameFloor = `/scene/journey/NYC_Expo_30.glb`
  let rgbeURL = `/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`

  //
  return (
    <>
      <Canvas
        gl={{ logarithmicDepthBuffer: true, depth: false }}
        onCreated={(st) => {}}
      >
        <EffectComposer multisampling={2}>
          <Bloom luminanceThreshold={0.0} mipmapBlur={false}></Bloom>
        </EffectComposer>

        <Suspense fallback={null}>
          <group>
            <ConnectKeyboard></ConnectKeyboard>
            <ConnectPointerControls></ConnectPointerControls>
            <ConnectSimulationPointer></ConnectSimulationPointer>
            <Player visible={false}></Player>

            <PointerUserControls></PointerUserControls>

            <RGBE rgbeURL={rgbeURL}></RGBE>
            <GameFloor
              glbURL={gameFloor}
              enablePostProcessing={true}
            ></GameFloor>
          </group>
        </Suspense>
      </Canvas>

      <UIContent>
        <div
          style={{
            position: 'fixed',
            top: 'calc(50% - 1px / 2)',
            left: 'calc(50% - 25px / 2)',
            height: '1px',
            width: `25px`,
            backdropFilter: 'invert(1)',
            background: 'transparent',
          }}
        ></div>
        <div
          style={{
            position: 'fixed',
            top: 'calc(50% - 25px / 2)',
            left: 'calc(50% - 1px / 2)',
            width: '1px',
            height: `25px`,
            backdropFilter: 'invert(1)',
            background: 'transparent',
          }}
        ></div>
      </UIContent>
    </>
  )
}

function RGBE({ rgbeURL }) {
  let rgbe = useLoader(RGBELoader, rgbeURL)
  rgbe.mapping = EquirectangularReflectionMapping

  return <Environment map={rgbe} background={false}></Environment>
}
