import create from 'zustand'
export const useEffectNode = create((set, get) => {
  //
  return {
    effectComposer: null,
    setEffectComposer: (v) => {
      set({ effectComposer: v })
    },
    //
  }
})

//

//
