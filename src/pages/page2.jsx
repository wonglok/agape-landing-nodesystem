import { Box } from '@react-three/drei'

const Page = (props) => {
  return (
    <>
      <Box
        args={[3, 3, 3]}
        onClick={() => {
          props.router.push('/')
        }}
      ></Box>
      {/*  */}
    </>
  )
}
Page.useCanvasLayout = true
async function getStaticProps() {
  return {
    props: {
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page
