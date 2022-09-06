import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ENDrawerNode } from '../ENDrawerNode/ENDrawerNode'

export function ENAssetDrawer({ size }) {
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  // let listFolderItem = useGLBEditor((s) => s.listFolderItem)

  let [next, setNext] = useState(false)
  let [handleEntry, setHandleEntry] = useState(false)
  let load = useCallback(() => {
    setHandleEntry(currentFolder)

    //     listFolderItem(currentFolder?.handle).then(async (v) => {
    //   //workspace

    //   let resourcesEntry = v.find(
    //     (e) => e.handle.kind === 'directory' && e.handle.name === 'resources'
    //   )

    //   if (resourcesEntry) {
    //   } else {
    //     createWorkspaceFolder().then(() => {
    //       load()
    //     })
    //   }
    // })
  }, [currentFolder])

  //

  useEffect(() => {
    load()
  }, [load])

  let [height, setHeight] = useState(100)
  let barRef = useRef()
  useEffect(() => {
    setHeight(window.innerHeight - 54 - 24 - size)

    let tt = setInterval(() => {
      if (height !== window.innerHeight - 54 - 24 - size - 0.1) {
        setHeight(window.innerHeight - 54 - 24 - size - 0.1)
      }
    }, 100)

    return () => {
      clearInterval(tt)
    }

    //
  }, [height, size])

  useEffect(() => {
    //
    let wheel = (ev) => {
      if (barRef?.current?.scrollLeft === 0 && ev.deltaX < 0) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.stopImmediatePropagation()
      }
    }
    window.addEventListener('wheel', wheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', wheel, { passive: false })
    }
  }, [])

  //
  //
  return (
    <div
      className='relative h-full overflow-x-scroll border-t border-gray-300'
      ref={barRef}
      // onScrollCapture={(e) => {
      //   e.stopPropagation()
      //   e.preventDefault()
      // }}
    >
      <div
        className='relative flex'
        style={{ width: '100000vw', height: height + 'px' }}
      >
        {handleEntry && handleEntry.handle && (
          <ENDrawerNode
            //
            level={1}
            getEl={() => barRef.current}
            handle={handleEntry.handle}
            onNext={(v) => {
              setNext(v)
            }}
          ></ENDrawerNode>
        )}
        {next}
      </div>
    </div>
  )
}
