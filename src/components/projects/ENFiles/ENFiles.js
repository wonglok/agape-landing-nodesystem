import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useState } from 'react'
import { ENFileNode } from './ENFileNode'

export function ENFiles() {
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)
  let createWorkspaceFolder = useGLBEditor((s) => s.createWorkspaceFolder)
  let [handle, setHandle] = useState(false)

  useEffect(() => {
    if (!currentFolder?.handle) {
      return
    }
    let load = () => {
      listFolderItem(currentFolder?.handle).then(async (v) => {
        //workspace

        let workspaceEntry = v.find(
          (e) => e.handle.kind === 'directory' && e.handle.name === 'workspace'
        )

        if (workspaceEntry) {
          setHandle(workspaceEntry.handle)
        } else {
          createWorkspaceFolder().then(() => {
            load()
          })

          //
        }
      })
    }
    load()
  }, [
    createWorkspaceFolder,
    currentFolder,
    currentFolder?.handle,
    listFolderItem,
  ])

  return (
    <div>
      {handle ? (
        <ENFileNode handle={handle}></ENFileNode>
      ) : (
        <div
          onClick={() => {
            createWorkspaceFolder()
          }}
          className='w-32 p-4 m-4 text-white bg-blue-500 rounded-xl'
        >
          Click here to begin
        </div>
      )}
    </div>
  )
}

//

//

//
