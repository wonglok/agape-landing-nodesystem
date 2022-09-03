import {
  provideProjects,
  saveProjects,
} from '@/components/projects/FileSystem/FileSystem'

//
import create from 'zustand'
import { getID } from './getID'

let inside = (set, get) => {
  return {
    //
    projectFolders: [],
    currentFolder: false,

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
  }
}

export const useGLBEditor = create((set, get) => {
  return inside(set, get)
})
