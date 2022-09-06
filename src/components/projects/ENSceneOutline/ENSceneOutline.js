import { useGLBEditor } from '@/helpers/useGLBEditor'
import { ENOutlineNode } from './ENOutlineNode'

export function ENSceneOutline({ height }) {
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  return (
    <div
      className='w-full px-1 py-12 pt-4 overflow-auto text-xs bg-white'
      style={{ height: height + 'px' }}
    >
      <ENOutlineNode node={activeGLBRuntimeObject.scene}></ENOutlineNode>
    </div>
  )
}

//

///

//

//

//

//
