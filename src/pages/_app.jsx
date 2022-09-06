import '@/styles/index.css'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '@/config'
import { Multiverse } from '@/components/layout/Multiverse'
import { useSystemStore } from '@/helpers/useSystemStore'
import { PromotePage } from '@/components/layout/PromotePage'
import { Loader } from '@react-three/drei'

function App({ Component, pageProps = { title: 'index', sceneName: false } }) {
  const router = useRouter()
  const setRouter = useSystemStore((s) => s.setRouter)

  useEffect(() => {
    setRouter({ router })
  }, [router, setRouter])

  return (
    <>
      <Header title={pageProps.title} />

      {router && (
        <>
          {Component.layout === 'Multiverse' && (
            <>
              <Multiverse router={router} {...pageProps}>
                <Component router={router} {...pageProps}></Component>
              </Multiverse>
              <Loader />
            </>
          )}
          {Component.layout === 'PromotePage' && (
            <PromotePage router={router} {...pageProps}>
              <Component router={router} {...pageProps}></Component>
            </PromotePage>
          )}

          {typeof Component.layout === 'undefined' && (
            <Component router={router} {...pageProps}></Component>
          )}

          {typeof Component.SEO !== 'undefined' && (
            <Component.SEO router={router} {...pageProps}></Component.SEO>
          )}

          <span
            style={{
              display: 'block',
              position: 'absolute',
              zIndex: 10,
            }}
            id='myroot'
          ></span>
        </>
      )}
    </>
  )
}

export default App
