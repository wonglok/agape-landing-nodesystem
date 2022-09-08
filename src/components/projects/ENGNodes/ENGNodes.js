// import { useENEditor } from '@/vfx-studio/store/use-en-editor'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { NodeSingle } from './NodeSingle'

export function ENGNodes() {
  let effectNode = useGLBEditor(
    (s) => s.activeSceneSelection?.userData?.effectNode
  )
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)

  return (
    <group>
      {activeSceneSelection?.uuid && effectNode && (
        <>
          {effectNode?.nodes
            ?.filter((e) => e)
            .map((nd) => {
              return (
                <NodeSingle
                  key={nd?._id}
                  node={nd}
                  graph={effectNode}
                  effectNode={effectNode}
                ></NodeSingle>
              )
            })}
        </>
      )}
      {/*  */}
    </group>
  )
}
