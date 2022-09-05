import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Clock } from 'three140'

export function ENTimeline() {
  /** @type {Clock} */
  let uiClock = useGLBEditor((s) => s.uiClock)
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
        {!uiClock.running ? (
          <div className='flex items-center justify-center w-full h-full'>
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
          </div>
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
      <div
        style={{ width: 'calc(100% - 54px)', height: '54px' }}
        className='bg-gray-300'
      >
        123
      </div>
    </div>
  )
}

//

// program.glb

function Timer() {
  return <div>{uiClock.getElapsedTime()}</div>
}
