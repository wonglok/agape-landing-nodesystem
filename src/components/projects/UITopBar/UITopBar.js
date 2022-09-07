import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function UITopBar() {
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  let activeGLBHandle = useGLBEditor((s) => s.activeGLBHandle)
  let closeFile = useGLBEditor((s) => s.closeFile)
  let saveFile = useGLBEditor((s) => s.saveFile)
  let needsSaveFileWords = useGLBEditor((s) => s.needsSaveFileWords)
  let router = useRouter()

  return (
    <div className='flex items-center justify-between h-6 p-1 px-2 text-xs bg-gray-200'>
      <div className='inline-flex items-center justify-start w-1/3'>
        <button
          className='text-xs'
          onClick={() => {
            closeFile().then((ans) => {
              if (ans === 'ok') {
                router.push('/project')
              }
            })
          }}
        >
          ← Back
        </button>
      </div>
      <div className='inline-flex items-center justify-center w-1/3'>
        {currentFolder?.handle?.name}
        {activeGLBHandle && (
          <span className='ml-1'> / {activeGLBHandle?.name}</span>
        )}
        {activeGLBHandle && (
          <button
            className='px-2 ml-2 text-xs text-white bg-purple-600 rounded-full'
            onClick={async () => {
              let ans = await closeFile()
              if (ans === 'ok') {
                //
                // saveFile({ scene: ,  })
              }
            }}
          >
            {needsSaveFileWords ? (
              <span>{needsSaveFileWords}</span>
            ) : (
              <span>Save & Close</span>
            )}
          </button>
        )}
        {/* {activeGLBHandle && (
          <button
            className='px-2 ml-2 text-xs text-white bg-blue-600 rounded-full'
            onClick={() => {
              saveFile()
            }}
          >
            <span>Save</span>
          </button>
        )} */}
      </div>
      <div className='inline-flex items-center justify-end w-1/3'>
        <ResetLayoutBtn></ResetLayoutBtn>
      </div>
    </div>
  )
}

function ResetLayoutBtn() {
  let [canReset, setCanReset] = useState(true)

  //
  useEffect(() => {
    let autolayout = localStorage.getItem('autolayout')
    if (autolayout === 'yes') {
      setCanReset(true)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('reset-size', { detail: false }))
      }, 100)
    }
    if (autolayout === 'no') {
      setCanReset(false)
    }
    if (autolayout === null) {
      setCanReset(true)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('reset-size', { detail: false }))
      }, 100)
    }
  }, [])

  useEffect(() => {
    let tt = 0
    let rr = () => {
      clearTimeout(tt)
      tt = setTimeout(() => {
        if (canReset) {
          window.dispatchEvent(new CustomEvent('reset-size', { detail: true }))
        }
      }, 100)
    }
    let focus = () => {
      clearTimeout(tt)
      tt = setTimeout(() => {
        if (canReset) {
          window.dispatchEvent(new CustomEvent('reset-size', { detail: false }))
        }
      }, 100)
    }
    window.addEventListener('resize', rr)
    window.addEventListener('focus', focus)

    return () => {
      window.removeEventListener('resize', rr)
      window.removeEventListener('focus', focus)
    }
  }, [canReset])

  return (
    <div
      className=' flex items-center justify-center'
      onClick={() => {
        setCanReset((s) => {
          if (!s) {
            setTimeout(() => {
              localStorage.setItem('autolayout', !s ? 'yes' : 'no')
              window.dispatchEvent(
                new CustomEvent('reset-size', { detail: true })
              )
            }, 100)
          }

          return !s
        })
      }}
    >
      <div className='mr-1'>Auto Layout</div>
      <div
        className={
          'inline-flex w-8 rounded-full transition-all duration-500 ' +
          (canReset ? ' bg-green-500' : 'bg-green-800')
        }
      >
        <div
          className={
            'w-4 h-4 bg-white rounded-full transition-all duration-500 ' +
            (canReset ? ' translate-x-4' : '')
          }
        ></div>
      </div>
    </div>
  )
}
