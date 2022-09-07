export function EffectNodeRuntime({ glbRoot, glbRaw }) {
  glbRoot.scene.updateMatrixWorld(true)

  useEffect(() => {
    getPosMD5(glbRoot)
    if (glbRaw) {
      getPosMD5(glbRaw)
    }
  }, [glbRoot, glbRaw])

  //
  return (
    <group>
      {/*  */}
      {/*  */}
    </group>
  )
}
