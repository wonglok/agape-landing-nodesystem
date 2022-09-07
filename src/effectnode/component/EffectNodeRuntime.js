import { useEffect } from 'react'
import { assignSignaturesToGLB } from '../store/assignSignaturesToGLB'

export function EffectNodeRuntime({ glbRoot, glbRaw }) {
  glbRoot.scene.updateMatrixWorld(true)

  useEffect(() => {
    assignSignaturesToGLB(glbRoot)
    if (glbRaw) {
      assignSignaturesToGLB(glbRaw)
    }
  }, [glbRoot, glbRaw])

  //
  return (
    <group>
      {/*  */}
      {/*  */}
    </group>
  )
}
