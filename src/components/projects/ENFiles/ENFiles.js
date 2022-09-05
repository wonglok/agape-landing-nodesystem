import { useGLBEditor } from '@/helpers/useGLBEditor'
import { ENFileNode } from './ENFileNode'

export function ENFiles() {
  let currentFolder = useGLBEditor((s) => s.currentFolder)

  return (
    <div>
      <ENFileNode></ENFileNode>
    </div>
  )
}

//

//

//

//
