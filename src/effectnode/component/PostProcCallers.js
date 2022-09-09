import { useGLBEditor } from '@/helpers/useGLBEditor'
import * as PROC from '@react-three/postprocessing'
import { EffectComposer } from '@react-three/postprocessing'
import { useEffect } from 'react'
import { useEffectNode } from '../store/useEffectNode'

export function PostProcCallers({ screenPass }) {
  let passArray = useEffectNode((s) => s.passArray)
  // let setPassArray = useEffectNode((s) => s.setPassArray)
  // let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)

  return (
    <EffectComposer>
      {screenPass}

      {passArray.map((info) => {
        let Compo =
          PROC[info.type] ||
          function Empty() {
            return null
          }

        return <Compo key={info._id} {...info.props}></Compo>
      })}
    </EffectComposer>
  )
}

//
