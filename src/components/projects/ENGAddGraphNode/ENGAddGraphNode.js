//

import codes from '@/effectnode/store/codes'

export function ENGAddGraphNode() {
  return (
    <>
      <div className='w-full h-full backdrop-blur-lg'>
        <div className='flex items-center w-full h-8 pl-2 bg-yellow-300 border-b border-yellow-200'>
          Add Modules
        </div>
        <div className='p-2'>
          {codes.map((e) => {
            return <div key={e.key}>{e.title}</div>
          })}
        </div>
        {/*  */}
      </div>
    </>
  )
}

//
