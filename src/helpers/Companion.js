import { useAnimations, useGLTF } from '@react-three/drei'
import { createPortal, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Object3D, Vector3 } from 'three'
import { AnimationMixer } from 'three'
import { useMultiverse } from './useMultiverse'
import { clone } from 'three140/examples/jsm/utils/SkeletonUtils'

export function Companion({
  lookAtOffset = [0, 0, 0],
  walkOffset = [0, 0, -5],

  speed = 1,
  frustumCulled = false,

  //
  url = `/scene/landing/soldier-512.glb`,

  //
  children,
  runActionName = 'sprint_forward',
}) {
  let player = useMultiverse((s) => s.player)
  let gltf = useGLTF(url)
  let ref = useRef()
  let [walkTarget] = useState(() => new Object3D())
  let [lookTarget] = useState(() => new Object3D())

  let root = useMemo(() => {
    if (!gltf) {
      return new Object3D()
    }
    let cloned = clone(gltf.scene)

    cloned.traverse((it) => {
      it.frustumCulled = false
      if (it.material) {
        it.material.emissiveIntensity = 100
      }
    })
    return cloned
  }, [gltf])

  useEffect(() => {
    walkTarget.position.fromArray(walkOffset)
    player.add(walkTarget)
    return () => {
      walkTarget.removeFromParent()
    }
  }, [player, walkTarget, walkOffset])

  useEffect(() => {
    lookTarget.position.x += walkOffset[0]
    lookTarget.position.y += walkOffset[1]
    lookTarget.position.z += walkOffset[2]

    //
    lookTarget.position.x += lookAtOffset[0]
    lookTarget.position.y += lookAtOffset[1]
    lookTarget.position.z += lookAtOffset[2]

    player.add(lookTarget)
    return () => {
      lookTarget.removeFromParent()
    }
  }, [player, lookTarget, lookAtOffset, walkOffset])

  //
  let [act, setAct] = useState({
    name: 'idle',
    inPlace: true,
    repetiton: Infinity,
  })

  let mixer = useMemo(() => {
    return new AnimationMixer()
  }, [])

  useFrame((st, dt) => {
    mixer.update(dt)
  })
  useEffect(() => {
    //
    let clip = gltf.animations.find((e) => e.name === act.name)

    if (clip) {
      if (act.inPlace) {
        let Hips = clip.tracks.find((e) => e.name.includes('Hips.position'))
        if (Hips) {
          for (let i = 0; i < Hips.times.length; i += 1) {
            Hips.values[i * 3 + 0] = 0
            // Hips.values[i * 3 + 1] = 0
            Hips.values[i * 3 + 2] = 0
          }
        }
      }

      let action = mixer.clipAction(clip, root)
      action.stop()
      action.reset()
      action.repetiton = Number(act.repetiton)
      action.play()
      return () => {
        action.reset().fadeOut(0.2).play()
      }
    }
  }, [act, gltf.animations, root, mixer])

  let h = new Vector3()
  let l = new Vector3()

  let diff = new Vector3()

  let lookAtQ = new Object3D()
  useFrame(({ camera }) => {
    if (ref.current) {
      // ref.current.getWorldPosition(h)
      // h.copy(player.position)
      walkTarget.getWorldPosition(h)
      lookTarget.getWorldPosition(l)

      diff.copy(h).sub(ref.current.position).multiplyScalar(0.08)
      ref.current.position.addScaledVector(diff, 0.35 * speed)

      lookAtQ.position.copy(ref.current.position)

      if (ref.current.position.distanceTo(h) >= 0.5) {
        lookAtQ.lookAt(h.x, lookAtQ.position.y, h.z)

        ref.current.quaternion.slerp(lookAtQ.quaternion, 0.05)
        if (act && act.name !== runActionName) {
          setAct({
            name: runActionName,
            inPlace: true,
            repetiton: '' + Infinity,
          })
        }
      } else {
        lookAtQ.lookAt(l.x, lookAtQ.position.y, l.z)
        ref.current.quaternion.slerp(lookAtQ.quaternion, 0.05)

        // ref.current.position.y = player.position.y
        // ref.current.lookAt(h.x, player.position.y, h.z)
        if (act && act.name !== 'idle') {
          setAct({
            name: 'idle',
            inPlace: true,
            repetiton: '' + Infinity,
          })
        }
      }

      if (frustumCulled) {
        if (ref.current.position.distanceTo(camera.position) <= 1) {
          ref.current.visible = false
        } else {
          ref.current.visible = true
        }
      }
    }
  })
  return (
    <group>
      <group ref={ref}>
        <group position={[0, -1.45, 0]}>
          <primitive object={root}></primitive>
          {children}
        </group>
      </group>
    </group>
  )
}
