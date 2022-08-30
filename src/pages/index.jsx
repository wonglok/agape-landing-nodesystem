import { EffectsLanding } from '@/components/canvas/EffectsLanding/EffectsLanding'
import { Item } from '@/components/canvas/Item/Item'
import { ItemHTML } from '@/components/canvas/ItemHTML/ItemHTML'
import { NightHDR } from '@/components/canvas/NYCJourney/NightHDR'
import { NYCJourney } from '@/components/canvas/NYCJourney/NYCJourey'
import { YoSpin } from '@/components/canvas/YoSpin/YoSpin'
import { useScrollStore } from '@/helpers/useScrollStore'
import {
  Box,
  Environment,
  Scroll,
  ScrollControls,
  Text,
  useScroll,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useRef } from 'react'
// import { UIContent } from '@/helpers/UIContent'

const Page = () => {
  let viewport = useThree((s) => s.viewport)
  let size = useThree((s) => s.size)

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
    let now = window.performance.now() / 1000
    let last = now
    //

    let ttt = 0

    let rAF = () => {
      ttt = requestAnimationFrame(rAF)
      now = window.performance.now() / 1000
      let diff = now - last
      // let a = document.createElement('div')
      //3129
      let scrollAmount = ref.current.scrollTop
      let page = window.innerHeight
      let howManyPages = ref.current.children.length
      let total = page * (howManyPages - 1)

      setSmooth(scrollAmount / total, diff)
    }

    ttt = requestAnimationFrame(rAF)

    //
    return () => {
      cancelAnimationFrame(ttt)
    }
  }, [setSmooth])

  return (
    <div
      ref={ref}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-y-scroll'
    >
      <Content></Content>
      {/* <div>
        <a href={'/page1'}>Page1</a>
      </div>
      <div>
        <a href={'/forge'}>Forge Avatar + Motion</a>
      </div> */}
    </div>
  )
}

function Content() {
  return (
    <>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-gray-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
      <div className='w-screen h-screen bg-red-400 bg-opacity-20'></div>
      <div className='w-screen h-screen pointer-events-none'></div>
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
