import { useGLBEditor } from '@/helpers/useGLBEditor'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export function ENTopBarr() {
  let switchMode = useGLBEditor((s) => s.switchMode)
  let editorNavigationMode = useGLBEditor((s) => s.editorNavigationMode)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let setSelection = useGLBEditor((s) => s.setSelection)
  return (
    <>
      <div className='absolute top-0 left-0'>
        <button
          className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
            editorNavigationMode === 'meta' ? 'bg-green-300' : 'bg-white'
          }`}
          onClick={() => {
            switchMode('meta')
          }}
        >
          Collider Mode
        </button>
        <button
          className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
            editorNavigationMode === 'floor' ? 'bg-green-300' : 'bg-white'
          }`}
          onClick={() => {
            switchMode('floor')
          }}
        >
          Flat Floor Mode
        </button>
        {/*  */}
        {/* <button
        className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
          editorNavigationMode === 'avatar' ? 'bg-green-300' : 'bg-white'
        }`}
        onClick={() => {
          switchMode('avatar')
        }}
      >
        Avatar Mode
      </button> */}
        <button
          className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
            editorNavigationMode === 'orbit' ? 'bg-green-300' : 'bg-white'
          }`}
          onClick={() => {
            switchMode('orbit')
          }}
          //
        >
          Orbit Mode
        </button>
      </div>

      {/*  */}

      <div className='absolute top-0 right-0 z-10 p-1'>
        {activeSceneSelection && (
          <div>
            {activeSceneSelection.type === 'Mesh' && (
              <button
                className='p-1 mb-1 mr-1 bg-white'
                onClick={() => {
                  //

                  let cloned = clone(activeSceneSelection)

                  activeSceneSelection.parent.add(cloned)

                  cloned.position.x += 0.1
                  cloned.position.z += 0.1
                  setSelection(cloned)
                }}
              >
                Duplicate
              </button>
            )}

            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                if (window.confirm('remove?')) {
                  activeSceneSelection.removeFromParent()
                  setSelection(false)
                }
              }}
            >
              Remove
            </button>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('useTranslate', { detail: {} })
                )
              }}
            >
              Translate
            </button>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('useScale', { detail: {} })
                )
              }}
            >
              Scale
            </button>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('useRotation', { detail: {} })
                )
              }}
            >
              Rotation
            </button>
          </div>
        )}

        {/* <button
          onClick={() => {
            //
          }}
          className='inline-block p-1 m-1 bg-white cursor-pointer select-none'
        >
          HDR
        </button> */}
      </div>
    </>
  )
}
