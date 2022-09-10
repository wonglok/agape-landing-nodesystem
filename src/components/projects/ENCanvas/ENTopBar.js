import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENTopBarr() {
  let switchMode = useGLBEditor((s) => s.switchMode)
  let editorNavigationMode = useGLBEditor((s) => s.editorNavigationMode)
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
      {/*  */}
      {/*  */}

      <div className='absolute top-0 right-0 z-10'>
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
