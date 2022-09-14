import * as mpHands from '@mediapipe/hands'
import {
  Environment,
  Html,
  OrbitControls,
  Plane,
  ScreenQuad,
  useEnvironment,
  useFBO,
} from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import * as handdetection from '@tensorflow-models/hand-pose-detection'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide, sRGBEncoding } from 'three'
import {
  Color,
  Object3D,
  OrthographicCamera,
  Scene,
  VideoTexture,
} from 'three140'
import create from 'zustand'

async function initDetector() {
  return handdetection.createDetector(
    handdetection.SupportedModels.MediaPipeHands,
    {
      runtime: 'mediapipe',
      modelType: 'full',
      maxHands: 2,
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
    }
  )
}

async function getHands({ video, detector }) {
  return await detector.estimateHands(video, {
    flipHorizontal: false,
  })
}

async function getVideo(video) {
  if (video.readyState < 2) {
    return await new Promise((resolve) => {
      video.onloadeddata = () => {
        resolve(video)
      }
    })
  }

  return video
}

export const useAICamera = create((set, get) => {
  return {
    video: false,
    vTex: false,
    detector: false,

    setAIVidSrc: ({ video, vTex, detector }) => {
      set({ video, vTex, detector })
    },

    indexFingerTip: new Object3D(),
  }
})

export function MyHands() {
  let setAIVidSrc = useAICamera((s) => s.setAIVidSrc)
  let video = useAICamera((s) => s.video)
  useEffect(() => {
    //
  }, [])
  return (
    <>
      {!video && (
        <Html center>
          <button
            onClick={() => {
              //

              navigator.mediaDevices
                .getUserMedia({
                  audio: false,
                  video: { width: 1280, height: 720, facingMode: 'user' },
                })
                .then((stream) => {
                  let vid = document.createElement('video')
                  vid.autoplay = true
                  vid.srcObject = stream
                  getVideo(vid).then(async (vid) => {
                    vid.play()
                    let tex = new VideoTexture(vid)

                    tex.encoding = sRGBEncoding

                    let detector = await initDetector(vid)
                    setAIVidSrc({
                      video: vid,
                      vTex: tex,
                      detector,
                    })
                  })
                })
            }}
            className='w-32 p-2 bg-gray-200'
          >
            Start Video
          </button>
        </Html>
      )}
      {video && (
        <>
          <MyScreen></MyScreen>
        </>
      )}
    </>
  )
}

function Hand() {
  let detector = useAICamera((s) => s.detector)
  let video = useAICamera((s) => s.video)
  let indexFingerTip = useAICamera((s) => s.indexFingerTip)
  let ref = useRef(new Object3D())
  useEffect(() => {
    let canRun = true
    let loop = (onHand) => {
      getHands({ video, detector }).then((res) => {
        if (res[0]) {
          onHand(res)
        }

        if (canRun) {
          setTimeout(() => {
            loop(onHand)
          })
        }
      })
    }
    loop((results) => {
      if (results[0]) {
        let tip = results[0].keypoints3D.find(
          (e) => e.name === 'index_finger_tip'
        )

        let tip2d = results[0].keypoints.find(
          (e) => e.name === 'index_finger_tip'
        )
        // console.log(results[0])
        if (tip) {
          indexFingerTip.position.x = video.videoWidth / -2 + tip2d.x
          indexFingerTip.position.y =
            video.videoHeight - tip2d.y - video.videoHeight / 2
        }
      }
    })

    return () => {
      canRun = false
    }
  }, [detector, indexFingerTip.position, video])

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp(indexFingerTip.position, 0.1)
    }
  })
  return (
    <group>
      {/*  */}
      {/*  */}

      {/*  */}
      {/*  */}

      <mesh ref={ref} rotation-y={Math.PI * -1} position={[0, 0, 0]}>
        <sphereBufferGeometry args={[10, 32, 32]}></sphereBufferGeometry>
        <meshBasicMaterial
          color={'#ffffff'}
          side={DoubleSide}
          roughness={0}
        ></meshBasicMaterial>
      </mesh>
    </group>
  )
}

function MyScreen({}) {
  let vTex = useAICamera((s) => s.vTex)
  let video = useAICamera((s) => s.video)
  let fbo = useFBO(video.videoWidth, video.videoHeight)

  return (
    <group>
      <Environment preset='studio'></Environment>
      <Plane args={[(5 * fbo.width) / fbo.height, 5]}>
        <meshBasicMaterial
          map={fbo.texture}
          side={DoubleSide}
        ></meshBasicMaterial>
      </Plane>

      <MyCam texture={vTex} fbo={fbo}>
        {vTex && <Hand></Hand>}
      </MyCam>
    </group>
  )
}

export function MyCam({ texture, fbo, children }) {
  let env = useEnvironment({ preset: 'studio' })

  let scene = useMemo(() => {
    return new Scene()
  }, [])
  scene.background = texture
  scene.environment = env
  let { width, height } = fbo

  let cam = useMemo(() => {
    let camera = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    )

    return camera
  }, [width, height])

  useFrame(({ gl }) => {
    //

    gl.setRenderTarget(fbo)
    gl.setClearColor(0xffffff, 0.0)
    gl.clear(true, true, true)
    gl.render(scene, cam)
    gl.setRenderTarget(null)
  })
  return <group>{createPortal(<group>{children}</group>, scene)}</group>
}
