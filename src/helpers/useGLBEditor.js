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
  }
}

export const useGLBEditor = create((set, get) => {
  return generateInside(set, get)
})

//
