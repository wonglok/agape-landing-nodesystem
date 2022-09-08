import * as PROC from '@react-three/postprocessing'
import { useEffectNode } from '../store/useEffectNode'

export function PostProcCallers() {
  let passArray = useEffectNode((s) => s.passArray)

  return (
    <>
      {passArray.map((e) => {
        return <EachPass key={e._id} info={e}></EachPass>
      })}
    </>
  )
}

// console.log(Object.keys(PROC))

function EachPass({ info }) {
  let Compo =
    PROC[info.type] ||
    function Empty() {
      return null
    }
  return (
    <>
      <Compo {...info.props}></Compo>
    </>
  )
}
