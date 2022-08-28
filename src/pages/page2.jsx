import { useSystemStore } from '@/helpers/useSystemStore'
import { Box, Environment, Sphere } from '@react-three/drei'

const Page = (props) => {
  let router = useSystemStore((s) => s.router)
  return (
    <>
      <Sphere
        position-x={1}
        onClick={() => {
          props.router.push('/page1')
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Sphere>

      <Environment preset='city'></Environment>

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
