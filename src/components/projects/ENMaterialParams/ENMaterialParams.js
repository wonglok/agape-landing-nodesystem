import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENMaterialParams() {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)

  return (
    <div>
      <div>{activeSceneSelection?.material?.type}</div>
      {(activeSceneSelection?.material?.type === 'MeshPhysicalMaterial' ||
        activeSceneSelection?.material?.type === 'MeshStandardMaterial') && (
        <div>
          {/*  */}

          <div>{JSON.stringify(activeSceneSelection?.material)}</div>
          <div>{JSON.stringify(activeSceneSelection?.material)}</div>
          {/*  */}
          {/*  */}
        </div>
      )}
    </div>
  )
}
