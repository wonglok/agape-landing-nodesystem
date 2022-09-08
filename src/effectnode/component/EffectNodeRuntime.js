import { getID } from '@/helpers/getID'
import { useState } from 'react'
import { assignSignaturesToGLB } from '../store/assignSignaturesToGLB'
import { RuntimeTreeNode } from './RuntimeTreeNode'

export function EffectNodeRuntime({
  glbObject,
  glbRaw,
  disabledNodes = [],
  isEditingMode = false,
}) {
  let [instID] = useState(getID())
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
            <group key={kid.uuid + instID + 'explore'}>
              {/*  */}
              <RuntimeTreeNode
                key={kid.uuid + instID + 'runtreenode'}
                instID={instID}
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

//

//
