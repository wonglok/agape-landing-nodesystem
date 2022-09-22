import { useEffect, useRef } from 'react'
import { FrontSide, BackSide, DoubleSide } from 'three140'
import Pane from 'tweakpane'
import { ENFTexture } from './Fields/ENFTexture'
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
      get transmission() {
        return material.transmission || 0.0
      },
      set transmission(v) {
        material.transmission = v
      },
      get thickness() {
        return material.thickness || 0.0
      },
      set thickness(v) {
        material.thickness = v
      },
      get ior() {
        return material.ior || 0.0
      },
      set ior(v) {
        material.ior = v
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
      get transparent() {
        return material.transparent || false
      },
      set transparent(v) {
        material.transparent = v
      },
      get opacity() {
        return material.opacity
      },
      set opacity(v) {
        material.opacity = v
      },
      get side() {
        return material.side || FrontSide
      },
      set side(v) {
        material.side = v
      },
      get flatShading() {
        return material.flatShading || true
      },
      set flatShading(v) {
        material.flatShading = v
      },
    }
    //
    //

    pane.addInput(proxy, 'color')
    pane.addInput(proxy, 'emissive')

    pane.addInput(proxy, 'transparent')
    pane.addInput(proxy, 'opacity')
    pane.addInput(proxy, 'transmission')
    pane.addInput(proxy, 'thickness')
    pane.addInput(proxy, 'ior')
    pane.addInput(proxy, 'roughness')
    pane.addInput(proxy, 'metalness')

    pane.addInput(proxy, 'envMapIntenisty')

    pane.addInput(proxy, 'side', {
      options: {
        FrontSide,
        BackSide,
        DoubleSide,
      },
    })

    pane.addInput(proxy, 'flatShading', {
      options: {
        flat: true,
        smooth: false,
      },
    })

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
      <button>Yo</button>
      <div className='mb-2'>{material?.name || 'Unknown'} </div>

      <div ref={refBasic}></div>
      <ENFTexture material={material} field={'map'}></ENFTexture>
    </div>
  )
}

//

//
