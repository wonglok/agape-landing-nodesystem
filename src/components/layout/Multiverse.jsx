import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
// import { Float, Preload, useFBO } from '@react-three/drei' //OrbitControls,
// import useStore from '@/helpers/store'
// import { useEffect, useRef } from 'react'
import { Color, sRGBEncoding } from 'three'
import { Suspense } from 'react'
// import { useSystemStore } from '@/helpers/useSystemStore'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { useEffect } from 'react'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Effects } from '@/helpers/Effects'
import { Player } from '@/helpers/Player'
// import { Companion } from '@/helpers/Companion'

const Multiverse = ({ router, children }) => {
  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      gl={{ antialias: false, logarithmicDepthBuffer: true }}
      onCreated={(st) => {
        st.scene.background = new Color('#ffffff')
        st.gl.physicallyCorrectLights = true
        st.gl.outputEncoding = sRGBEncoding
      }}
    >
      <MapContent>{children}</MapContent>
      <ConnectKeyboard></ConnectKeyboard>
      <ConnectCameraControls></ConnectCameraControls>
      <ConnectSimulation></ConnectSimulation>
      <Effects></Effects>
      <Player></Player>

      {/* <OverlayContentAdapter></OverlayContentAdapter> */}
    </Canvas>
  )
}

function TempScene() {
  let camera = useThree((s) => s.camera)
  useEffect(() => {
    camera.position.x = 5
    camera.position.y = 5
    camera.position.z = 15
    camera.lookAt(0, 0, 0)
  })
  return <gridHelper args={[100, 100, 0xff0000, 0x0000ff]}></gridHelper>
}

function MapContent({ children }) {
  return <Suspense fallback={<TempScene></TempScene>}>{children}</Suspense>
}

// function OverlayContentAdapter() {
//   let overlayReactContent = useSystemStore((s) => s.overlayReactContent)
//   return (
//     <>
//       {overlayReactContent && (
//         <OverlayContent>{overlayReactContent}</OverlayContent>
//       )}
//     </>
//   )
// }
// function OverlayContent({ children }) {
//   let size = useThree((e) => e.size)
//   let fbo = useFBO(size.width, size.height)

//   let auxScene = useMemo(() => {
//     return new Scene()
//   }, [])

//   useFrame(({ camera, gl }) => {
//     if (auxScene && auxScene?.children.length > 0 && camera) {
//       // //
//       gl.setRenderTarget(fbo)
//       gl.setClearColor(0xffffff, 0)
//       gl.setClearAlpha(0)
//       gl.clear()
//       gl.render(auxScene, camera)
//       gl.setRenderTarget(null)
//       gl.setClearAlpha(0)
//     }
//   })

//   return (
//     <group>
//       {createPortal(children, auxScene)}

//       <Screen fbo={fbo}></Screen>
//     </group>
//   )
//   //
// }

// function Screen({ fbo }) {
//   let camera = useThree((e) => e.camera)
//   let viewport = useThree((e) => e.viewport)
//   let size = useThree((e) => e.size)
//   let vp = viewport.getCurrentViewport(
//     camera,
//     camera.position.clone().add(new Vector3(0, 0, -1)),
//     size
//   )

//   return (
//     <>
//       {createPortal(
//         <mesh frustumCulled={false} position={[0, 0, -1]} scale={1}>
//           <planeBufferGeometry
//             args={[vp.width, vp.height]}
//           ></planeBufferGeometry>
//           <meshPhysicalMaterial
//             transparent={true}
//             map={fbo.texture}
//             side={DoubleSide}
//             color='#ffffff'
//             blending={NormalBlending}
//           ></meshPhysicalMaterial>
//         </mesh>,
//         camera
//       )}
//       <primitive object={camera}></primitive>
//     </>
//   )
// }

export { Multiverse }
