import { useGLBEditor } from '@/helpers/useGLBEditor'
import { ENFCommonMaterial } from './ENFCommonMaterial'
import { ENFColor } from './Fields/ENFColor'

export function ENMaterialParams() {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)

  return (
    <>
      {(activeSceneSelection?.material?.type === 'MeshPhysicalMaterial' ||
        activeSceneSelection?.material?.type === 'MeshStandardMaterial') && (
        <div className='w-full'>
          {/*  */}
          {/*  */}
          <div id='ENFCommonMaterial01'></div>
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
