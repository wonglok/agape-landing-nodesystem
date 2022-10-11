import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { Player } from '@/helpers/Player'
import { Box, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import {
  Controllers,
  Hands,
  Interactive,
  useXR,
  VRButton,
  XR,
} from '@react-three/xr'
import { Suspense, useEffect, useMemo } from 'react'
import {
  Color,
  EquirectangularReflectionMapping,
  sRGBEncoding,
  Vector3,
} from 'three'
import { XRUserControls } from './XRUserControls'
// import { RGBE } from './RGBE'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Floor } from '@/helpers/Floor'

export function XRGame() {
  let gameFloor = `/scene/journey/NYC_Expo_30.glb`
  gameFloor = `/scene/querlo/querlo-agape.glb`
  let rgbeURL = `/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`
  let bgPng = `/scene/querlo/ma-galaxy.jpeg`
  //
  return (
    <>
      <Canvas
        onCreated={(st) => {
          st.scene.background = new Color('#000000')
          st.camera.far = 3500
          st.camera.near = 1
          st.camera.updateProjectionMatrix()
        }}
      >
        <XR foveation={1}>
          {/*  */}
          <Suspense fallback={null}>
            <group>
              {/* <Box args={[2500, 2500, 2500]}>
                <meshStandardMaterial side={DoubleSide}></meshStandardMaterial>
              </Box> */}
              <ConnectKeyboard></ConnectKeyboard>
              {/* <RGBE rgbeURL={rgbeURL}></RGBE> */}
              <BG url={bgPng}></BG>
              <ConnectKeyboard></ConnectKeyboard>
              <ConnectSimulation></ConnectSimulation>
              <XRUserControls></XRUserControls>

              <Walker>
                <Floor url={gameFloor}></Floor>
              </Walker>
              <Player visible={false}></Player>
            </group>
          </Suspense>
          <Controllers
            hideRaysOnBlur={false}
            rayMaterial={{ color: 'white' }}
          />

          {/*  */}
        </XR>
      </Canvas>

      <VRButton enterOnly />
    </>
  )
}

function BG({ url }) {
  let tex = useTexture(url)
  tex.encoding = sRGBEncoding
  tex.mapping = EquirectangularReflectionMapping

  let scene = useThree((s) => s.scene)
  useEffect(() => {
    scene.environment = tex
    scene.background = tex
  }, [scene, tex])
  return (
    <>
      <directionalLight position={[0, 10, 10]}></directionalLight>
    </>
  )
}

function Walker({ children }) {
  let player = useXR((s) => s.player)
  let pt = useMemo(() => {
    return new Vector3(0, 5, 0)
  }, [])

  useFrame(() => {
    player.position.lerp(pt, 0.1)
  })
  return (
    <group>
      <Interactive
        onSelect={(event) => {
          //
          let target = event.intersection
          if (target) {
            pt.copy(target.point)
          }
        }}
      >
        {children}
      </Interactive>
    </group>
  )
}
