import { useEffect, useRef } from 'react'
import Pane from 'tweakpane'
export function ENFCommonMaterial({ material }) {
  let refBasic = useRef()

  useEffect(() => {
    //

    let pane = new Pane({
      container: refBasic.current,
      ttile: 'material-commons',
    })
    let proxy = {
      get color() {
        return '#' + material.color.getHexString()
      },
      set color(v) {
        material.color = material.color || new Color(v)
        material.color.set(v)
      },
      get emissive() {
        return '#' + material.emissive.getHexString()
      },
      set emissive(v) {
        material.emissive = material.emissive || new Color(v)
        material.emissive.set(v)
      },
    }
    //
    pane.addInput(proxy, 'color')
    pane.addInput(proxy, 'emissive')

    return () => {
      pane.dispose()
    }
  }, [material])

  return (
    <div className='m-1 mr-5'>
      <div ref={refBasic}></div>
      <div></div>
    </div>
  )
}
