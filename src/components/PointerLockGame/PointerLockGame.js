import { EffectNodeRuntime } from '@/effectnode/component/EffectNodeRuntime'
import { PostProcCallers } from '@/effectnode/component/PostProcCallers'
import { Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three-stdlib'
import { GameFloor } from './GameFloor'

export function PointerLockGame() {
  let rgbe = useLoader(RGBELoader, `/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`)
  rgbe.mapping = EquirectangularReflectionMapping

  return (
    <group>
      <GameFloor></GameFloor>
      <Environment map={rgbe} background></Environment>
      <PostProcCallers></PostProcCallers>
      {/*  */}
    </group>
  )
}
