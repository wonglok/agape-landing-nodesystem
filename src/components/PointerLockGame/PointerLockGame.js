import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { GLSSR } from '@/helpers/GLSSR'
import { Player } from '@/helpers/Player'
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
    <Canvas fallback onCreated={(st) => {}}>
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.0} mipmapBlur></Bloom>
      </EffectComposer>

      <Suspense fallback={null}>
        <group>
          <ConnectKeyboard></ConnectKeyboard>
          <ConnectPointerControls></ConnectPointerControls>
          <ConnectSimulationPointer></ConnectSimulationPointer>
          <Player visible={false}></Player>

          <PointerUserControls></PointerUserControls>

          <RGBE rgbeURL={rgbeURL}></RGBE>
          <GameFloor glbURL={gameFloor} enablePostProcessing={true}></GameFloor>
        </group>
      </Suspense>
    </Canvas>
  )
}

function RGBE({ rgbeURL }) {
  let rgbe = useLoader(RGBELoader, rgbeURL)
  rgbe.mapping = EquirectangularReflectionMapping

  return <Environment map={rgbe} background={false}></Environment>
}
