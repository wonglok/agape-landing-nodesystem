import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENProjectGuard({ placeholder = null, children }) {
  let activeGLBEditing = useGLBEditor((s) => s.activeGLBEditing)
  let activeGLBRawObject = useGLBEditor((s) => s.activeGLBRawObject)
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  return (
    <>
      {activeGLBEditing && activeGLBRawObject && activeGLBRuntimeObject
        ? children
        : placeholder}
    </>
  )
}
