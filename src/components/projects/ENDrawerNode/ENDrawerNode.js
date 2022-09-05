import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useCallback, useEffect, useState } from 'react'

export function ENDrawerNode({ handle, onNext = () => {} }) {
  let [entries, setEntries] = useState([])
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)
  let load = useCallback(() => {
    if (!handle) {
      return
    }
    listFolderItem(handle).then(async (v) => {
      //workspace
      // let resourcesEntry = v.find(
      //   (e) => e.handle.kind === 'directory' && e.handle.name === 'resources'
      // )
      // if (resourcesEntry) {
      //   setHandle(resourcesEntry)
      // } else {
      //   // createWorkspaceFolder().then(() => {
      //   //   load()
      //   // })
      // }
      //
      setEntries(v)
    })
  }, [handle, listFolderItem])

  //

  useEffect(() => {
    load()
  }, [load])

  return (
    <div
      style={{ width: '250px', height: '100%' }}
      className=' inline-block border border-r'
    >
      {entries &&
        entries.map((e) => (
          <div
            key={e._id}
            onClick={() => {
              //
              if (e.handle.kind === 'directory') {
                //

                console.log(e)
                onNext(<Wrapper handle={e.handle} />)
              }
            }}
          >
            {e.handle.name}
          </div>
        ))}
    </div>
  )
}

function Wrapper({ handle }) {
  let [next, setNext] = useState(false)

  return (
    <>
      <ENDrawerNode
        onNext={(newCompo) => {
          setNext(newCompo)
        }}
        handle={handle}
      ></ENDrawerNode>
      {next}
    </>
  )
}
