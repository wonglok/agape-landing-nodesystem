import { useMultiverse } from '@/helpers/useMultiverse'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { clone } from 'three140/examples/jsm/utils/SkeletonUtils'

export function UseObjectAsPlayer({ glbObject }) {
  let ref = useRef()

  //
  let player = useMultiverse((s) => s.player)
  let cloned = clone(glbObject.scene)

  //
  useFrame((st, dt) => {
    if (ref.current) {
      ref.current.position.copy(player.position)
      ref.current.position.y -= 1.52
      ref.current.quaternion.copy(player.quaternion)
    }
  })
  return (
    <group ref={ref}>
      <group rotation={[0, Math.PI, 0]}>
        <primitive key={cloned.uuid} object={cloned} />
      </group>
    </group>
  )
}

//
//
//

//
//
//

//
