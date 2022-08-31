import { useScrollStore } from '@/helpers/useScrollStore'
import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  Noise,
  SMAA,
  ToneMapping,
  // Scanline,
  // ShockWave,
  // SMAA,
  // SSAO,
} from '@react-three/postprocessing'
// import { useControls } from 'leva'

export function EffectsLanding() {
  // let useSettings = useControls
  // if (process.env.NODE_ENV === 'production') {
  //   useSettings = (v) => v
  // }
  //
  let useSettings = (v) => v

  const { hue, saturation } = useSettings({ hue: 0, saturation: 0.05 })
  const { offsetX, offsetY } = useSettings({ offsetX: 0.5, offsetY: 0.0 })

  let diff = 0.00233
  // const diff = useScrollStore((s) => s.diff)
  // console.log('offsetX, offsetY', offsetX, offsetY)
  // console.log('hue, saturation', hue, saturation)

  return (
    <group>
      <EffectComposer multisampling={0}>
        <Noise opacity={1} premultiply={true}></Noise>
        <Bloom
          intensity={1.5}
          // mipmapBlur={true}
          // radius={2}
          luminanceSmoothing={1}
          luminanceThreshold={0.1}
        ></Bloom>

        <BrightnessContrast
          brightness={0.07}
          contrast={0.2}
        ></BrightnessContrast>
        <HueSaturation hue={hue} saturation={saturation}></HueSaturation>

        <ChromaticAberration
          offset={[diff * offsetX, diff * offsetY]}
        ></ChromaticAberration>

        {/* <ToneMapping
          adaptive={true} // toggle adaptive luminance map usage
          resolution={256} // texture resolution of the luminance map
          middleGrey={1.5} // middle grey factor
          maxLuminance={50.0} // maximum luminance
          averageLuminance={1.0} // average luminance
          adaptationRate={1.0} // luminance adaptation rate
        /> */}
      </EffectComposer>
    </group>
  )
}

//
