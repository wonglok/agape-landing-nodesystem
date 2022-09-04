import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'

export function UIMain() {
  let [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    ready && (
      <>
        <UIMainContent></UIMainContent>
      </>
    )
  )
}

function UIMainContent() {
  return (
    <>
      <div className='relative w-full text-xs' style={{ height: 'calc(100%)' }}>
        <div className='w-full h-full'>
          <LeftRight
            //
            NS={'ns1'}
            left={
              <UpDown
                getDefaultSize={() => {
                  return window.innerHeight - 240
                }}
                up={
                  <div>
                    <LeftRight
                      getDefaultSize={() => 280}
                      NS={'ns2'}
                      left={<div>Layers</div>}
                      right={<div>Canvas</div>}
                    ></LeftRight>
                  </div>
                }
                down={<div>Asset Drawer</div>}
              ></UpDown>
            }
            right={
              <div>
                <UpDown
                  NS={'ud-2'}
                  getDefaultSize={() => {
                    return 300
                  }}
                  up={<>Parameters</>}
                  down={<>Graph Logic</>}
                ></UpDown>
              </div>
            }
          ></LeftRight>
        </div>
      </div>
    </>
  )
}

function LeftRight({
  NS = 'left-right',
  getDefaultSize = () => window.innerWidth - 500,
  left,
  right,
}) {
  let [onoff, setOnOff] = useState(true)
  useEffect(() => {
    let reset = () => {
      //
      localStorage.setItem(NS, getDefaultSize())
      setOnOff(Math.random())
    }
    // window.addEventListener('resize', hh)
    window.addEventListener('reset-size', reset)

    return () => {
      // window.removeEventListener('resize', hh)
      window.removeEventListener('reset-size', reset)
    }
  }, [])
  return (
    <>
      {onoff && (
        <SplitPane
          split='vertical'
          size={parseInt(localStorage.getItem(NS), 10) || getDefaultSize()}
          defaultSize={
            parseInt(localStorage.getItem(NS), 10) || getDefaultSize()
          }
          onChange={(size) => localStorage.setItem(NS, size)}
        >
          <div>{left}</div>
          <div>{right}</div>
        </SplitPane>
      )}
    </>
  )
}

function UpDown({
  NS = 'updown1',
  getDefaultSize = () => window.innerHeight - 24 - 24 - 280,
  up = <>up</>,
  down = <>down</>,
}) {
  let [onoff, setOnOff] = useState(true)
  useEffect(() => {
    let reset = () => {
      //
      localStorage.setItem(NS, getDefaultSize())
      setOnOff(Math.random())
    }
    // window.addEventListener('resize', hh)
    window.addEventListener('reset-size', reset)

    return () => {
      // window.removeEventListener('resize', hh)
      window.removeEventListener('reset-size', reset)
    }
  }, [])
  return (
    <>
      {onoff && (
        <SplitPane
          split='horizontal'
          size={parseInt(localStorage.getItem(NS), 10) || getDefaultSize()}
          defaultSize={
            parseInt(localStorage.getItem(NS), 10) || getDefaultSize()
          }
          onChange={(size) => localStorage.setItem(NS, size)}
        >
          <div>{up}</div>
          <div>{down}</div>
        </SplitPane>
      )}
    </>
  )
}
