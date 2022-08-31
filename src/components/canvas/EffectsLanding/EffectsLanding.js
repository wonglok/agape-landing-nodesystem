import { useScrollStore } from '@/helpers/useScrollStore'
import { useLoader } from '@react-three/fiber'
import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  LUT,
  Noise,
  Scanline,
  SMAA,
  SSR,
  ToneMapping,
  Vignette,
  // Scanline,
  // ShockWave,
  // SMAA,
  // SSAO,
} from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
// import { useControls } from 'leva'

export function EffectsLanding() {
  // let useSettings = useControls
  // if (process.env.NODE_ENV === 'production') {
  //   useSettings = (v) => v
  // }
  //
  let useSettings = (v) => v
  const texture = useLoader(LUTCubeLoader, '/lut/Chemical 168.CUBE')

  // const { hue, saturation } = useSettings({ hue: 0, saturation: 0.05 })
  const { offsetX, offsetY } = useSettings({ offsetX: 0.5, offsetY: 0.0 })

  let diff = 0.00233 * 0.75
  // const diff = useScrollStore((s) => s.diff)
  // console.log('offsetX, offsetY', offsetX, offsetY)
  // console.log('hue, saturation', hue, saturation)

  return (
    <group>
      <EffectComposer
        disableNormalPass={false}
        stencilBuffer={false}
        multisampling={4}
      >
        <Noise opacity={1} premultiply={true}></Noise>
        <Noise opacity={0.5} premultiply={true}></Noise>

        <Bloom
          intensity={2.5}
          mipmapBlur={true}
          radius={0.4}
          luminanceSmoothing={0.5}
          luminanceThreshold={0.2}
        ></Bloom>

        {/*  */}
        {/*  */}
        {/*  */}
        {/* <SMAA></SMAA> */}

        <Vignette></Vignette>

        {/* <Scanline></Scanline> */}

        {/* <BrightnessContrast
          brightness={0.07}
          contrast={0.2}
        ></BrightnessContrast>

        <HueSaturation hue={hue} saturation={saturation}></HueSaturation> */}

        <ChromaticAberration
          offset={[diff * offsetX, diff * offsetY]}
        ></ChromaticAberration>

        {/* <SSR></SSR> */}

        {/* <LUT lut={texture}></LUT> */}

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
