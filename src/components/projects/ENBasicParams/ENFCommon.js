import { useEffect, useRef } from 'react'
import Pane from 'tweakpane'
export function ENFCommon({ material }) {
  let refBasic = useRef()

  useEffect(() => {
    //

    if (!material) {
      return
    }

    let pane = new Pane({
      container: refBasic.current,
      ttile: 'material-commons',
    })

    //
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

      get roughness() {
        return material.roughness || 0.5
      },
      set roughness(v) {
        material.roughness = v
      },
      get metalness() {
        return material.metalness || 0.0
      },
      set metalness(v) {
        material.metalness = v
      },

      get envMapIntenisty() {
        return material.envMapIntenisty || 1
      },
      set envMapIntenisty(v) {
        material.envMapIntenisty = v
      },
    }
    //
    pane.addInput(proxy, 'roughness')
    pane.addInput(proxy, 'metalness')
    pane.addInput(proxy, 'color')
    pane.addInput(proxy, 'emissive')
    pane.addInput(proxy, 'envMapIntenisty')

    return () => {
      pane.dispose()
    }
  }, [material])

  return (
    <div
      className='m-1 mt-2'
      onKeyDown={(ev) => {
        ev.stopPropagation()
      }}
    >
      <div className='mb-2'>{material?.name || 'Unknown'} </div>
      <div ref={refBasic}></div>
    </div>
  )
}

//

//
