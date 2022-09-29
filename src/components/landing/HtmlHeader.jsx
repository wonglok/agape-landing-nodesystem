import { Core } from '@/helpers/Core'
import { useScrollStore } from '@/helpers/useScrollStore'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { useRef } from 'react'
import { YoCanvas } from './YoCanvas'

/* eslint-disable @next/next/no-img-element */
export function HtmlHeader() {
  return (
    <>
      <section>
        <nav className='fixed top-0 z-50 flex flex-wrap items-center justify-between w-full  bg-black shadow-lg bg-opacity-50'>
          <div className='flex flex-col items-center justify-center w-full py-4 text-sm text-white bg-black lg:flex-row'>
            <div className='mr-3'>AGAPE ENGINE ALPHA PASS</div>
            <a href='/'>
              <img
                src={`/site/navbar/alpha-pass.svg`}
                className={'h-8 mt-3 lg:mt-0'}
                alt={'effectnode-alpha-pass'}
              />
            </a>
          </div>

          <div className='container flex flex-wrap items-center justify-center px-4 mx-auto '>
            <div className='relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
              <a
                className='inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase whitespace-nowrap text-slate-200'
                href='/learning-lab/tailwind-starter-kit/presentation'
              >
                Agape Effect Node 3D Engine
              </a>
              <button
                className='block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none'
                type='button'
              >
                <i className='fas fa-bars'></i>
              </button>
            </div>

            <div
              className='items-center flex-grow hidden lg:flex'
              id='example-navbar-danger'
            >
              <ul className='flex flex-col list-none lg:flex-row lg:ml-auto'>
                <li className='nav-item'>
                  <a
                    href='https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation'
                    className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
                    target='_blank'
                    rel='noreferrer'
                  ></a>
                </li>
                <li className='nav-item'>
                  <a
                    href='https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation'
                    className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='text-lg fab fa-facebook-square leading-lg text-slate-400'></i>
                    <span className='ml-2'>Share</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='https://twitter.com/intent/tweet?text=Check%20Tailwind%20Starter%20Kit%2C%20a%20beautiful%20extension%20of%20%23TailwindCSS%20made%20by%20%40CreativeTim%20%23webdesign%20%23starterkit&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Flearning-lab%2Ftailwind-starter-kit%23%2Fpresentation'
                    className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='text-lg fab fa-twitter leading-lg text-slate-400'></i>
                    <span className='ml-2'>Tweet</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='flex items-center px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-slate-500'
                    href='/learning-lab/tailwind-starter-kit/documentation/quick-start'
                  >
                    <i className='text-lg far fa-file-alt leading-lg text-slate-400'></i>
                    <span className='ml-2'>Docs</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className='flex items-center px-3 py-2 text-xs font-bold uppercase download-button text-slate-200 hover:text-slate-500'
                    href='/learning-lab/tailwind-starter-kit/documentation/download'
                  >
                    <i className='text-lg fas fa-arrow-alt-circle-down leading-lg text-slate-400'></i>
                    <span className='ml-2'>Download</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='https://github.com/creativetimofficial/tailwind-starter-kit/archive/designer-files.zip?ref=tsk-navbar'
                    className='flex items-center px-3 py-2 text-xs font-bold uppercase download-button text-slate-200 hover:text-slate-500'
                  >
                    <i className='text-lg fab fa-sketch leading-lg text-slate-400'></i>
                    <span className='ml-2'>Download Designer</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <section
          className='relative flex items-center h-screen pt-16 bg-black header bg-opacity-0'
          data-style='max-height: 860px'
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,1.0), rgba(0,0,0,0.3))`,
            height: `100vh`,
          }}
        >
          <div className='absolute bottom-0 left-0 flex items-center justify-center w-full mb-3 text-center text-white'>
            <IconLoader></IconLoader>
          </div>
        </section>
        <section
          className='relative flex items-center h-screen pt-16 bg-black header bg-opacity-0'
          data-style='max-height: 860px'
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.0))`,
            height: `calc(100vh + 120px)`,
          }}
        >
          <div className='container flex flex-wrap items-center justify-center mx-auto'>
            <div className='w-10/12 mb-32'>
              <div className='flex flex-col items-center justify-center pb-32'>
                <img src={`/site/hero/your_world.png`} alt={'title'} />
              </div>
              <div className='pb-32 text-center sm:pt-0'>
                <div className='flex flex-col items-center justify-center'>
                  <img src={`/site/hero/agape.png`} alt={'hero'} />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center pb-8'>
                <img src={`/site/hero/unreal.png`} alt={'title'} />
              </div>
              <div className='flex flex-col items-center justify-center pb-8'>
                <img
                  src={`/site/hero/allow_you_to_create.png`}
                  alt={'allow_you_to_create'}
                />
              </div>
              <div className='flex flex-col items-center justify-center pb-24'>
                <img
                  src={`/site/hero/3d_assets_metaverse.png`}
                  alt={'allow_you_to_create'}
                />
              </div>
              <div className='flex flex-col items-center justify-center pb-64'>
                <img src={`/site/hero/cta.png`} alt={'allow_you_to_create'} />
              </div>

              {/*  */}
            </div>
          </div>
        </section>

        <section className='relative pb-40  bg-black bg-opacity-75'>
          <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full'
            data-style='height: 80px'
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='text-black opacity-75 fill-current'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
          <div className='container mx-auto'>
            <div className='flex flex-wrap items-center'>
              <div className='w-10/12 ml-auto mr-auto -mt-32 lg:px-12 md:w-6/12 lg:w-4/12 md:px-4'>
                <Parallax>
                  <div className='relative flex flex-col w-full min-w-0 mb-6 break-words border-4 border-pink-600 rounded-lg shadow-lg'>
                    <div className='w-full align-middle  rounded-t-lg backdrop-blur-lg'>
                      <YoCanvas></YoCanvas>
                    </div>
                    <blockquote className='relative p-8 bg-pink-600 '>
                      <svg
                        preserveAspectRatio='none'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 583 95'
                        className='absolute left-0 block w-full'
                        style={{
                          height: '95px',
                          top: '-94px',
                        }}
                      >
                        <polygon
                          points='-30,95 583,95 583,65'
                          className='text-pink-600 fill-current'
                        ></polygon>
                      </svg>
                      <h4 className='text-xl font-bold text-white'>
                        A Bridge from Blender to the Web
                      </h4>
                      <p className='mt-2 font-light text-white text-md'>
                        Agape Effect Node tools not only bring your 3D assets to
                        the web, but also empower them to carry VFX, animation
                        across metaverses and different chains
                      </p>
                    </blockquote>
                  </div>
                </Parallax>
              </div>
              <div className='w-full px-4 md:w-6/12'>
                <div className='flex flex-wrap'>
                  <div className='w-full px-4 md:w-6/12'>
                    <div className='relative flex flex-col mt-4 text-white'>
                      <div className='flex-auto px-4 py-5 '>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/realtime-web-editor.svg`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Realtime Web Editor
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-3 text-slate-300'>
                            What you see and what you get
                          </li>
                          <li className='mb-4 text-slate-300'>
                            For you create VFX and simulations, materials and
                            more…
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className='relative flex flex-col min-w-0 text-white'>
                      <div className='flex-auto px-4 py-5'>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/realtime-web-editor.svg`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Web Native Rendering
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-3 text-slate-300'>
                            Fast for Mobile Deployment and Iteration
                          </li>
                          <li className='mb-4 text-slate-300'>
                            Quick Development
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className='w-full px-4 text-white md:w-6/12'>
                    <div className='relative flex flex-col min-w-0'>
                      <div className='flex-auto px-4 py-5'>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/interotable.png`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Interotablity
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-4 text-slate-300'>
                            Portable VFX Content Runnable Across Metaverse
                          </li>
                          <li className='mb-3 text-slate-300'>
                            {/*  */}
                            {/*  */}
                            Embeded VFX JSON in GLB with a OpenSourced Metaverse
                            Runtime
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className='relative flex flex-col min-w-0'>
                      <div className='flex-auto px-4 py-5'>
                        <div className='inline-flex items-center justify-center mb-5 shadow-lg w-14 h-14 text-centerrounded-full'>
                          <img
                            className='w-full'
                            src={`/site/bridge/realtime-web-editor.svg`}
                          />
                        </div>
                        <h6 className='mb-1 text-xl font-semibold'>
                          Creative Econoomy
                        </h6>
                        <ol className='pl-5 list-disc'>
                          <li className='mb-3 text-slate-300'>
                            Fair Trade and Affordable Metaverse Ownership for
                            All
                          </li>
                          <li className='mb-3 text-slate-300'>
                            Low Entry Barrier
                          </li>
                          <li className='mb-3 text-slate-300'>
                            Open Economy for GLB Centric Creative Content
                          </li>
                          <li className='mb-4 text-slate-300'>
                            You can sell VFX shoes and buyer can use it in all
                            compatible metaverses.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container pb-20 mx-auto overflow-hidden'>
            <div className='flex flex-wrap items-center'>
              <div className='w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4'>
                <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                  <i className='text-xl fas fa-sitemap'></i>
                </div>
                <h3 className='mb-2 text-3xl font-semibold leading-normal'>
                  CSS Components
                </h3>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-600'>
                  Every element that you need in a product comes built in as a
                  component. All components fit perfectly with each other and
                  can have different colours.
                </p>
                <div className='block pb-6'>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Buttons
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Inputs
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Labels
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Menus
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Navbars
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Pagination
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Progressbars
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Typography
                  </span>
                </div>
                <a
                  className='font-bold text-slate-700 hover:text-slate-500 ease-linear transition-all duration-150'
                  href='/learning-lab/tailwind-starter-kit/documentation/css/alerts'
                >
                  View All
                  <i className='ml-1 leading-relaxed fa fa-angle-double-right'></i>
                </a>
              </div>
              <div className='w-full px-4 mt-32 ml-auto mr-auto md:w-5/12'>
                <div className='relative flex flex-col w-full min-w-0 mt-48 mb-6 md:mt-0'>
                  <img
                    alt='...'
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/component-btn.png'
                    className='absolute w-full align-middle rounded shadow-lg'
                    data-style='max-width: 100px; left: 145px; top: -29px; z-index: 3'
                    style={{
                      maxWidth: '100px',
                      top: '-29',
                      left: '145px',
                    }}
                  />
                  <img
                    alt='...'
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/component-profile-card.png'
                    className='absolute w-full align-middle rounded-lg shadow-lg'
                    data-style='max-width: 210px; left: 260px; top: -160px'
                    style={{
                      maxWidth: '210px',
                      top: '-160px',
                      left: '260px',
                    }}
                  />
                  <img
                    alt='...'
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/component-info-card.png'
                    className='absolute w-full align-middle rounded-lg shadow-lg'
                    data-style='max-width: 180px; left: 40px; top: -225px; z-index: 2'
                    style={{
                      maxWidth: '180px',
                      top: '-225px',
                      left: '40px',
                      zIndex: 2,
                    }}
                  />
                  <img
                    alt='...'
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/component-info-2.png'
                    className='absolute w-full align-middle rounded-lg shadow-2xl'
                    data-style='max-width: 200px; left: -50px; top: 25px'
                    style={{
                      maxWidth: '200px',
                      top: '25px',
                      left: '-50px',
                    }}
                  />
                  <img
                    alt='...'
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/component-menu.png'
                    className='absolute w-full align-middle rounded shadow-lg'
                    data-style='max-width: 580px; left: -20px; top: 210px'
                    style={{
                      maxWidth: '580px',
                      top: '210px',
                      left: '-20px',
                    }}
                  />

                  <img
                    alt='...'
                    src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/component-btn-pink.png'
                    className='absolute w-full align-middle rounded shadow-xl'
                    data-style='max-width: 120px; left: 195px; top: 95px'
                    style={{
                      maxWidth: '120px',
                      top: '95px',
                      left: '195px',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-wrap items-center pt-32'>
              <div className='w-full px-4 mt-32 ml-auto mr-auto md:w-6/12'>
                <div className='relative flex flex-wrap justify-center'>
                  <div className='w-full px-4 my-4 lg:w-6/12'>
                    <div className='p-8 text-center rounded-lg shadow-lg bg-sky-500'>
                      <img
                        alt='...'
                        className='w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md'
                        src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg'
                      />
                      <p className='mt-4 text-lg font-semibold text-white'>
                        ReactJS
                      </p>
                      <p className='mt-2 text-base text-white opacity-75'>
                        A JavaScript library for building user interfaces
                        maintaned by Facebook and community of developers.
                      </p>
                    </div>
                    <div className='p-8 mt-8 text-center rounded-lg shadow-lg bg-emerald-500'>
                      <img
                        alt='...'
                        className='w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md'
                        src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg'
                      />
                      <p className='mt-4 text-lg font-semibold text-white'>
                        Vue.js
                      </p>
                      <p className='mt-2 text-base text-white opacity-75'>
                        An open-source Model–view–viewmodel JavaScript framework
                        for building user interfaces.
                      </p>
                    </div>
                  </div>
                  <div className='w-full px-4 my-4 lg:w-6/12 lg:mt-16'>
                    <div className='p-8 text-center bg-orange-500 rounded-lg shadow-lg'>
                      <img
                        alt='...'
                        className='w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md'
                        src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png'
                      />
                      <p className='mt-4 text-lg font-semibold text-white'>
                        JavaScript
                      </p>
                      <p className='mt-2 text-base text-white opacity-75'>
                        Object-oriented programming language that conforms to
                        the ECMAScript specification.
                      </p>
                    </div>
                    <div className='p-8 mt-8 text-center bg-red-600 rounded-lg shadow-lg'>
                      <img
                        alt='...'
                        className='w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md'
                        src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg'
                      />
                      <p className='mt-4 text-lg font-semibold text-white'>
                        Angular
                      </p>
                      <p className='mt-2 text-base text-white opacity-75'>
                        a JavaScript-based open-source front-end web framework
                        mainly maintained by Google.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4'>
                <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                  <i className='text-xl fas fa-drafting-compass'></i>
                </div>
                <h3 className='mb-2 text-3xl font-semibold leading-normal'>
                  Javascript Components
                </h3>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-600'>
                  In order to create a great User Experience some components
                  require JavaScript. In this way you can manipulate the
                  elements on the page and give more options to your users.
                </p>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-600'>
                  We created a set of Components that are dynamic and come to
                  help you.
                </p>
                <div className='block pb-6'>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Alerts
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Dropdowns
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Menus
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Modals
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Navbars
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Popovers
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Tabs
                  </span>
                  <span className='inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-slate-500 last:mr-0'>
                    Tooltips
                  </span>
                </div>
                <a
                  className='font-bold text-slate-700 hover:text-slate-500 ease-linear transition-all duration-150'
                  href='/learning-lab/tailwind-starter-kit/documentation/vue/alerts'
                >
                  View all
                  <i className='ml-1 leading-relaxed fa fa-angle-double-right'></i>
                </a>
              </div>
            </div>
          </div>
          <div className='container px-4 pt-48 pb-32 mx-auto'>
            <div className='flex flex-wrap items-center'>
              <div className='w-full px-12 ml-auto md:w-5/12 md:px-4'>
                <div className='md:pr-12'>
                  <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                    <i className='text-xl fas fa-file-alt'></i>
                  </div>
                  <h3 className='text-3xl font-semibold'>
                    Complex Documentation
                  </h3>
                  <p className='mt-4 text-lg leading-relaxed text-slate-500'>
                    {`This extension comes a lot of fully coded examples that help
                    you get started faster. You can adjust the colors and also
                    the programming language. You can change the text and images
                    and you're good to go.`}
                  </p>
                  <ul className='mt-6 list-none'>
                    <li className='py-2'>
                      <div className='flex items-center'>
                        <div>
                          <span className='inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-slate-500 bg-slate-50'>
                            <i className='fas fa-fingerprint'></i>
                          </span>
                        </div>
                        <div>
                          <h4 className='text-slate-500'>
                            Built by Developers for Developers
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className='py-2'>
                      <div className='flex items-center'>
                        <div>
                          <span className='inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-slate-500 bg-slate-50'>
                            <i className='fab fa-html5'></i>
                          </span>
                        </div>
                        <div>
                          <h4 className='text-slate-500'>
                            Carefully crafted code for Components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className='py-2'>
                      <div className='flex items-center'>
                        <div>
                          <span className='inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-slate-500 bg-slate-50'>
                            <i className='far fa-paper-plane'></i>
                          </span>
                        </div>
                        <div>
                          <h4 className='text-slate-500'>
                            Dynamic Javascript Components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='w-full px-4 pt-24 mr-auto md:w-6/12 md:pt-0'>
                <img
                  alt='...'
                  className='max-w-full rounded-lg shadow-xl'
                  data-style='
              transform: scale(1) perspective(1040px) rotateY(-11deg)
                rotateX(2deg) rotate(2deg);
            '
                  src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/documentation.png'
                />
              </div>
            </div>
          </div>

          <div className='flex flex-wrap justify-center mt-24 text-center'>
            <div className='w-full px-12 md:w-6/12 md:px-4'>
              <h2 className='text-4xl font-semibold'>
                Beautiful Example Pages
              </h2>
              <p className='mt-4 mb-4 text-lg leading-relaxed text-slate-500'>
                Tailwind Starter Kit is a completly new product built using our
                past experience in web templates. Take the examples we made for
                you and start playing with them.
              </p>
            </div>
          </div>
          <div className='container mx-auto mt-24'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full px-4 lg:w-12/12'>
                <div className='flex flex-wrap'>
                  <div className='w-full px-4 lg:w-4/12'>
                    <h5 className='pb-4 text-xl font-semibold text-center'>
                      Login Page
                    </h5>
                    <div className='relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg hover:-mt-4 ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='h-auto max-w-full align-middle border-none rounded-lg'
                        src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/login.jpg'
                      />
                    </div>
                  </div>
                  <div className='w-full px-4 lg:w-4/12'>
                    <h5 className='pb-4 text-xl font-semibold text-center'>
                      Profile Page
                    </h5>
                    <div className='relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg hover:-mt-4 ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='h-auto max-w-full align-middle border-none rounded-lg'
                        src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/profile.jpg'
                      />
                    </div>
                  </div>
                  <div className='w-full px-4 lg:w-4/12'>
                    <h5 className='pb-4 text-xl font-semibold text-center'>
                      Landing Page
                    </h5>
                    <div className='relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg hover:-mt-4 ease-linear transition-all duration-150'>
                      <img
                        alt='...'
                        className='h-auto max-w-full align-middle border-none rounded-lg'
                        src='https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/landing.jpg'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='relative py-20  bg-slate-600 bg-opacity-70'>
          {/* <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full'
            style={{ height: '80px', top: '-80px' }}
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='fill-current text-slate-600'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div> */}

          <div className='container pb-64 mx-auto'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full px-12 ml-auto mr-auto md:w-5/12 md:px-4 md:mt-64'>
                <div className='inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-slate-500'>
                  <i className='text-xl fas fa-code-branch'></i>
                </div>
                <h3 className='mb-2 text-3xl font-semibold leading-normal text-white'>
                  Open Source
                </h3>
                <p className='mt-4 mb-4 text-lg font-light leading-relaxed text-slate-400'>
                  Since
                  <a
                    href='https://tailwindcss.com/'
                    className='text-slate-300'
                    target='_blank'
                    rel='noreferrer'
                  >
                    TailwindCSS
                  </a>
                  is an open source project we wanted to continue this movement
                  too. You can give this version a try to feel the design and
                  also test the quality of the code!
                </p>
                <p className='mt-0 mb-4 text-lg font-light leading-relaxed text-slate-400'>
                  Get it free on Github and please help us spread the news with
                  a Star!
                </p>
                <a
                  href='https://github.com/creativetimofficial/tailwind-starter-kit'
                  target='_blank'
                  className='inline-block px-6 py-4 mt-4 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none github-star focus:outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg'
                  rel='noreferrer'
                >
                  Github Star
                </a>
              </div>
              <div className='relative w-full px-4 mt-32 ml-auto mr-auto md:w-4/12'>
                <i
                  className='fab fa-github text-slate-700'
                  data-style='
              font-size: 55em;
              position: absolute;
              top: -150px;
              right: -100%;
              left: auto;
              opacity: 0.8;
            '
                ></i>
              </div>
            </div>
          </div>
        </section>
        {/*  */}
        <section className='relative pt-32 pb-16  bg-slate-600 bg-opacity-70'>
          {/* <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full '
            data-style='height: 80px'
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='opacity-50 fill-current text-slate-200'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div> */}
          {/* bg-opacity-80 */}
          <div className='container mx-auto '>
            <div className='relative z-10 flex flex-wrap justify-center px-12 py-16 -mt-64 bg-white rounded-lg shadow-xl '>
              <div className='w-full text-center lg:w-8/12'>
                <p className='text-4xl text-center'>
                  <span role='img' aria-label='love'>
                    😍
                  </span>
                </p>
                <h3 className='text-3xl font-semibold'>
                  Do you love this Starter Kit?
                </h3>
                <p className='mt-4 mb-4 text-lg leading-relaxed text-slate-500'>
                  Cause if you do, it can be yours now. Hit the buttons below to
                  navigate to get the Free version for your next project. Build
                  a new web app or give an old project a new look!
                </p>
                <div className='flex flex-col mt-10 sm:block'>
                  <a
                    className='px-6 py-4 mb-2 mr-1 text-sm font-bold text-white uppercase bg-pink-500 rounded shadow outline-none get-started focus:outline-none active:bg-pink-600 hover:shadow-lg ease-linear transition-all duration-150'
                    href='/learning-lab/tailwind-starter-kit/documentation/quick-start'
                  >
                    Get started
                  </a>
                  <a
                    href='https://github.com/creativetimofficial/tailwind-starter-kit'
                    target='_blank'
                    className='px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none github-star sm:ml-1 focus:outline-none bg-slate-700 active:bg-slate-600 hover:shadow-lg'
                    rel='noreferrer'
                  >
                    <i className='mr-1 text-lg fab fa-github'></i>
                    <span>Help With a Star</span>
                  </a>
                </div>
                <div className='mt-16 text-center'></div>
              </div>
            </div>
          </div>
        </section>
        <footer className='relative pt-8 pb-6 bg-slate-200 bg-opacity-80'>
          <div
            className='absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none'
            data-style='height: 80px'
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='fill-current text-slate-200'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
          <div className='container px-4 pt-24 mx-auto'>
            <div className='flex flex-wrap'>
              <div className='w-full px-4 md:w-6/12'>
                <h4 className='text-3xl font-semibold'>{`Let's keep in touch!`}</h4>
                <h5 className='mt-0 mb-2 text-lg text-slate-600'>
                  Find us on any of these platforms, we respond 1-2 business
                  days.
                </h5>
                <div className='mt-6'>
                  <a
                    href='https://www.twitter.com/creativetim'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='items-center justify-center inline-block p-3 mr-2 text-center bg-white rounded-full shadow-lg outline-none fab fa-twitter text-sky-400 font-lg align-center focus:outline-none'></i>
                  </a>
                  <a
                    href='https://www.facebook.com/creativetim'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='items-center justify-center inline-block p-3 mr-2 text-center bg-white rounded-full shadow-lg outline-none fab fa-facebook-square text-sky-600 font-lg align-center focus:outline-none'></i>
                  </a>
                  <a
                    href='https://www.dribbble.com/creativetim'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='items-center justify-center inline-block p-3 mr-2 text-center text-pink-400 bg-white rounded-full shadow-lg outline-none fab fa-dribbble font-lg align-center focus:outline-none'></i>
                  </a>
                  <a
                    href='https://www.github.com/creativetimofficial'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='items-center justify-center inline-block p-3 mr-2 text-center bg-white rounded-full shadow-lg outline-none fab fa-github text-slate-800 font-lg align-center focus:outline-none'></i>
                  </a>
                </div>
                <p className='mt-6 text-sm font-semibold text-slate-500'>
                  Currently v1.1.0. Code
                  <a
                    href='https://github.com/creativetimofficial/tailwind-starter-kit'
                    className='text-slate-600'
                    target='_blank'
                    rel='noreferrer'
                  >
                    licensed MIT
                  </a>
                  , docs
                  <a
                    href='https://creativecommons.org/licenses/by/4.0/'
                    targe='_blank'
                    className='text-slate-600'
                  >
                    CC BY 4.0
                  </a>
                  .
                </p>
              </div>
              <div className='w-full px-4 md:w-6/12'>
                <div className='flex flex-wrap mb-6 items-top'>
                  <div className='w-full pt-6 ml-auto md:w-6/12 xl:w-4/12 md:pt-0 md:px-4'>
                    <span className='block mb-2 text-sm font-semibold uppercase text-slate-500'>
                      Useful Links
                    </span>
                    <ul className='list-unstyled'>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://www.creative-tim.com/presentation'
                          target='_blank'
                          rel='noreferrer'
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://creative-tim.com/blog'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://www.github.com/creativetimofficial/tailwind-starter-kit'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Github
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://www.creative-tim.com/bootstrap-themes/free'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Free Products
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='w-full pt-6 ml-auto md:w-6/12 xl:w-4/12 md:pt-0 md:px-4'>
                    <span className='block mb-2 text-sm font-semibold uppercase text-slate-500'>
                      Other Resources
                    </span>
                    <ul className='list-unstyled'>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://github.com/creativetimofficial/tailwind-starter-kit/blob/master/LICENSE.md'
                          target='_blank'
                          rel='noreferrer'
                        >
                          MIT License
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://creative-tim.com/terms'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://creative-tim.com/privacy'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          className='block pb-2 text-sm font-semibold text-slate-600 hover:text-slate-800'
                          href='https://creative-tim.com/contact-us'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-6 border-slate-300' />
            <div className='flex flex-wrap items-center justify-center md:justify-between'>
              <div className='w-full px-4 mx-auto text-center md:w-4/12'>
                <div className='py-1 text-sm font-semibold text-slate-500'>
                  <a
                    href='https://www.creative-tim.com'
                    className='text-slate-500 hover:text-slate-800'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  )
}

