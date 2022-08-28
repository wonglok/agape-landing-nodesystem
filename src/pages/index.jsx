import { Box, Environment } from '@react-three/drei'

const Page = (props) => {
  return (
    <>
      <Box
        position-x={-1}
        onClick={() => {
          props.router.push('/page2')
        }}
      >
        <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      </Box>

      <Environment preset='night'></Environment>

      <Box position={[0, -1, 0]}></Box>
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}

Page.useCanvasLayout = true
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
