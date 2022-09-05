import {
  provideProjects,
  saveProjects,
  verifyPermission,
} from '@/components/projects/FileSystem/FileSystem'
import { Clock } from 'three140'

//
import create from 'zustand'
//
import { getID } from './getID'

let generateInside = (set, get) => {
  return {
    //
    projectFolders: [],
    currentFolder: false,

    permission: 'prompt',
    queryPermission: async (handle) => {
      let permission = await handle.queryPermission({ mode: 'readwrite' })
      set({ permission })
    },

    requestPermission: async (handle) => {
      let permission = await verifyPermission(handle, true)

      set({ permission })

      return permission
    },

    setCurrentFolder: (v) => {
      set({ currentFolder: v })
    },

    loadProjectFolder: async () => {
      let projects = await provideProjects()
      set({ projectFolders: projects })

      return projects
    },
    removeProjectFolderByID: async (uuid) => {
      let projects = await provideProjects()

      let idx = projects.findIndex((e) => e._id === uuid)
      projects.splice(idx, 1)

      set({ projectFolders: projects })
      await saveProjects(projects)
    },

    listFolderItem: async (handle) => {
      let arr = []

      for await (let item of handle.values()) {
        //
        if (item.name === '.DS_Store') {
          continue
        }

        arr.push({
          _id: getID(),
          handle: item,
        })
      }

      return arr
    },
    addProjectFolderHandle: async (handle) => {
      let projects = await provideProjects()
      projects.push({
        handle: handle,
        _id: getID(),
      })
      await saveProjects(projects)
    },

    uiClock: new Clock(false),
    lastTime: 0,
    resetTime: () => {
      set({ lastTime: 0 })
    },
    toggleRunning: () => {
      /** @type {Clock} */
      let uiClock = get().uiClock

      // console.log(uiClock.running)
      if (uiClock.running) {
        uiClock.stop()
        set({ lastTime: uiClock.getElapsedTime() })
      } else {
        uiClock.start()
        uiClock.elapsedTime = get().lastTime
      }
      set({ uiClock })
    },
    updateClockTime: (v) => {
      /** @type {Clock} */
      let uiClock = get().uiClock

      if (v <= 0) {
        v = 0
      }

      // console.log(uiClock.running)
      uiClock.elapsedTime = v
      set({ uiClock })
    },

    createWorkspaceFolder: async () => {
      let currentFolder = get().currentFolder

      if (!currentFolder?.handle) {
        return
      }

      let workspace = await currentFolder?.handle.getDirectoryHandle(
        'workspace',
        {
          create: true,
        }
      )

      await currentFolder?.handle.getDirectoryHandle('export', {
        create: true,
      })
      let resources = await currentFolder?.handle.getDirectoryHandle(
        'resources',
        {
          create: true,
        }
      )

      await resources.getDirectoryHandle('glb', { create: true })
      await resources.getDirectoryHandle('hdr', { create: true })
      await resources.getDirectoryHandle('texture-image', { create: true })
      await resources.getDirectoryHandle('materials', { create: true })

      let handle = await workspace.getFileHandle('hello.en-workspace.json', {
        create: true,
      })

      await writeFile(
        handle,
        JSON.stringify({
          vendor: 'agape',
          version: '0.0.1',
          content: {},
        })
      )
      // handle.

      //
      return
    },
  }
}

export const useGLBEditor = create((set, get) => {
  return generateInside(set, get)
})

//
async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable()
  // Write the contents of the file to the stream.
  await writable.write(contents)
  // Close the file and write the contents to disk.
  await writable.close()
}
