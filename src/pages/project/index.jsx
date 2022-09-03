import { useRouter } from 'next/router'

export default function StudioHome() {
  let router = useRouter()
  return (
    <div>
      <div className='absolute w-full h-full'>
        {/* <!-- Mobile --> */}
        <nav className='w-full mx-auto bg-white shadow'>
          <div className='container flex items-center justify-between h-16 px-6 mx-auto lg:items-stretch'>
            <div className='flex items-center h-full'>
              <div
                aria-label='Home'
                role='img'
                className='flex items-center mr-10'
              >
                <img
                  src='https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg1.svg'
                  alt='logo'
                />
                <a href='/'>
                  <h3 className='hidden ml-3 text-base font-bold leading-tight tracking-normal text-gray-800 lg:block'>
                    Agape
                  </h3>
                </a>
              </div>
              <ul className='items-center hidden h-full pr-12 xl:flex'>
                <li className='flex items-center h-full text-sm tracking-normal text-indigo-700 border-b-2 border-indigo-700 cursor-pointer hover:text-indigo-700'>
                  <a href='/editor'> My Projects</a>
                </li>
                {/* <li className='flex items-center h-full mx-10 text-sm t=racking-normal cursor-pointer hover:text-indigo-700 text-gry-800'>
                  <a href='#'>Products</a>
                </li>
                <li className='flex items-center h-full mr-10 text-sm tracking-normal cursor-pointer hover:text-indigo-700 text-gry-800'>
                  <a href='#'>Performance</a>
                </li>
                <li className='flex items-center h-full text-sm tracking-normal text-gray-800 cursor-pointer hover:text-indigo-700'>
                  <a href='#'>Deliverables</a>
                </li> */}
              </ul>
            </div>

            <div className='flex items-center visible xl:hidden'>
              <div></div>
            </div>
          </div>
        </nav>
        {/*  */}
        <div className='container flex flex-col items-start justify-between px-6 pb-6 mx-auto my-12 border-b border-gray-300 lg:flex-row lg:items-center'>
          <div>
            <h4 className='text-2xl font-bold leading-tight text-gray-800'>
              Effect Node - WebNative 3D Engine
            </h4>
          </div>
          <div className='mt-6 lg:mt-0'>
            <a href='/'>
              <button className='px-6 py-2 mx-2 my-2 text-sm text-indigo-700 bg-white rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white hover:bg-gray-100'>
                Back to Home
              </button>
            </a>
          </div>
        </div>
        {/* <!-- Page title ends --> */}
        <div className='container px-6 mx-auto'>
          <div className='w-full '>
            {/*  */} {/*  */}
            {/*  */}
            {/*  */}
            <div>123</div>
          </div>
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}
