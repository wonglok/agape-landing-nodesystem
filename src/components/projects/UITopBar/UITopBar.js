import { useGLBEditor } from '@/helpers/useGLBEditor'

export function UITopBar() {
  let currentFolder = useGLBEditor((s) => s.currentFolder)

  return (
    <div className='flex items-center justify-between h-6 p-1 px-2 text-xs bg-gray-200'>
      <div className='inline-flex items-center justify-start w-1/3'>
        {/*  */}
        123
      </div>
      <div className='inline-flex items-center justify-center w-1/3'>
        {currentFolder?.handle?.name}
      </div>
      <div className='inline-flex items-center justify-end w-1/3'>123</div>
    </div>
  )
}
