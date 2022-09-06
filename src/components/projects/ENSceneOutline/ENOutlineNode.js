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
        background: `hsla(100,${100.0 - (level + 2) * 2.0}%,${
          100.0 - (level + 2) * 2.0
        }%, 0.5)`,
        // borderColor: `hsla(0.0,0%,${100.0 - (level + 2) * 2.0}%, 1.0)`,
      }}
    >
      {/*  */}
      <div
        className={
          'pl-1 text-xs ' +
          (activeSceneSelection?.uuid === node.uuid
            ? 'bg-gray-500 p-2 text-white'
            : 'transition-all duration-50 hover:bg-slate-300')
        }
        onClick={() => {
          setSelection(node)
        }}
      >
        {activeSceneSelection?.uuid === node.uuid && <span>→ </span>}
        {node.name}
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