function Parallax({ children }) {
  let ref = useRef()
  useEffect(() => {
    //
    //
    return useScrollStore.subscribe((nst, pst) => {
      //smooth

      console.log(nst.smooth)

      let v = ((0.35 - nst.smooth) / 0.1) * 50.0

      // if (v >= 30) {
      //   v = 30.0
      // }
      // if (v <= -30) {
      //   v = -30.0
      // }

      ref.current.style.transform = `perspective(800px) rotateY(${v}deg) rotateX(${20}deg)`
      ref.current.style.transition = `all 0.5s`

      //
      // console.log(nst.px)
    })
    //
  }, [children])
  return (
    <div className='' ref={ref}>
      {children}
    </div>
  )
}

function IconLoader() {
  let ref = useRef()

  useEffect(() => {
    //
    //
    return useScrollStore.subscribe((nst, pst) => {
      //smooth
      let v = nst.smoothPX / 150
      if (v >= 1.0) {
        v = 1.0
      }
      ref.current.style.opacity = 1.0 - v

      //
      // console.log(nst.smoothPX)
    })
    //
  }, [])
  return (
    <div ref={ref} className='container-chev -translate-y-24'>
      <div className='chevron'></div>
      <div className='chevron'></div>
      <div className='chevron'></div>
    </div>
  )
}
