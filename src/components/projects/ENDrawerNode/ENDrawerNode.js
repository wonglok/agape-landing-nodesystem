import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useCallback, useEffect, useState } from 'react'

export function ENDrawerNode({ parent, handle, onNext = () => {} }) {
  let [entries, setEntries] = useState([])
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)
  let [highLight, setHighlight] = useState(false)
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
                // console.log(e)
                setHighlight(e._id)
                onNext(<Wrapper parent={parent} handle={e.handle} />)
              }
            }}
            className={`${highLight === e._id ? 'bg-gray-300' : ''}`}
          >
            {e.handle.name}
          </div>
        ))}
    </div>
  )
}

function Wrapper({ parent, handle }) {
  let [next, setNext] = useState(false)
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)

  useEffect(() => {
    if (!parent) {
      setNext(false)
      return
    }
    listFolderItem(parent).then((e) => {
      if (!e.some((ee) => ee.handle.name === handle.name)) {
        setNext(false)
      }
    })
  }, [handle.name, listFolderItem, parent])

  return (
    <>
      <ENDrawerNode
        parent={parent}
        onNext={(newCompo) => {
          setNext(newCompo)
        }}
        handle={handle}
      ></ENDrawerNode>
      {next}
    </>
  )
}
