import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'

export function UIMain() {
  let [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return ready && <UIMainContent></UIMainContent>
}

function UIMainContent() {
  return (
    <>
      <div className='relative w-full text-xs' style={{ height: 'calc(100%)' }}>
        <div className='w-full h-full'>
          <LeftRight
            NS={'ns1'}
            left={
              <UpDown
                getSize={() => {
                  return window.innerHeight - 240
                }}
                up={
                  <div>
                    <LeftRight
                      getSize={() => 280}
                      NS={'ns2'}
                      left={<div>Layers</div>}
                      right={<div>Canvas</div>}
                    ></LeftRight>
                  </div>
                }
                down={<div>aaaa</div>}
              ></UpDown>
            }
            right={
              <div>
                <UpDown
                  NS={'ud-2'}
                  getSize={() => {
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
  getSize = () => window.innerWidth - 500,
  left,
  right,
}) {
  let [onoff, setOnOff] = useState(true)
  useEffect(() => {
    let hh = () => {
      localStorage.setItem(NS, getSize())
      setOnOff(Math.random())
      // setOnOff(false)
      // setTimeout(() => {
      //   setOnOff(true)
      // }, 0)
    }
    window.addEventListener('resize', hh)

    return () => {
      window.removeEventListener('resize', hh)
    }
  }, [])
  return (
    <>
      {onoff && (
        <SplitPane
          split='vertical'
          size={getSize()}
          defaultSize={parseInt(localStorage.getItem(NS), 10) || getSize()}
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
  getSize = () => window.innerHeight - 24 - 24 - 280,
  up = <>up</>,
  down = <>down</>,
}) {
  let [onoff, setOnOff] = useState(true)
  useEffect(() => {
    let hh = () => {
      localStorage.setItem(NS, getSize())
      setOnOff(Math.random())

      // setOnOff(false)
      // setTimeout(() => {
      //   setOnOff(true)
      // }, 0)
    }
    window.addEventListener('resize', hh)

    return () => {
      window.removeEventListener('resize', hh)
    }
  }, [])
  return (
    <>
      {onoff && (
        <SplitPane
          split='horizontal'
          size={getSize()}
          defaultSize={parseInt(localStorage.getItem(NS), 10) || getSize()}
          onChange={(size) => localStorage.setItem(NS, size)}
        >
          <div>{up}</div>
          <div>{down}</div>
        </SplitPane>
      )}
    </>
  )
}
