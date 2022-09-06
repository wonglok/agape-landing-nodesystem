import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import {
  DoubleSide,
  EquirectangularReflectionMapping,
  sRGBEncoding,
} from 'three'

export function PreviewHDR({ handle }) {
  let [url, setURL] = useState()

  useEffect(() => {
    //
    setURL(false)
    setTimeout(() => {
      handle.getFile().then((f) => {
        setURL(URL.createObjectURL(f))
      })
    })
  }, [handle])

  return (
    <Canvas
      onCreated={(st) => {
        //
        st.gl.physicallyCorrectLights = true
        st.gl.outputEncoding = sRGBEncoding
      }}
      style={{ width: '250px' }}
      key={'yopreview'}
    >
      {url && (
        <Suspense fallback={<Text>Loading...</Text>}>
          <Content url={url}></Content>
        </Suspense>
      )}
      <OrbitControls
        rotateSpeed={-1}
        maxDistance={5}
        minDistance={1}
      ></OrbitControls>
    </Canvas>
  )
}

function Content({ url }) {
  let hdr = useLoader(RGBELoader, url)

  let scene = useThree((s) => s.scene)
  useEffect(() => {
    hdr.mapping = EquirectangularReflectionMapping
    scene.environment = hdr
    scene.background = hdr
  }, [scene, hdr])

  //
  //
  return (
    <group>
      <Sphere args={[2.5, 32, 32]}>
        <meshStandardMaterial
          side={DoubleSide}
          roughness={0}
          metalness={1}
        ></meshStandardMaterial>
      </Sphere>
    </group>
  )
}
