import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { PostProcCallers } from '@/effectnode/component/PostProcCallers'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { UIContent } from '@/helpers/UIContent'
import { useMultiverse } from '@/helpers/useMultiverse'
import { Environment, useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import anime from 'animejs'
import { useEffect, useState } from 'react'
import { EquirectangularReflectionMapping } from 'three'
import { PointerLockControls } from 'three-stdlib'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export function GameFloor({
  enablePostProcessing = true,
  rgbeURL,
  glbURL = `/scene/newyork/NYC_Expo_30.glb`,
}) {
  let glb = useGLTF(glbURL)
  let rgbe = useLoader(RGBELoader, rgbeURL)
  rgbe.mapping = EquirectangularReflectionMapping

  let addNamedScene = useMultiverse((s) => s.addNamedScene)
  let scene = useThree((s) => s.scene)
  let gl = useThree((s) => s.gl)
  let [outletRneder, setRender] = useState(null)
  let setCamera = useMultiverse((s) => s.setCamera)
  let setControls = useMultiverse((s) => s.setControls)
  let camera = useThree((s) => s.camera)
  let controls = useMultiverse((s) => s.controls)
  let setLocked = useMultiverse((s) => s.setLocked)
  let locked = useMultiverse((s) => s.locked)
  useEffect(() => {
    setCamera(camera)

    let controls = new PointerLockControls(camera, gl.domElement)
    setControls(controls)

    controls.addEventListener('lock', function () {
      setLocked(true)
    })

    controls.addEventListener('unlock', function () {
      setLocked(false)
    })
    //
    let prom = addNamedScene({ name: glbURL, scene: glb.scene })

    // setPostProcessing(false)
    prom.then((it) => {
      // geo.scale(1, 0.01, 1)

      glb.scene.visible = false

      let applyGLB = (v) => {
        if (glb) {
          if (v === 0) {
            glb.scene.visible = false
          } else {
            glb.scene.visible = true
          }
          glb.scene.traverse((it) => {
            if (it.material) {
              it.material.transparent = true
              it.material.opacity = v
            }
          })
        }
      }

      screenOpacity.value = 0

      anime({
        targets: [screenOpacity],
        value: 1,
        duration: 7000,
        update: () => {
          applyGLB(screenOpacity.value)
        },
      })

      // glb.scene.traverse((it) => {
      //   if (it.isLight) {
      //     it.castShadow = true
      //   }
      //   it.castShadow = true
      //   it.receiveShadow = true
      // })

      setTimeout(() => {
        setRender(<primitive object={glb.scene}></primitive>)
      })

      //
    })
    return () => {}
  }, [gl, glb, scene, addNamedScene, setCamera, camera, setControls, glbURL])

  console.log(controls)
  return (
    <group>
      <UIContent>
        <>
          {locked && (
            <div className='fixed top-0 left-0 z-10 bg-white'>
              <div>isLocked</div>
            </div>
          )}

          {!locked && (
            <div className='fixed top-0 left-0 z-10 bg-white'>
              <div>
                <div>
                  <button
                    onClick={() => {
                      //
                      controls.lock()
                    }}
                  >
                    Lock
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </UIContent>
      {outletRneder}
      <EffectNodeRuntime glbObject={glb}></EffectNodeRuntime>
      <Environment map={rgbe} background></Environment>
      {enablePostProcessing && <PostProcCallers></PostProcCallers>}
    </group>
  )
}

//
//
//
