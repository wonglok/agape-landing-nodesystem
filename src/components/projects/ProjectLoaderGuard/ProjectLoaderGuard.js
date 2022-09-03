import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function ProjectLoaderGuard({ children = () => {} }) {
  let router = useRouter()
  let projectID = router.query.projectID
  let setCurrentFolder = useGLBEditor((s) => s.setCurrentFolder)

  let [project, setProject] = useState('loading')
  let loadProjectFolder = useGLBEditor((s) => s.loadProjectFolder)
  let requestPermission = useGLBEditor((s) => s.requestPermission)
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  let permission = useGLBEditor((s) => s.permission)

  useEffect(() => {
    if (!projectID) {
      return
    }
    loadProjectFolder()
      .then((e) => {
        return e.find((e) => e._id === projectID)
      })
      .then(async (s) => {
        //
        if (s) {
          await setCurrentFolder(s)
          setProject('found')
        } else {
          setProject('notfound')
        }
      })
  }, [loadProjectFolder, projectID, setCurrentFolder])

  return (
    <>
      {project === 'loading' && <div>Loading...</div>}
      {project === 'notfound' && <div>Folder Not Found...</div>}
      {project === 'found' && permission !== 'granted' && (
        <div className='flex items-center justify-center w-full h-full'>
          <div
            onClick={async () => {
              let permission = await requestPermission(currentFolder.handle)
              console.log(permission)
            }}
            className='p-5 text-white bg-gray-500 rounded-xl'
          >
            Allow File Reader
          </div>
        </div>
      )}
      {project === 'found' && permission === 'granted' && children}
    </>
  )
}
