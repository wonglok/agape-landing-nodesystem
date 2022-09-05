import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useCallback, useEffect, useState } from 'react'
import { ENDrawerNode } from '../ENDrawerNode/ENDrawerNode'

export function ENAssetDrawer() {
  let currentFolder = useGLBEditor((s) => s.currentFolder)
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)

  let [next, setNext] = useState(false)
  let [handleEntry, setHandleEntry] = useState(false)
  let load = useCallback(() => {
    listFolderItem(currentFolder?.handle).then(async (v) => {
      //workspace

      let resourcesEntry = v.find(
        (e) => e.handle.kind === 'directory' && e.handle.name === 'resources'
      )

      if (resourcesEntry) {
        setHandleEntry(resourcesEntry)
      } else {
        createWorkspaceFolder().then(() => {
          load()
        })
      }
    })
  }, [currentFolder?.handle, listFolderItem])

  //

  useEffect(() => {
    load()
  }, [load])

  //
  return (
    <div className='flex h-full'>
      {handleEntry && handleEntry.handle && (
        <ENDrawerNode
          handle={handleEntry.handle}
          onNext={(v) => {
            setNext(v)
          }}
        ></ENDrawerNode>
      )}
      {next}
    </div>
  )
}
