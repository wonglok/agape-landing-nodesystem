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
  DoubleSide,
  EquirectangularReflectionMapping,
  Mesh,
  RepeatWrapping,
  sRGBEncoding,
  Vector3,
} from 'three'
import { XRUserControls } from './XRUserControls'
// import { RGBE } from './RGBE'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Floor } from '@/helpers/Floor'
import { Water } from 'three-stdlib'
import {
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  TextureLoader,
} from 'three140'

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
                console.log(v.object?.name)
              }}
            >
              {/* water */}
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
                <Floor visible={false} url={gameFloor}></Floor>
              </Walker>
              <Player visible={true}></Player>
            </group>
          </Suspense>
          <Controllers
            hideRaysOnBlur={false}
            rayMaterial={{ color: 'white' }}
          />

          <Suspense fallback={null}>
            <Cell></Cell>
            {/* <directionalLight
              intensity={0.1}
              position={[-11, 1, -10]}
            ></directionalLight> */}
            <HealthBuddiesWater></HealthBuddiesWater>
          </Suspense>

          <EffectComposer>
            <Bloom
              mipmapBlur
              intensity={0.051}
              luminanceThreshold={0.2}
            ></Bloom>
          </EffectComposer>

          {/*  */}
        </XR>
      </Canvas>

      <VRButton enterOnly />
    </>
  )
}

function HealthBuddiesWater({}) {
  let glb = useGLTF(`/scene/health-buddies/medical002.glb`)
  let mapScene = glb.scene
  let { o3d, output } = useMemo(() => {
    let o3d = new Object3D()

    // mapScene.userData.done = false
    // if (mapScene.userData.done === true) {
    //   return
    // }
    // mapScene.userData.done = true

    // let boxGlass = mapScene.getObjectByName('boxGlass')
    // if (boxGlass) {
    //   boxGlass.visible = false
    // }

    // let Plane096_2 = mapScene.getObjectByName('Plane096_2')
    // if (Plane096_2) {
    //   Plane096_2.visible = false
    // }
    let Plane102 = mapScene.getObjectByName('Plane102')
    if (Plane102) {
      Plane102.visible = true
    }

    let water = mapScene.getObjectByName('water')
    if (water) {
      water.visible = false
    }

    let floorGlass = mapScene.getObjectByName('floorGlass')
    if (floorGlass) {
      floorGlass.visible = true
      floorGlass.material = new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
      })
      floorGlass.geometry.computeBoundingSphere()
      let center = floorGlass.geometry.boundingSphere.center.clone()
      floorGlass.geometry.center()
      floorGlass.geometry.translate(center.x, center.y, center.z)
    }

    // floorGlass.position.y = 0
    // floorGlass.material.opacity = 0.5
    // floorGlass.material.transparent = true

    // let floorGlass2 = new Mesh(
    //   floorGlass.geometry,
    //   new MeshPhysicalMaterial({
    //     // opacity: 0.5,
    //     // transparent: true,
    //     transmission: 1,
    //     ior: 1.5,
    //     thickness: 1,
    //     reflectivity: 0.1,
    //     metalness: 0.0,
    //     roughness: 0.0,
    //   })
    // )
    // floorGlass2.position.copy(floorGlass.position)
    // o3d.add(floorGlass2)

    // let ori = mapScene.getObjectByName('floorGlass')
    // ori.material = new MeshPhysicalMaterial({
    //   roughness: 0,
    //   opacity: 0.3,
    //   color: new Color('#ffffff'),
    //   transparent: true,
    //   // transmission: 1,
    //   // thickness: 2,
    //   // metalness: 0,
    //   // ior: 1.5,
    //   // reflectivity: 0,
    // })
    // waterObj.material.color = new Color("#ff0000");

    let waterGeometry = new CircleGeometry(200, 32)
    waterGeometry.rotateX(-Math.PI / 2)
    let waterSurfaceFake = new Mesh(
      waterGeometry,
      new MeshPhysicalMaterial({
        transparent: true,
        color: new Color('#837B2F'),
        roughness: 0.0,
        metalness: 1,
        side: DoubleSide,
        normalMap: new TextureLoader().load(
          'texture/waternormals.jpg',
          function (texture) {
            texture.repeat.set(50, 50)
            setInterval(() => {
              texture.offset.x += 0.00001
              texture.offset.y += 0.00001
            })
            texture.wrapS = texture.wrapT = RepeatWrapping
          }
        ),
      })
    )
    waterSurfaceFake.frustumCulled = false
    waterSurfaceFake.position.y = -0.8
    // waterSurfaceFake.rotation.x = Math.PI / 2
    o3d.add(waterSurfaceFake)
    o3d.frustumCulled = false

    // let waterSurface = new Water(waterGeometry, {
    //   textureWidth: 512,
    //   textureHeight: 512,
    //   waterNormals: new TextureLoader().load(
    //     'texture/waternormals.jpg',
    //     function (texture) {
    //       texture.wrapS = texture.wrapT = RepeatWrapping
    //     }
    //   ),
    //   sunDirection: new Vector3(),
    //   sunColor: 0xffffff,
    //   waterColor: 0x00ffff,
    //   distortionScale: 15.7,
    //   fog: false,
    // })

    // setInterval(() => {
    //   waterSurface.position.y = -0.5
    //   waterSurface.rotation.x = -Math.PI / 2
    //   waterSurface.frustumCulled = false

    //   waterSurface.material.uniforms.time.value =
    //     window.performance.now() / 1000 / 10
    // })
    // // waterSurfaceObj.add(waterSurface.parent);
    // // waterSurfaceObj.position.copy(waterSurface.position);
    // // waterSurfaceObj.rotation.copy(waterSurface.rotation);
    // // waterSurfaceObj.scale.copy(waterSurface.scale);
    // // waterSurface.removeFromParent();

    // o3d.add(waterSurface)

    ////!SECTION

    // mapScene.traverse((it) => {
    //   //
    //   it.frustumCulled = false

    //   if (it.name === 'ball') {
    //     it.visible = false
    //   }

    //   if (it.name === 'floor012') {
    //     it.visible = false
    //   }
    // })

    // //

    o3d.add(mapScene)

    o3d.traverse((it) => {
      it.frustumCulled = false
    })
    return {
      o3d,
      output: (
        <primitive
          // onClick={(ev) => {
          //   console.log(ev.object?.name)
          // }}
          object={o3d}
        ></primitive>
      ),
    }
  }, [mapScene])

  return output
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
    return new Vector3(0, 1.3, 0)
  }, [])

  let isDown = useRef(false)

  let temp = new Vector3()

  useFrame(({ camera }, dt) => {
    camera.near = 0.1
    camera.far = 100
    camera.updateProjectionMatrix()

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
