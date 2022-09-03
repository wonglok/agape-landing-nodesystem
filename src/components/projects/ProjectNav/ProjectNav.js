import Link from 'next/link'
import { useRouter } from 'next/router'

export function ProjectNav() {
  let router = useRouter()

  let activeClass =
    'mr-4 flex items-center h-full text-sm tracking-normal text-indigo-700 border-b-2 border-indigo-700 cursor-pointer hover:text-indigo-700'
  let readyClass =
    'mr-4 flex items-center h-full text-sm cursor-pointer tracking-normal border-b-2  border-transparent hover:text-indigo-700 text-gry-800'
  return (
    <>
      <div aria-label='Home' role='img' className='flex items-center mr-10'>
        <img
          src='https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg1.svg'
          alt='logo'
        />
        <Link href='/project'>
          <h3 className='hidden ml-3 text-base font-bold leading-tight tracking-normal text-gray-800 lg:block'>
            Agape WebNative 3D Engine
          </h3>
        </Link>
      </div>
      <ul className='items-center hidden h-full pr-12 xl:flex'>
        <Link href='/project'>
          <li
            className={
              router.pathname === '/project' ? activeClass : readyClass
            }
          >
            <span>My Projects</span>
          </li>
        </Link>

        <Link href='/project/resource'>
          <li
            className={
              router.pathname === '/project/resource' ? activeClass : readyClass
            }
          >
            <span>3D Resrouces</span>
          </li>
        </Link>

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
    </>
  )
}

//
//
