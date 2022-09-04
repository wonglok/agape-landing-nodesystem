import { useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'
import { ENAssetDrawer } from '../ENAssetDrawer/ENAssetDrawer'
import { ENCanvas } from '../ENCanvas/ENCanvas'
import { ENGraph } from '../ENGraph/ENGraph'
import { ENLayers } from '../ENLayers/ENLayers'
import { ENParams } from '../ENParams/ENParams'

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
            NS={'canvas-control'}
            left={
              <UpDown
                NS={'asset-layercanvas'}
                getDefaultSize={() => {
                  return window.innerHeight - 240
                }}
                up={
                  <div>
                    <LeftRight
                      getDefaultSize={() => 280}
                      NS={'layers-canvas'}
                      left={<ENLayers></ENLayers>}
                      right={<ENCanvas></ENCanvas>}
                    ></LeftRight>
                  </div>
                }
                down={<ENAssetDrawer></ENAssetDrawer>}
              ></UpDown>
            }
            right={
              <div>
                <UpDown
                  NS={'param-graph'}
                  getDefaultSize={() => {
                    return 300
                  }}
                  up={<ENParams></ENParams>}
                  down={<ENGraph></ENGraph>}
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
    let reset = ({ detail: isReset }) => {
      //
      if (isReset) {
        localStorage.setItem(NS, getDefaultSize())
      }
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
      {
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
      }
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
    let reset = ({ detail: isReset }) => {
      //
      if (isReset) {
        localStorage.setItem(NS, getDefaultSize())
      }
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
      {
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
      }
    </>
  )
}
