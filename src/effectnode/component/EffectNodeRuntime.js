import { assignSignaturesToGLB } from '../store/assignSignaturesToGLB'
import { RuntimeTreeNode } from './RuntimeTreeNode'

export function EffectNodeRuntime({
  glbObject,
  glbRaw,
  disabledNodes = [],
  isEditingMode = false,
}) {
  glbObject.scene.updateMatrixWorld(true)

  assignSignaturesToGLB(glbObject)
  if (glbRaw) {
    assignSignaturesToGLB(glbRaw)
  }

  return (
    <group>
      {glbObject.scene.children
        // .filter((e) => e.sigMD5)
        .map((kid) => {
          return (
            <group key={kid.uuid + 'explore'}>
              {/*  */}
              <RuntimeTreeNode
                key={kid.uuid + 'runtreenode'}
                glbObject={glbObject}
                disabledNodes={disabledNodes}
                node={kid}
                isEditingMode={isEditingMode}
              ></RuntimeTreeNode>
              {/*  */}
            </group>
          )
        })}
      {/*  */}
      {/*  */}
    </group>
  )
}

//
