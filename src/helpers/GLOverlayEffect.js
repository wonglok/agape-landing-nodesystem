import React, { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { Uniform } from 'three'
import { BlendFunction } from 'postprocessing'

const fragmentShader = `
uniform float opacity;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
	outputColor = vec4((opacity) * inputColor.rgb, inputColor.a);
}

`

export const screenOpacity = new Uniform(1)
export class CustomEffect extends Effect {
  constructor({}) {
    super('CustomEffect', fragmentShader, {
      blendFunction: BlendFunction.Normal,
      uniforms: new Map([['opacity', screenOpacity]]),
    })
  }
}

// Effect component
export const GLOverlayEffect = forwardRef(function EffectFuncy({}, ref) {
  const effect = useMemo(() => new CustomEffect({}), [])
  return <primitive ref={ref} object={effect} />
})

//

//
