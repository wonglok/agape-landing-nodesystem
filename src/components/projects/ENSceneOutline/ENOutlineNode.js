import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENOutlineNode({ level = 0, node }) {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let setSelection = useGLBEditor((s) => s.setSelection)
  return (
    <div
      className={
        'pl-0 mb-1 ml-1 border-l border-gray-100 transition-all duration-50 ' +
        ''
      }
      style={{
        background: `hsla(0,${0}%,${100.0 - (level + 2) * 2.0}%, 0.5)`,
        // borderColor: `hsla(0.0,0%,${100.0 - (level + 2) * 2.0}%, 1.0)`,
      }}
    >
      {/*  */}
      <div
        className={
          'pl-1 text-xs ' +
          (activeSceneSelection?.uuid === node.uuid
            ? 'bg-white p-2 text-gray-700 border-gray-700 border'
            : 'transition-all duration-50 hover:bg-slate-300')
        }
        onClick={() => {
          setSelection(node)
        }}
      >
        {activeSceneSelection?.uuid === node.uuid && <span>→ </span>}
        <span>{node.name}</span>
        {activeSceneSelection?.uuid === node.uuid && (
          <span className='ml-1'>[{node.type}]</span>
        )}
      </div>

      {node.children.map((kid) => {
        return (
          <ENOutlineNode
            level={level + 1}
            key={kid.uuid}
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
