import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '@/config'
import '@/styles/index.css'
import CanvasLayout from '@/components/layout/CanvasLayout'
import { useSystemStore } from '@/helpers/useSystemStore'

function App({ Component, pageProps = { title: 'index' } }) {
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
          {Component.useCanvasLayout ? (
            <CanvasLayout>
              <Component router={router} {...pageProps}></Component>
            </CanvasLayout>
          ) : (
            <Component router={router} {...pageProps}></Component>
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
