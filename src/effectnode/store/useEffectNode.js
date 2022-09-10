import create from 'zustand'
import { Codes } from './codes'

export const useEffectNode = create((set, get) => {
  //

  return {
    codes: Codes,
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
