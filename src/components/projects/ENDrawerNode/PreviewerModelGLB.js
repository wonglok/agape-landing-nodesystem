import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useState } from 'react'

import { ENModelViewer } from '../ENModelViewer/ENModelViewer'

export function PreviewerModelGLB({ parent, handle }) {
  let [url, setURL] = useState()
  let openFile = useGLBEditor((s) => s.openFile)

  useEffect(() => {
    //
    setURL(false)
    setTimeout(() => {
      handle.getFile().then((f) => {
        setURL(URL.createObjectURL(f))
      })
    })
  }, [handle])

  return (
    <>
      {url && (
        <>
          <div className='h-full border-r' style={{ width: '300px' }}>
            <ENModelViewer url={url} />
          </div>
          <div
            className='flex items-center justify-center h-full border-r'
            style={{ width: '300px' }}
          >
            <div>
              <button
                onClick={() => {
                  //
                  openFile(handle)
                }}
                className='inline-block p-2 text-white bg-blue-500 rounded-lg'
              >
                Open in Editor
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
