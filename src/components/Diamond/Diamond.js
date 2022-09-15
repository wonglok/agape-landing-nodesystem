import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  Environment,
  OrbitControls,
  CubeCamera,
  Sphere,
} from '@react-three/drei'
import { RefractionMaterial } from './RefractionMaterial'
import { useTweaks } from 'use-tweaks'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { IcosahedronBufferGeometry } from 'three140'

export function Diamond() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <group position={[-1.5, 0, 0]} rotation={[Math.PI * -0.35, 0, 0]}>
            <Load
              axis={'z'}
              url={`/scene/diamond/sq2diamond.glb`}
              query={(glb) => {
                return glb.scene.getObjectByName('D2').geometry
              }}
            />
          </group>

          <group position={[1.5, 0, 0]} rotation={[Math.PI * 0.0, 0, 0]}>
            <Load
              axis={'y'}
              url={`/scene/diamond/shard.glb`}
              query={(glb) => {
                return glb.scene.getObjectByName('Cube').geometry
              }}
              position={[0, 0, 0]}
            />
          </group>

          <Sphere position={[5, 0, 0]}>
            <meshStandardMaterial color={'green'}></meshStandardMaterial>
          </Sphere>

          <Sphere position={[-5, 0, 0]}>
            <meshStandardMaterial color={'blue'}></meshStandardMaterial>
          </Sphere>

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
        <OrbitControls object-position={[0, 0, 5.5]}></OrbitControls>
      </Canvas>
    </>
  )
}

//

function Load({
  url = '/scene/diamond/sq2diamond.glb',
  query = () => {
    return new IcosahedronBufferGeometry(1, 0)
  },
  axis = 'x',
}) {
  const sq2 = useGLTF(url)
  let geo = query(sq2)
  const ref = useRef()
  const config = useTweaks('Yo', {
    bounces: { value: 4, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.4, min: 0, max: 10 },
    fresnel: { value: 0, min: 0, max: 1 },
    color: { value: '#bababa' },
    autoRotate: true,
    fastChroma: true,
  })
  useFrame((_, delta) => {
    if (config.autoRotate) {
      ref.current.rotation[axis] += delta * 0.25
    }
  })

  //
  return (
    <CubeCamera resolution={128} frames={1}>
      {(texture) => (
        <mesh ref={ref} geometry={geo}>
          <RefractionMaterial
            key={texture.uuid}
            envMap={texture}
            {...config}
            toneMapped={false}
          />
        </mesh>
      )}
    </CubeCamera>
  )
}
