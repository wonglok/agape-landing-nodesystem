import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  Environment,
  OrbitControls,
  CubeCamera,
} from '@react-three/drei'
import { useControls } from 'leva'
import { RefractionMaterial } from './RefractionMaterial'
import { useTweaks } from 'use-tweaks'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

export function Diamond() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <YoDiamond position={[0, 0, 0]} />

          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <Environment preset='dawn' background></Environment>

          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={2}
              intensity={1}
              levels={9}
              mipmapBlur={true}
            />
          </EffectComposer>
        </Suspense>
        <OrbitControls object-position={[0, 3.5, 3.5]}></OrbitControls>
      </Canvas>
    </>
  )
}

//

function YoDiamond(props) {
  const ref = useRef()
  const { nodes } = useGLTF('/scene/diamond/sqdiamond.glb')
  const config = useTweaks({
    bounces: { value: 3, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.4, min: 0, max: 10 },
    fresnel: { value: 0, min: 0, max: 1 },
    color: 'white',
    autoRotate: true,
    fastChroma: true,
  })
  useFrame((_, delta) => {
    if (config.autoRotate) {
      ref.current.rotation.y += delta * 0.25
    }
  })
  return (
    <CubeCamera resolution={128} frames={1}>
      {(texture) => (
        <mesh ref={ref} geometry={nodes.Cube.geometry} {...props}>
          <RefractionMaterial envMap={texture} {...config} toneMapped={false} />
        </mesh>
      )}
    </CubeCamera>
  )
}
