import { get, set, createStore } from 'idb-keyval'

export const NS_Projects = 'en_projects'
export const NS_DIR_PREFIX = 'dir_uuid'
export const getDirNS = (v) => {
  return `${NS_DIR_PREFIX}${v}`
}
export async function provideProjects() {
  let enProjs = await get(NS_Projects)

  if (!enProjs) {
    await set(NS_Projects, [])
    enProjs = await get(NS_Projects)
  }

  return enProjs
}

export async function saveProjects(v) {
  await set(NS_Projects, v)
}

export let getDirHandle = async () => {
  try {
    const directoryHandle = await window.showDirectoryPicker()
    return directoryHandle
  } catch (error) {
    console.log(error)
  }
}

export async function verifyPermission(fileHandle, readWrite) {
  const options = {}
  if (readWrite) {
    options.mode = 'readwrite'
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === 'granted') {
    return true
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === 'granted') {
    return true
  }
  // The user didn't grant permission, so return false.
  return false
}

//
/*
// console.log(handle)

  let readFolderHandle = async ({ folder, onFile = () => {} }) => {
    for await (const entry of folder.values()) {
      try {
        if (entry.kind === 'directory') {
          // await entry.getFile().then((f) => f.arrayBuffer())
          //
          readFolderHandle({ folder: entry, onFile })
        } else if (entry.kind === 'file') {
          //
          let file = await entry.getFile()

          onFile({ file: file, dir: folder, handle: entry })
        }
        // console.log(entry.kind, entry.name)
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (handle) {
    readFolderHandle({
      folder: handle,
      onFile: (ev) => {
        // ev.itself.remove()
      },
    })
  }

*/

// // //

// let readFolderHandle = async ({ folder, onFile = () => {} }) => {
//   for await (const entry of folder.values()) {
//     try {
//       if (entry.kind === 'directory') {
//         // await entry.getFile().then((f) => f.arrayBuffer())
//         //
//         readFolderHandle({ folder: entry, onFile })
//       } else if (entry.kind === 'file') {
//         //
//         let file = await entry.getFile()

//         onFile({ file: file, dir: folder, handle: entry })
//       }
//       // console.log(entry.kind, entry.name)
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }

// export function dragOverElem(elem = window) {
//   let dragover = (e) => {
//     // Prevent navigation.
//     e.preventDefault()

//     elem.style.background = '#3333ba'
//   }
//   elem.addEventListener('dragover', dragover)

//   let dragleave = (e) => {
//     // Prevent navigation.
//     e.preventDefault()

//     elem.style.background = ''
//   }
//   elem.addEventListener('dragleave', dragleave)

//   let drop = async (e) => {
//     e.preventDefault()

//     const fileHandlesPromises = [...e.dataTransfer.items]

//     fileHandlesPromises.forEach(async (it) => {
//       //
//       let handle = await it.getAsFileSystemHandle()

//       if (handle.kind === 'directory') {
//         readFolderHandle({
//           folder: handle,
//           onFile: (ev) => {
//             console.log(ev)
//           },
//         })
//       } else {
//         // let file = await handle.getFile()
//         // console.log(file)
//       }
//     })

//     // console.log(fileHandlesPromises)
//   }
//   elem.addEventListener('drop', drop)

//   let click = async () => {
//     let dirHandle = false
//     try {
//       const directoryHandle = await window.showDirectoryPicker()
//       dirHandle = directoryHandle
//     } catch (error) {
//       console.log(error)
//     }

//     if (dirHandle) {
//       readFolderHandle({
//         folder: dirHandle,
//         onFile: (ev) => {
//           console.log(ev)
//           // ev.itself.remove()
//         },
//       })
//     }
//   }
//   elem.addEventListener('click', click)

//   return () => {
//     elem.removeEventListener('click', click)
//     elem.removeEventListener('drop', drop)
//     elem.removeEventListener('dragover', dragover)
//     elem.removeEventListener('dragleave', dragleave)
//   }
// }
// //

//
