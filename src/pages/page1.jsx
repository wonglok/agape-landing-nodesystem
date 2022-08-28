import { useSystemStore } from '@/helpers/useSystemStore'
import { Box, Environment, PerspectiveCamera, Text } from '@react-three/drei'
import Router from 'next/router'
import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Floor } from '@/helpers/Floor'
import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectCameraControls } from '@/helpers/ConnectCameraControls'
import { ConnectSimulation } from '@/helpers/ConnectSimulation'
import { Effects } from '@/helpers/Effects'
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
