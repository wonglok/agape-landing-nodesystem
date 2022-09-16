import { ClothSim } from '@/components/ClothSimGroup/ClothSim/ClothSim'
import { Environment } from '@react-three/drei'

const Page = () => {
  return (
    <>
      <ClothSim></ClothSim>
      <Environment preset='apartment' background></Environment>
    </>
  )
}

Page.layout = 'PromotePage'

Page.SEO = function SEO() {
  return <span className=''>{/* <Loader></Loader> */}</span>
}

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

//
