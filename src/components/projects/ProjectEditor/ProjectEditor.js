import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect } from 'react'

export function ProjectEditor({}) {
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  useEffect(() => {
    //
  }, [])
  //
  return <div>{currentFolder._id}</div>
}

//

//

//

//

//
