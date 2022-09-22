import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useMultiverse } from '@/helpers/useMultiverse'
import { TransformControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { SceneTransformControl } from './SceneTransformControl'

export function TransformControlsFix({ fakeScene }) {
  //

  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  // let ref = useRef()

  useEffect(() => {
    // let hh = (ev) => {
    //   let ctrl = useMultiverse.getState().controls
    //   if (useGLBEditor.getState().orbit) {
    //     ctrl = useGLBEditor.getState().orbit
    //   }
    //   if (ctrl) {
    //     let setTo = !ev.value
    //     if (setTo) {
    //       setTimeout(() => {
    //         ctrl.enabled = setTo
    //       }, 250)
    //     } else {
    //       ctrl.enabled = setTo
    //     }
    //   }
    // }
    // let target = ref.current
    // target.addEventListener('dragging-changed', hh)
    // return () => {
    //   target.removeEventListener('dragging-changed', hh)
    // }
  }, [])
  //
  return (
    activeSceneSelection && (
      <SceneTransformControl
        object={activeSceneSelection}
        fakeScene={fakeScene}
      ></SceneTransformControl>
    )
  )
}
