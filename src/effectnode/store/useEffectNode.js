import create from 'zustand'

export const useEffectNode = create((set, get) => {
  //

  import('./codes').then(({ Codes }) => {
    set({ codes: Codes })
  })
  return {
    codes: [],
    setCodes: (v) => {
      set({ codes: v })
    },
    passArray: [],
    setPassArray: (v) => {
      set({ passArray: v })
    },
    //
  }
})

//

//

//

//
