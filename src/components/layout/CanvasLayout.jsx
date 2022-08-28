import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei' //OrbitControls,
// import useStore from '@/helpers/store'
// import { useEffect, useRef } from 'react'
import { sRGBEncoding } from 'three'
import { Suspense } from 'react'

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

const CanvasLayout = ({ children }) => {
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
      <Suspense fallback={null}>
        <Preload all />
        {children}
      </Suspense>
    </Canvas>
  )
}

export default CanvasLayout
