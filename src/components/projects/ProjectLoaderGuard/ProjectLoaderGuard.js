import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { verifyPermission } from '../FileSystem/FileSystem'

export function ProjectLoaderGuard({ children = () => {} }) {
  let router = useRouter()
  let projectID = router.query.projectID
  let setCurrentFolder = useGLBEditor((s) => s.setCurrentFolder)

  let [project, setProject] = useState('loading')
  let loadProjectFolder = useGLBEditor((s) => s.loadProjectFolder)
  useEffect(() => {
    if (!projectID) {
      return
    }
    loadProjectFolder()
      .then((e) => {
        return e.find((e) => e._id === projectID)
      })
      .then((s) => {
        //
        if (s) {
          setCurrentFolder(s)
        } else {
          setProject('notfound')
        }
      })
  }, [loadProjectFolder, projectID, setCurrentFolder])

  return (
    <>
      {project === 'notfound' && <div>Folder Not Found...</div>}
      {project === 'notfound' && <div>Folder Not Found...</div>}
      {project === 'done' && children}
    </>
  )
}
