import { MathUtils } from 'three'
import { Vector2 } from 'three140'
import create from 'zustand'
export const useScrollStore = create((set, get) => {
  return {
    smooth: 0,
    scroll: 0,
    diff: 0,
    px: 0,
    total: 1,
    rotationX: 0,
    rotationY: 0,

    smoothPX: 0,
    setSmooth: (now, dt, px = 0, total = 1) => {
      let smooth = get().smooth

      let ll = MathUtils.damp(smooth, now, 2, dt)

      let smoothPX = get().smoothPX
      smoothPX = MathUtils.damp(smoothPX, px, 0.5, dt)

      set({ smoothPX, smooth: ll, diff: ll - smooth, px, px, total })
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
