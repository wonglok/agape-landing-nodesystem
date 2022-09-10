import create from 'zustand'
import { Codes } from './codes'
import { get as getIDX, set as setIDX } from 'idb-keyval'
import { verifyPermission } from '@/components/projects/FileSystem/FileSystem'

const NS_HDR = 'NS_HDR'

export const useEffectNode = create((set, get) => {
  //

  ///

  return {
    codes: Codes,
    setCodes: (v) => {
      set({ codes: v })
    },
    passArray: [],
    setPassArray: (v) => {
      set({ passArray: v })
    },

    hdrLink: false,
    initHDR: async () => {
      //
      let handle = await getIDX(NS_HDR)
      if (handle) {
        await verifyPermission(handle).catch((e) => {
          console.log(e)
        })

        let url = URL.createObjectURL(await handle.getFile())

        set({ hdrLink: url })
      }
    },
    setHDRLink: (v) => {
      set({ hdrLink: v })
    },
    setHDRHandle: (v) => {
      setIDX(NS_HDR, v)
    },

    //
  }
})
