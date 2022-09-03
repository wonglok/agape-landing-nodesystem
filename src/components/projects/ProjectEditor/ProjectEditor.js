import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ProjectEditor({}) {
  let project = useGLBEditor((s) => s.currentFolder)

  //
  return <div>{project._id}</div>
}
