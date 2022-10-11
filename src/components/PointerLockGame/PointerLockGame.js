import { ConnectKeyboard } from '@/helpers/ConnectKeyboard'
import { ConnectPointerControls } from '@/helpers/ConnectPointerControls'
import { ConnectSimulationPointer } from '@/helpers/ConnectSimulationPointer'
import { Player } from '@/helpers/Player'
import { GameFloor } from './GameFloor'
import { PointerUserControls } from './PointerUserControls'

export function PointerLockGame() {
  let gameFloor = `/scene/newyork/NYC_Expo_30.glb`
  let rgbeURL = `/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`

  //
  return (
    <group>
      <ConnectKeyboard></ConnectKeyboard>
      <ConnectPointerControls></ConnectPointerControls>
      <ConnectSimulationPointer></ConnectSimulationPointer>
      <Player visible={true}></Player>

      <GameFloor
        rgbeURL={rgbeURL}
        glbURL={gameFloor}
        enablePostProcessing={true}
      ></GameFloor>

      {/*  */}
      <PointerUserControls></PointerUserControls>
    </group>
  )
}
