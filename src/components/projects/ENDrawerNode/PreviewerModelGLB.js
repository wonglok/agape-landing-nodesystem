import { useEffect, useState } from 'react'

import { ENModelViewer } from '../ENModelViewer/ENModelViewer'

export function PreviewerModelGLB({ parent, handle }) {
  let [url, setURL] = useState()

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
        <div className='h-full border-r' style={{ width: '300px' }}>
          <ENModelViewer url={url} />
        </div>
      )}
    </>
  )
}
