import { useSystemStore } from '@/helpers/useSystemStore'
import { Box, Environment, PerspectiveCamera, Text } from '@react-three/drei'
import Router from 'next/router'
import { Suspense, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Floor } from '@/helpers/Floor'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Effects } from '@/helpers/Effects'
import { Player } from '@/helpers/Player'
import { Companion } from '@/helpers/Companion'
// import dynamic from 'next/dynamic'

const Page = (props) => {
  // let changePage = useSystemStore((s) => s.changePage)

  return (
    <>
      {/*  */}

      <Floor url='/scene/landing/os-effect1.glb'></Floor>
      {/* <Box
        position-x={-1}
        onClick={() => {
          Router.router.push('/page2')
        }}
      >

        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Box> */}
      <Suspense fallback={null}>
        <Companion
          runActionName='sprint_forward'
          speed={4}
          lookAtOffset={[0, 0, -2]}
          walkOffset={[0, 0, -0.1]}
        ></Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='sprint_forward'
          speed={3}
          lookAtOffset={[-2, 0, -2]}
          walkOffset={[-2, 0, -2]}
        ></Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='sprint_forward'
          speed={3}
          lookAtOffset={[2, 0, -2]}
          walkOffset={[2, 0, -2]}
        ></Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='run_forward'
          speed={2}
          lookAtOffset={[-1.5, 0, 1]}
          walkOffset={[-1.5, 0, 1]}
        ></Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='run_forward'
          speed={2}
          lookAtOffset={[1.5, 0, 1]}
          walkOffset={[1.5, 0, 1]}
        ></Companion>
      </Suspense>

      <Environment background={true} preset='night'></Environment>

      {/*  */}

      {/*  */}
      {/*  */}
    </>
  )
}

Page.layout = 'Multiverse'

async function getStaticProps() {
  return {
    props: {
      sceneName: 'index',
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page

//
