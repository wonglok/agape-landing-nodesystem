import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { Player } from '@/helpers/Player'
import { Box, Text, useGLTF, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import {
  Controllers,
  Hands,
  Interactive,
  useController,
  useXR,
  VRButton,
  XR,
} from '@react-three/xr'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  CircleGeometry,
  Color,
  EquirectangularReflectionMapping,
  RepeatWrapping,
  sRGBEncoding,
  Vector3,
} from 'three'
import { XRUserControls } from './XRUserControls'
// import { RGBE } from './RGBE'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Floor } from '@/helpers/Floor'
import { Water } from 'three-stdlib'
import { Object3D, TextureLoader } from 'three140'

export function XRHealBuddies() {
  let gameFloor = `/scene/journey/NYC_Expo_30.glb`
  gameFloor = `/scene/querlo/querlo-agape.glb`
  gameFloor = `/scene/health-buddies/medical002.glb`
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
            <group
              onClick={(v) => {
                console.log(v.object)
                // if (v.object.n)
              }}
            >
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
                <Floor
                  glbFnc={({ glb }) => {
                    return (
                      <group>
                        <HealthBuddiesWater
                          mapScene={glb.scene}
                        ></HealthBuddiesWater>
                        <Cell></Cell>
                      </group>
                    )
                  }}
                  url={gameFloor}
                ></Floor>
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

function HealthBuddiesWater({ mapScene }) {
  let { o3d } = useMemo(() => {
    let o3d = new Object3D()
    let waterGeometry = new CircleGeometry(200, 32)

    let ori = mapScene.getObjectByName('water')
    ori.position.y -= 100000
    ori.visible = false
    // waterObj.material.color = new Color("#ff0000");

    let water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new TextureLoader().load(
        'texture/waternormals.jpg',
        function (texture) {
          texture.wrapS = texture.wrapT = RepeatWrapping
        }
      ),
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x00ffff,
      distortionScale: 15.7,
      fog: false,
    })

    setInterval(() => {
      water.material.uniforms.time.value = window.performance.now() / 1000 / 10
    })
    // waterObj.add(water.parent);
    // waterObj.position.copy(water.position);
    // waterObj.rotation.copy(water.rotation);
    // waterObj.scale.copy(water.scale);
    // water.removeFromParent();

    water.position.y = -0.6
    water.rotation.x = -Math.PI / 2
    water.frustumCulled = false
    mapScene.add(water)

    ////!SECTION

    mapScene.traverse((it) => {
      //
      it.frustumCulled = false

      if (it.name === 'ball') {
        it.visible = false
      }

      if (it.name === 'floor012') {
        it.visible = false
      }
    })

    //

    mapScene.removeFromParent()
    o3d.add(mapScene)
    return { o3d }
  }, [mapScene])

  return <primitive object={o3d}></primitive>
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
    <>{/* <directionalLight position={[0, 10, 10]}></directionalLight> */}</>
  )
}

function Walker({ children }) {
  let [ctrler, setCtrler] = useState(false)
  let player = useXR((s) => s.player)
  let session = useXR((s) => s.session)
  let pt = useMemo(() => {
    return new Vector3(0, 5, 0)
  }, [])

  let isDown = useRef(false)

  let temp = new Vector3()

  useFrame(({ camera }, dt) => {
    if (session) {
      player.position.lerp(pt, 0.1)
    } else {
    }

    if (isDown.current) {
      temp.set(0, 0, -1)

      //
      if (ctrler === lefctController) {
        temp.set(0, 0, 1)
      }
      if (ctrler === rightController) {
        temp.set(0, 0, -1)
      }

      //
      temp.applyQuaternion(camera.quaternion)

      pt.addScaledVector(temp, 10 * dt)
    }
  })

  // const leftController = useController('left')
  // console.log(leftController)

  const rightController = useController('right')
  const lefctController = useController('left')

  return (
    <group>
      <Interactive
        onSelectStart={(event) => {
          setCtrler(event.target)
          isDown.current = true
        }}
        onSelectEnd={(event) => {
          setCtrler(event.target)
          isDown.current = false
        }}
        onSelect={(event) => {
          //
          let target = event.intersection
          if (target) {
            // setCtrler(event.target)
            // pt.copy(target.point)
          }
        }}
      >
        {children}
      </Interactive>
    </group>
  )
}

//XRHealBuddies

function Cell() {
  let glb = useGLTF(`/scene/health-buddies/cell-v1.glb`)

  glb.scene.traverse((it) => {
    if (it.name === 'NucleousFilling_low_cell_FILLING_0') {
      it.material.roughness = 0.5
      // it.material = new MeshPhysicalMaterial({
      //   color: it.material.color,
      //   roughnessMap: it.material.roughnessMap,
      //   metalnessMap: it.material.metalnessMap,
      //   map: it.material.map,
      //   transparent: true,
      //   transmission: 1,
      //   thickness: 2,
      // });
    }
  })
  return (
    <group
      position={new Vector3()
        .copy({
          x: -8.944270133972168,
          y: 1.9716475009918213 - 0.3,
          z: -2.7631890773773193,
        })
        .toArray()}
      rotation={[0, Math.PI * 0.5, 0.0]}
    >
      <pointLight position={[0, 1, 1]}></pointLight>
      <primitive
        rotation={[Math.PI * 0.15, 0, 0.0]}
        scale={0.4}
        object={glb.scene}
      ></primitive>
    </group>
  )
}
