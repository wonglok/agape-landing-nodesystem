import { useMultiverse } from '@/helpers/useMultiverse'
import { useFrame, useThree } from '@react-three/fiber'
import { useController, useXR } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { OrbitControls } from 'three-stdlib'

export function XRUserControls() {
  let setCamera = useMultiverse((s) => s.setCamera)
  let setControls = useMultiverse((s) => s.setControls)
  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let [or, setOR] = useState(false)

  useEffect(() => {
    //
    let cleans = []
    let orbit = new OrbitControls(camera, gl.domElement)
    setCamera(camera)
    setControls(orbit)
    setOR(orbit)

    orbit.object.position.set(0, 10, 0)
    orbit.target.set(0, 0, -10)

    cleans.push(() => {
      orbit.enabled = false
      orbit.dispose()
    })
    return () => {
      cleans.forEach((s) => s())
    }
  }, [camera, gl, setCamera, setControls])
  let player = useXR((s) => s.player)
  let isPresenting = useXR((s) => s.isPresenting)
  useFrame(() => {
    if (player && or && isPresenting) {
      or.object.position.lerp(player.position, 0.1)
      or.object.position.y += 1
    }

    if (or) {
      or.update()
    }
  })

  return null
}
