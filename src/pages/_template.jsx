const Page = (props) => {
  return <>{/*  */}</>
}
Page.useCanvasLayout = true

export default Page

async function getStaticProps() {
  return {
    props: {
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
