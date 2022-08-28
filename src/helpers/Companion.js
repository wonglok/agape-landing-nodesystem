import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { AnimationMixer } from 'three140'
import { useMultiverse } from './useMultiverse'

export function Companion() {
  let player = useMultiverse((s) => s.player)
  let gltf = useGLTF(`/scene/landing/swat-team.glb`)
  let ref = useRef()

  let [act, setAct] = useState({
    name: 'idle',
    inPlace: true,
  })

  let mixer = useMemo(() => {
    return new AnimationMixer()
  }, [])

  useFrame((st, dt) => {
    if (ref.current) {
      ref.current.position.y = player.position.y
    }
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
          // Hips.values
        }
      }

      let action = mixer.clipAction(clip, gltf.scene)
      action.stop()
      action.reset()
      action.repetiton = Number('Infinity')
      action.play()
      return () => {
        action.reset().fadeOut(0.2).play()
      }
    }
  }, [act, gltf.animations, gltf.scene, mixer])

  //

  let h = new Vector3()
  useFrame(() => {
    if (ref.current) {
      h.copy(player.position)
      h.y = player.position.y
      if (ref.current.position.distanceTo(h) >= 2) {
        ref.current.position.lerp(h, 0.05)
        ref.current.lookAt(h.x, player.position.y, h.z)
        if (act && act.name !== 'walk_forward') {
          setAct({
            name: 'walk_forward',
            inPlace: true,
            repetiton: Number(Infinity),
          })
        }
      } else {
        ref.current.lookAt(h.x, player.position.y, h.z)
        if (act && act.name !== 'idle') {
          setAct({
            name: 'idle',
            inPlace: true,
            repetiton: Number(Infinity),
          })
        }
      }
    }
  })
  return (
    <group ref={ref}>
      <group position={[0, -1.52, 0]}>
        <primitive object={gltf.scene}></primitive>
      </group>
    </group>
  )
}
