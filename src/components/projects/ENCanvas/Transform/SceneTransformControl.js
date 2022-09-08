import { useEffect } from 'react'
// import { useAccessor } from '@/vfx-studio/store/use-accessor'
import { createPortal, useThree } from '@react-three/fiber'
// import { HDRTex } from './HDRTex'
// import {
//   // FlyControls,
//   // MapControls,
//   // OrbitControls,
//   Select,
//   useAnimations,
//   useFBO,
// } from '@react-three/drei'
import {
  // BoxBufferGeometry,
  // BoxHelper,
  // DoubleSide,
  Object3D,
  // PlaneBufferGeometry,
  // Vector3,
} from 'three'
// import anime from 'animejs'
// import { OnlineSystem } from '@/vfx-meta/online/OnlineSystem'
// import { useMetaStore } from '@/vfx-meta/store/use-meta-store'
import { TransformControls } from 'three140/examples/jsm/controls/TransformControls.js'
import { useMultiverse } from '@/helpers/useMultiverse'
import { useGLBEditor } from '@/helpers/useGLBEditor'

export function SceneTransformControl({
  object = new Object3D(),
  onChange = () => {},
  fakeScene,
}) {
  //
  let camera = useThree((s) => s.camera)
  let gl = useThree((s) => s.gl)
  useEffect(() => {
    let tc = new TransformControls(camera, gl.domElement)
    let o3 = object

    fakeScene.add(tc)

    tc.addEventListener('change', (ev) => {
      onChange(object)
      window.dispatchEvent(new CustomEvent('transform-update', { detail: o3 }))
    })

    let canDo = true
    window.addEventListener('useTranslate', () => {
      if (!canDo) {
        return
      }
      tc.setMode('translate')
    })
    window.addEventListener('useRotation', () => {
      if (!canDo) {
        return
      }
      tc.setMode('rotate')
    })
    window.addEventListener('useScale', () => {
      if (!canDo) {
        return
      }
      tc.setMode('scale')
    })

    tc.addEventListener('dragging-changed', (ev) => {
      let ctrl = useMultiverse.getState().controls

      if (useGLBEditor.getState().editorNavigationMode === 'orbit') {
        ctrl = useGLBEditor.getState().orbit
      }

      if (ctrl) {
        let setTo = !ev.value

        if (setTo) {
          onChange(object)
          setTimeout(() => {
            ctrl.enabled = setTo
          }, 250)
        } else {
          ctrl.enabled = setTo
          onChange(object)
        }
      }
    })

    tc.attach(o3)

    return () => {
      canDo = false
      tc.visible = false
      tc.dispose()
    }
  }, [camera, fakeScene, object, onChange, gl.domElement])

  return createPortal(<></>, fakeScene)
}
