import { PointerLockGame } from '@/components/PointerLockGame/PointerLockGame'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { BloomEffect } from 'postprocessing'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PointerLockGame></PointerLockGame>
      </Suspense>
    </Canvas>
  )
}

Page.SEO = function Page() {
  return (
    <>
      <div className=' absolute top-0 left-0'></div>
      <Loader></Loader>
    </>
  )
}

async function getStaticProps() {
  return {
    props: {
      title: 'Game Page',
    },
  }
}

export { getStaticProps }
