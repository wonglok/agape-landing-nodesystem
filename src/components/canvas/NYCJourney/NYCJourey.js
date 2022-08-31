import { useGLTF } from '@react-three/drei'
import { useScrollStore } from '@/helpers/useScrollStore'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { AnimationMixer, Vector3 } from 'three140'

export function NYCJourney() {
  let glb = useGLTF(`/scene/journey/NYC_Expo_30.glb`)

  let myTime = useRef(0)
  // let camera = useThree((s) => s.camera)

  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useEffect(() => {
    glb.animations.forEach((ui) => {
      mixer.clipAction(ui).play()
      console.log(ui.duration)
    })

    //
  }, [glb, mixer])

  useEffect(() => {
    glb.cameras.forEach((cam) => {
      cam.userData.oldPos = cam.position.clone()
      cam.userData.nowPos = cam.position.clone()
      cam.userData.diff = new Vector3()
      cam.userData.diff.copy(cam.position)
    })

    return useScrollStore.subscribe((v) => {
      let max = 45.156355645706554
      myTime.current = v.smooth * max
      if (myTime.current <= 0) {
        myTime.current = 0
      }
      if (myTime.current >= max) {
        myTime.current = max
      }

      // ref.current.rotation.y = v.smooth * Math.PI
    })
  }, [glb.cameras])

  let lastCam = false
  let lastTime = 0
  useFrame(({ camera, size }, dt) => {
    //

    mixer.setTime(myTime.current)

    let sorted = glb.cameras

    // .slice().sort((a, b) => {
    //   if (a.played > b.played) {
    //     return -1
    //   } else if (a.played < b.played) {
    //     return 1
    //   } else {
    //     return 0
    //   }
    // })

    // if (myTime.current - lastTime <= 0) {
    //   glb.cameras.forEach((e) => {
    //     //
    //     e.played = 0
    //   })
    // }

    for (let cam of sorted) {
      cam.played = cam.played || 0
      if (!cam.userData.nowPos) {
        return
      }
      if (!cam.userData.oldPos) {
        return
      }

      //

      let diff = cam
        .getWorldPosition(cam.userData.nowPos)
        .sub(cam.userData.oldPos)
        .length()

      cam.getWorldPosition(cam.userData.oldPos)

      let adder = 0
      if (size.width < size.height) {
        adder += 15
      }

      if (diff > 0.0001) {
        if (lastCam === false) {
          lastCam = cam
          cam.played++
        }
        if (lastCam !== cam) {
          lastCam = cam
          cam.played++
        }

        cam.getWorldPosition(camera.position)
        cam.getWorldQuaternion(camera.quaternion)
        camera.fov = cam.fov * 0.0 + 40 + adder
        camera.near = cam.near
        camera.far = cam.far
        camera.updateProjectionMatrix()
      }
    }
  })

  return <primitive object={glb.scene}></primitive>
}
