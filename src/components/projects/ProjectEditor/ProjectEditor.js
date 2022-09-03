import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect } from 'react'

export function ProjectEditor({}) {
  let project = useGLBEditor((s) => s.currentFolder)

  useEffect(() => {
    let run = async () => {
      let handle = project.handle
      for await (let yo of handle) {
      }
    }
    run()
  }, [])
  //
  return <div>{project._id}</div>
}

//

//

//

//

//
