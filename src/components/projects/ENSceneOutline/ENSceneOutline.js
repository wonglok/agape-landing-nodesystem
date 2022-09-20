import { GlobalsEmptyObjects } from '@/effectnode/store/assignSignaturesToGLB'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { UpDown } from '../UIMain/UIMain'
import { ENOutlineNode } from './ENOutlineNode'

export function ENSceneOutline({ height }) {
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  return (
    <div
      className='w-full px-1 py-12 pt-4 overflow-auto text-xs bg-white'
      style={{ height: height + 'px' }}
    >
      <UpDown NS={'ENSceneOutline-up-down'}></UpDown>
      <div className='p-1 ml-1 text-center bg-gray-300'>Material Instances</div>
      <div className='p-1 ml-1 text-center bg-gray-300'>Scene Outline</div>
      {activeGLBRuntimeObject?.scene?.children
        .slice()
        .sort((a, b) => {
          if (GlobalsEmptyObjects.includes(a.name)) {
            return -1
          }
          return 0
        })
        .map((kid) => {
          return (
            <ENOutlineNode
              key={kid.uuid + 'outline'}
              node={kid}
            ></ENOutlineNode>
          )
        })}
    </div>
  )
}

//

//

//

//

//
