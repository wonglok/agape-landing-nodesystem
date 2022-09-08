import { ENPNodeDetail } from '../ENPNodeDetail/ENPNodeDetail'

export function ENParams() {
  return (
    <div className='w-full h-full bg-white'>
      <div className='flex items-center'>
        <div className='p-1 mr-1 bg-gray-200'>Uniforms</div>
        <div className='p-1 mr-1 bg-gray-200'>Life</div>
      </div>
      {
        <div>
          <ENPNodeDetail></ENPNodeDetail>
        </div>
      }
    </div>
  )
}
