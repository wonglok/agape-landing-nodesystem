import { useGLBEditor } from '@/helpers/useGLBEditor'
import { ENFCommonMaterial } from './ENFCommonMaterial'

export function ENMaterialParams() {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)

  return (
    <>
      {activeSceneSelection?.material?.type === 'MeshPhysicalMaterial' ||
      activeSceneSelection?.material?.type === 'MeshStandardMaterial' ? (
        <div className='w-full'>
          {/*  */}
          {/*  */}
          <ENFCommonMaterial
            material={activeSceneSelection?.material}
          ></ENFCommonMaterial>
          {/*  */}
          {/*  */}
          {/* <div className='w-full whitespace-pre-wrap'>
            {JSON.stringify(activeSceneSelection?.material, null, '  ')}
          </div> */}
          {/*  */}
          {/*  */}
        </div>
      ) : (
        <div className='p-2 m-2 bg-yellow-400'>
          Mesh Stanadard / Physical Materail Not Found in the current selection
        </div>
      )}
    </>
  )
}

//

//

//

//

//

//
