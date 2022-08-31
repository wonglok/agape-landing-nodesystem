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
  }, [glb.cameras, useScrollStore.subscribe])

  let lastCam = false
  let lastTime = 0
  let names = {}

  let schedule = {
    Camera013_Orientation: 20.00234154719934,
    Camera003_Orientation: 2.983478243416083,
    Camera_Orientation: 4.169748749595136,
    Camera006_Orientation: 9.723748170225846,
    Camera001_Orientation: 16.358542590352094,
    Camera004_Orientation: 23.157913127575213,
    Camera009_Orientation: 24.46997318724838,
    Camera010_Orientation: 28.19060252266285,
    Camera012_Orientation: 32.20940756626385,
    Camera005_Orientation: 36.707416925716934,
    Camera008_Orientation: 41.34326200740272,
    Camera011_Orientation: 7.8282304198105255,
    Camera002_Orientation: 0,
  }
  let order = [
    'Camera002_Orientation',
    'Camera003_Orientation',
    'Camera_Orientation',
    'Camera011_Orientation',
    'Camera006_Orientation',
    'Camera001_Orientation',
    'Camera013_Orientation',
    'Camera004_Orientation',
    'Camera009_Orientation',
    'Camera010_Orientation',
    'Camera012_Orientation',
    'Camera005_Orientation',
    'Camera008_Orientation',
  ]

  let orderTime = order.map((e, i) => {
    let nextname = order[i + 1]
    return {
      name: e,
      start: schedule[e],
      end: schedule[nextname] || e,
    }
  })

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

    let getRun = (cam) => {
      let info = orderTime.find((e) => e.name === cam.name)

      let now = myTime.current

      if (info) {
        if (now >= info.start && now <= info.end) {
          return true
        }
      }
    }
    for (let cam of sorted) {
      cam.played = cam.played || 0
      if (!cam.userData.nowPos) {
        return
      }
      if (!cam.userData.oldPos) {
        return
      }

      cam.getWorldPosition(cam.userData.nowPos)

      let diff = cam.userData.nowPos.sub(cam.userData.oldPos).length()

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

        if (getRun(cam)) {
          cam.getWorldPosition(camera.position)
          cam.getWorldQuaternion(camera.quaternion)

          //
          camera.fov = cam.fov * 0.0 + 40 + adder
          camera.near = cam.near
          camera.far = cam.far
          camera.updateProjectionMatrix()
        }
      }
    }
  })

  return <primitive object={glb.scene}></primitive>
}

/*



*/
