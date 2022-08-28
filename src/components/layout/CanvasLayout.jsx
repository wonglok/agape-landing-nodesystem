import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { Float, Preload, useFBO } from '@react-three/drei' //OrbitControls,
// import useStore from '@/helpers/store'
// import { useEffect, useRef } from 'react'
import {
  Camera,
  DoubleSide,
  NormalBlending,
  Scene,
  sRGBEncoding,
  Vector3,
} from 'three'
import { useMemo } from 'react'
import { useSystemStore } from '@/helpers/useSystemStore'

// const LControl = () => {
//   const dom = useStore((state) => state.dom)
//   const control = useRef(null)

//   useEffect(() => {
//     if (control.current) {
//       const domElement = dom.current
//       const originalTouchAction = domElement.style['touch-action']
//       domElement.style['touch-action'] = 'none'

//       return () => {
//         domElement.style['touch-action'] = originalTouchAction
//       }
//     }
//   }, [dom, control])
//   // @ts-ignore
//   return <OrbitControls ref={control} domElement={dom.current} />
// }

const CanvasLayout = ({ router, children }) => {
  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      onCreated={(st) => {
        st.gl.physicallyCorrectLights = true
        st.gl.outputEncoding = sRGBEncoding
      }}
    >
      {children}
      <OverlayContentAdapter></OverlayContentAdapter>
    </Canvas>
  )
}

function OverlayContentAdapter() {
  let overlayReactContent = useSystemStore((s) => s.overlayReactContent)
  return (
    <>
      {overlayReactContent && (
        <OverlayContent>{overlayReactContent}</OverlayContent>
      )}
    </>
  )
}
function OverlayContent({ children }) {
  let size = useThree((e) => e.size)
  let fbo = useFBO(size.width, size.height)

  let auxScene = useMemo(() => {
    return new Scene()
  }, [])

  useFrame(({ camera, gl }) => {
    if (auxScene && auxScene?.children.length > 0 && camera) {
      // //
      gl.setRenderTarget(fbo)
      gl.setClearColor(0xffffff, 0)
      gl.setClearAlpha(0)
      gl.clear()
      gl.render(auxScene, camera)
      gl.setRenderTarget(null)
      gl.setClearAlpha(0)
    }
  })

  return (
    <group>
      {createPortal(children, auxScene)}

      <Screen fbo={fbo}></Screen>
    </group>
  )
  //
}

function Screen({ fbo }) {
  let camera = useThree((e) => e.camera)
  let viewport = useThree((e) => e.viewport)
  let size = useThree((e) => e.size)
  let vp = viewport.getCurrentViewport(
    camera,
    camera.position.clone().add(new Vector3(0, 0, -0.5)),
    size
  )

  return (
    <>
      {createPortal(
        <mesh frustumCulled={false} position={[0, 0, -0.5]} scale={1}>
          <planeBufferGeometry
            args={[vp.width, vp.height]}
          ></planeBufferGeometry>
          <meshBasicMaterial
            transparent={true}
            map={fbo.texture}
            side={DoubleSide}
            color='#ffffff'
            blending={NormalBlending}
          ></meshBasicMaterial>
        </mesh>,
        camera
      )}
      <primitive object={camera}></primitive>
    </>
  )
}

export default CanvasLayout
