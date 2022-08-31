import { Box, Environment, PerspectiveCamera, Text } from '@react-three/drei'
import Router from 'next/router'
import { Suspense, useEffect } from 'react'
import { Floor } from '@/helpers/Floor'
import { Companion } from '@/helpers/Companion'
import { useMultiverse } from '@/helpers/useMultiverse'
import anime from 'animejs'
import { screenOpacity } from '@/helpers/GLOverlayEffect'
import { LineStuff } from '@/helpers/LineDrop/LineStuff'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
// import dynamic from 'next/dynamic'

const Page = (props) => {
  return (
    <>
      <Floor url='/scene/landing/os-effect1.glb'></Floor>

      <Box
        position={[3, 1, 1]}
        onClick={() => {
          //
          screenOpacity.value = 1
          anime({
            targets: [screenOpacity],
            value: 0,
            update: () => {},
            complete: () => {
              Router.router.push('/page2')
            },
          })
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Box>

      {/*  */}
      <Suspense fallback={null}>
        <Companion
          frustumCulled={true}
          runActionName='walk_forward'
          url={`/scene/landing/alien-avatar.glb`}
          speed={4}
          lookAtOffset={[0, 0, -2]}
          walkOffset={[0, 0, -0.1]}
        >
          {/* <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ffff00'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group> */}
        </Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='sprint_forward'
          speed={3}
          lookAtOffset={[-1.5, 0, -2]}
          walkOffset={[-1.5, 0, -2]}
        >
          {/* <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ff00ff'></pointLight>
          </group> */}
        </Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='sprint_forward'
          speed={3}
          lookAtOffset={[1.5, 0, -2]}
          walkOffset={[1.5, 0, -2]}
        >
          {/* <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ff00ff'></pointLight>
          </group> */}
        </Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='run_forward'
          speed={1.5}
          lookAtOffset={[-1.5, 0, 1]}
          walkOffset={[-1.5, 0, 1]}
        >
          {/* <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ff00ff'></pointLight>
          </group> */}
        </Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='run_forward'
          speed={1.5}
          lookAtOffset={[1.5, 0, 1]}
          walkOffset={[1.5, 0, 1]}
        >
          {/* <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ff00ff'></pointLight>
          </group> */}
        </Companion>
      </Suspense>

      <Suspense fallback={null}>
        <Companion
          runActionName='run_forward'
          speed={1.5}
          lookAtOffset={[0.0, 0, 3]}
          walkOffset={[0.0, 0, 3]}
        >
          {/* <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ff00ff'></pointLight>
          </group> */}
        </Companion>
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
