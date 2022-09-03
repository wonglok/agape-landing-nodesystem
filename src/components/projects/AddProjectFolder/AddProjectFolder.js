import { useGLBEditor } from '@/helpers/useGLBEditor'
// import { generateUUID } from 'three/src/math/MathUtils'
import { getDirHandle, verifyPermission } from '../FileSystem/FileSystem'

export function AddProjectFolder() {
  let addProjectFolderHandle = useGLBEditor((s) => s.addProjectFolderHandle)
  let loadProjectFolder = useGLBEditor((s) => s.loadProjectFolder)
  return (
    <button
      className='inline-block px-4 py-1 mb-1 mr-1 bg-teal-200'
      onClick={async () => {
        let handle = await getDirHandle()

        if (handle) {
          await verifyPermission(handle, false)
        }

        await addProjectFolderHandle(handle)
        loadProjectFolder()
        //
        // //
        // for await (let item of handle.values()) {
        //   console.log(item)
        // }
      }}
    >
      Add New Project Folder
    </button>
  )
}

//
