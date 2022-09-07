import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENProjectGuard({
  placeholder = null,
  loading = null,
  children,
}) {
  let activeGLBSplash = useGLBEditor((s) => s.activeGLBSplash)
  let activeGLBRawObject = useGLBEditor((s) => s.activeGLBRawObject)
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  return (
    <>
      {activeGLBSplash === 'loading' && <>{loading}</>}
      {activeGLBSplash === 'ready' &&
      activeGLBRawObject &&
      activeGLBRuntimeObject
        ? children
        : placeholder}
    </>
  )
}
