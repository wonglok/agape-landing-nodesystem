import { Scene } from 'three'
import create from 'zustand'
import { AllScenes } from './AllScenes'
import { getSlug } from './getSlug'

const useSystemStore = create((set, get) => {
  return {
    router: null,
    setRouter: (v) => {
      set({ router: v })
    },
    overlayReactContent: <></>,
    setOverlayReactContent: (v) => set({ overlayReactContent: v }),
  }
})

export { useSystemStore }
