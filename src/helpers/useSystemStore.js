import create from 'zustand'

const useSystemStore = create((set, get) => {
  return {
    router: null,
    setRouter: (v) => {
      set({ router: v })
    },
  }
})

export { useSystemStore }
