import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useRef } from 'react'
import { Clock } from 'three140'

export function ENTimeline() {
  /** @type {Clock} */
  let uiClock = useGLBEditor((s) => s.uiClock)
  let running = useGLBEditor((s) => s.uiClock.running)
  let toggleRunning = useGLBEditor((s) => s.toggleRunning)
  return (
    <div
      className='flex items-center justify-center w-full text-xs bg-gray-300'
      style={{ height: '54px' }}
    >
      <div
        style={{ width: '54px', height: '54px' }}
        // className='flex items-center justify-center'
      >
        {' '}
        <div className='flex items-center justify-center w-full h-full'>
          {!running ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              onClick={() => {
                //
                toggleRunning()
              }}
            >
              <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              onClick={() => {
                //
                toggleRunning()
              }}
            >
              <path d='M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z' />
            </svg>
          )}
        </div>
      </div>
      <Track></Track>
    </div>
  )
}

//
// program.glb

function Track() {
  let cursorRef = useRef()
  let timerTextRef = useRef()

  let uiClock = useGLBEditor((s) => s.uiClock)
  let resetTime = useGLBEditor((s) => s.resetTime)
  let updateClockTime = useGLBEditor((s) => s.updateClockTime)
  useEffect(() => {
    resetTime()

    //
    let rAFID = 0
    let rAF = () => {
      rAFID = requestAnimationFrame(rAF)

      let t = uiClock.getElapsedTime()

      cursorRef.current.style.transform = `translateX(${t * (10).toFixed(2)}px)`

      timerTextRef.current.innerText = t.toFixed(2).padStart(6, 0)
    }
    rAFID = requestAnimationFrame(rAF)

    return () => {
      cancelAnimationFrame(rAFID)
    }
  }, [])
  let isDown = useRef(false)

  useEffect(() => {
    let mouseup = () => {
      isDown.current = false
    }
    window.addEventListener('mouseup', mouseup)
    return () => {
      window.removeEventListener('mouseup', mouseup)
    }
  })
  return (
    <div
      style={{ width: 'calc(100% - 54px)', height: '54px', overflow: 'hidden' }}
      className='relative bg-gray-100'
      onClick={(ev) => {
        let px = ev.pageX - 54
        updateClockTime(px / 10)
      }}
      onMouseDown={() => {
        isDown.current = true
      }}
      onMouseUp={() => {
        isDown.current = false
      }}
      onMouseMove={(ev) => {
        if (isDown.current) {
          let px = ev.pageX - 54
          updateClockTime(px / 10)
        }
      }}
    >
      <div
        className='h-full bg-gray-800'
        ref={cursorRef}
        style={{
          width: '2px',
        }}
      ></div>
      <div
        className='absolute top-0 flex items-center justify-start left-4'
        style={{ height: '54px' }}
      >
        <span className='inline-block w-12 h-4' ref={timerTextRef}></span>
        <span className='absolute' style={{ top: '20px', left: '45px' }}>
          s
        </span>
      </div>
    </div>
  )
}
