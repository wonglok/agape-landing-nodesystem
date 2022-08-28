import { UIContent } from '@/helpers/UIContent'

const Page = (props) => {
  return (
    <>
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}
Page.layout = 'PromotePage'

Page.SEO = function SEO() {
  return (
    <div className='absolute top-0 left-0 z-10'>
      <div>
        <a href={'/page1'}>Page1</a>
        <a href={'/forge'}>Forge Avatar + Motion</a>
      </div>
    </div>
  )
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
