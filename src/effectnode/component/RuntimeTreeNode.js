import { EffectNodeObject } from './EffectNodeObject'

export function RuntimeTreeNode({
  node,
  glbObject,
  disabledNodes,
  isEditingMode,
}) {
  return (
    <group>
      {node.userData?.effectNode && (
        <EffectNodeObject
          key={node.uuid + 'enrun'}
          glbObject={glbObject}
          item={node}
          disabledNodes={disabledNodes}
          effectNode={node.userData.effectNode}
          isEditingMode={isEditingMode}
        ></EffectNodeObject>
      )}

      {node.children.map((gKid) => {
        return (
          <group key={gKid.uuid + 'loop'}>
            <RuntimeTreeNode node={gKid}></RuntimeTreeNode>
          </group>
        )
      })}
    </group>
  )
}
