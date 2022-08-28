import { Box, Environment, Sphere } from '@react-three/drei'

const Page = (props) => {
  return (
    <>
      <Sphere
        position-x={1}
        onClick={() => {
          props.router.push('/')
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Sphere>

      <Environment preset='city'></Environment>

      {/*  */}
    </>
  )
}

Page.useCanvasLayout = true
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
