import { Companion } from '@/helpers/Companion'
import { Floor } from '@/helpers/Floor'
import { useSystemStore } from '@/helpers/useSystemStore'
import { Box, Environment, Sphere } from '@react-three/drei'
import { Suspense } from 'react'

const Page = (props) => {
  let router = useSystemStore((s) => s.router)
  return (
    <>
      <Floor url='/scene/landing/os-effect1.glb'></Floor>

      <Sphere
        position-y={1}
        onClick={() => {
          props.router.push('/page1')
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Sphere>

      <Suspense fallback={null}>
        <Companion
          frustumCulled={true}
          runActionName='walk_forward'
          speed={4}
          lookAtOffset={[0, 0, -2]}
          walkOffset={[0, 0, -0.1]}
        >
          <group position={[-0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#ffff00'></pointLight>
          </group>
          <group position={[0.3, 1.7, 0.2]}>
            <pointLight intensity={1} decay={2} color='#00ffff'></pointLight>
          </group>
        </Companion>
      </Suspense>

      <Environment preset='park'></Environment>

      {/*  */}
    </>
  )
}
Page.layout = 'Multiverse'

async function getStaticProps() {
  return {
    props: {
      sceneName: 'page2',
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page

//
