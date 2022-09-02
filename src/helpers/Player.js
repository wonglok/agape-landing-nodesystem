import { useMultiverse } from './useMultiverse'

export function Player() {
  let player = useMultiverse((s) => s.player)
  return (
    <group visible={false}>
      <primitive object={player}></primitive>
    </group>
  )
}