import { EffectsLanding } from '@/components/canvas/EffectsLanding/EffectsLanding'
// import { Item } from '@/components/canvas/Item/Item'
// import { ItemHTML } from '@/components/canvas/ItemHTML/ItemHTML'
import { NightHDR } from '@/components/canvas/NYCJourney/NightHDR'
import { NYCJourney } from '@/components/canvas/NYCJourney/NYCJourey'
import { HtmlHeader } from '@/components/landing/HtmlHeader'
// import { YoSpin } from '@/components/canvas/YoSpin/YoSpin'
import { useScrollStore } from '@/helpers/useScrollStore'
//
// import { Loader } from '@react-three/drei'
// import {
//   Box,
//   Environment,
//   Scroll,
//   ScrollControls,
//   Text,
//   useScroll,
// } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
// import { UIContent } from '@/helpers/UIContent'
//
import { useEffect } from 'react'
import { useRef } from 'react'

const Page = () => {
  // let viewport = useThree((s) => s.viewport)
  // let size = useThree((s) => s.size)

  return (
    <>
      {/* <YoSpin>
        <Box>
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </Box>
      </YoSpin> */}

      {/*  */}
      {/*  */}
      {/*  */}

      <NightHDR></NightHDR>
      <NYCJourney></NYCJourney>
      <EffectsLanding></EffectsLanding>

      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}
Page.layout = 'PromotePage'

Page.SEO = function SEO() {
  let ref = useRef()

  let setSmooth = useScrollStore((s) => s.setSmooth)
  useEffect(() => {
    if (!ref.current) {
      return
    }
    //
    //
    let now = window.performance.now() / 1000
    let last = now
    //

    let ttt = 0

    // console.log(ref.current)

    let rAF = () => {
      ttt = requestAnimationFrame(rAF)
      now = window.performance.now() / 1000
      let diff = now - last
      last = now
      // let a = document.createElement('div')
      //3129
      let scrollAmount = ref.current.scrollTop
      let total = ref.current.scrollHeight - window.innerHeight

      setSmooth(scrollAmount / total, diff)
    }

    ttt = requestAnimationFrame(rAF)

    return () => {
      cancelAnimationFrame(ttt)
    }
  }, [setSmooth])

  return (
    <span className=''>
      <div
        ref={ref}
        className='absolute top-0 left-0 z-10 w-screen h-screen overflow-y-scroll '
      >
        <ScrollContentt></ScrollContentt>
      </div>

      {/* <Loader></Loader> */}
    </span>
  )
}

function ScrollContentt() {
  return (
    <>
      <HtmlHeader />
      {/* <div style={{ height: '800vh' }}></div> */}
      {/* <div
        style={{ height: '100vh' }}
        className='flex items-center justify-center w-screen bg-red-200 bg-opacity-50'
      >
        <div className='text-2xl text-gray-200'>Page 1</div>
      </div>
      <div
        style={{ height: '100vh' }}
        className='flex items-center justify-center w-screen  bg-blue-200 bg-opacity-50'
      >
        <div className='text-2xl text-gray-200'>Page 2</div>
      </div>
      <div
        style={{ height: '100vh' }}
        className='flex items-center justify-center w-screen bg-blue-200 bg-opacity-50'
      >
        <div className='text-2xl text-gray-200'>Page 3</div>
      </div>
      <div
        style={{ height: '100vh' }}
        className='flex items-center justify-center w-screen bg-red-200 bg-opacity-50'
      >
        <div className='text-2xl text-gray-200'>Page 4</div>
      </div>
      <div
        style={{ height: '100vh' }}
        className='flex items-center justify-center w-screen bg-green-200 bg-opacity-50'
      >
        <div className='text-2xl text-gray-200'>Page 5</div>
      </div> */}
    </>
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

//
