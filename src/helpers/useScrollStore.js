import { MathUtils } from 'three'
import { Vector2 } from 'three140'
import create from 'zustand'
export const useScrollStore = create((set, get) => {
  return {
    smooth: 0,
    diff: 0,
    rotationX: 0,
    rotationY: 0,
    setSmooth: (now, dt) => {
      let smooth = get().smooth

      let ll = MathUtils.damp(smooth, now, 2, dt)

      set({ smooth: ll, diff: ll - smooth })
    },
  }
})

export const useReady = create((set, get) => {
  return {
    loading: true,
    setLoading: (v) => {
      set({ loading: v })
    },
  }
})
