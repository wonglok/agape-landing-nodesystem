import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useState } from 'react'
import { TabUnifroms } from './TabUniforms'

export function ENPNodeDetail() {
  let setOverlay = useGLBEditor((s) => s.setOverlay)
  let overlay = useGLBEditor((s) => s.overlay)
  let getActiveNode = useGLBEditor((s) => s.getActiveNode)
  let getEffectNode = useGLBEditor((s) => s.getEffectNode)
  let reloadGraphID = useGLBEditor((s) => s.reloadGraphID)
  let removeLink = useGLBEditor((s) => s.removeLink)
  let removeNode = useGLBEditor((s) => s.removeNode)
  let setActiveNodeID = useGLBEditor((s) => s.setActiveNodeID)
  let effectNode = getEffectNode()
  let node = getActiveNode()

  let [tab, setTab] = useState('conns')
  useEffect(() => {
    let hh = (ev) => {
      if (ev.key === 'Escape') {
        if (overlay === 'nodeDetail') {
          setOverlay('')
        }
      }
    }
    window.addEventListener('keydown', hh)
    return () => {
      window.removeEventListener('keydown', hh)
    }

    //
  }, [overlay])

  return (
    <>
      {overlay === 'nodeDetail' && node && (
        <>
          <span id={reloadGraphID}></span>
          <div
            style={{
              position: 'absolute',
              top: `calc(0% )`,
              left: `calc(0% )`,
              width: `100%`,
              height: `100%`,
            }}
            className='shadow-xl backdrop-blur-lg'
            onClick={() => {
              setOverlay(false)
            }}
          >
            {/*  */}
            {/*  */}
            {/*  */}
          </div>

          <div
            style={{
              position: 'fixed',
              top: `calc(50% - 85% / 2)`,
              left: `calc(100% - 85% / 2 + 50px)`,
              width: `calc(85% / 2 - 100px)`,
              height: `85%`,
              overflow: 'scroll',
              zIndex: 111111111,
            }}
            //
            className='bg-white border border-yellow-300 shadow-xl bg-opacity-80 rounded-xl'
          >
            <div className='py-2 text-2xl text-center bg-yellow-400'>
              {node.displayTitle}
            </div>

            <div className='w-full bg-gray-200'>
              <div
                onClick={() => {
                  //
                  setTab('conns')
                }}
                className='inline-block p-3 my-1 mr-1 text-white bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600'
              >
                Connections
              </div>

              <div
                onClick={() => {
                  //
                  setTab('uniforms')
                }}
                className='inline-block p-3 my-1 mr-1 text-white bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600'
              >
                Uniforms
              </div>
            </div>

            {tab === 'uniforms' && (
              <>
                <TabUnifroms node={node}></TabUnifroms>
              </>
            )}

            {tab === 'conns' && (
              <>
                <div>
                  <div className='p-2'>Node Title: {node.displayTitle}</div>
                  <div className='p-2'>
                    <div key={node._id}>
                      {/*  */}
                      {/*  */}

                      <button
                        className='p-2 bg-red-200'
                        onClick={() => {
                          if (!window.confirm('remove?')) {
                            return
                          }
                          //
                          removeNode(node)
                          // effectNode.connections

                          effectNode.connections
                            .filter((it) => {
                              return (
                                it.input.nodeID === node._id ||
                                it.output.nodeID === node._id
                              )
                            })
                            .forEach((conn) => {
                              removeLink(conn)
                            })
                          setActiveNodeID('')
                          setOverlay('')
                          //
                        }}
                      >
                        Remove this node and it's connections.
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='p-2'>Connections</div>
                  {effectNode.connections.length === 0 && (
                    <div className='p-2'>No Connections...</div>
                  )}
                  <div className='p-2'>
                    {effectNode.connections
                      .filter((e) => {
                        return e.input.nodeID === node._id
                      })
                      .map((conn) => {
                        return (
                          <div key={conn._id}>
                            {/*  */}
                            {/*  */}
                            {/*  */}

                            <button
                              className='p-2 bg-red-200'
                              onClick={() => {
                                //
                                removeLink(conn)
                                //
                              }}
                            >
                              Remove this input connection. {` ` + conn._id}
                            </button>
                          </div>
                        )
                      })}
                  </div>
                  <div className='p-2'>
                    {effectNode.connections
                      .filter((e) => {
                        return e.output.nodeID === node._id
                      })
                      .map((conn) => {
                        return (
                          <div key={conn._id}>
                            {/*  */}
                            {/*  */}
                            {/*  */}

                            <button
                              className='p-2 bg-red-200'
                              onClick={() => {
                                //
                                removeLink(conn)
                                //
                              }}
                            >
                              Remove this output connection. {` ` + conn._id}
                            </button>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/*  */}
          {/*  */}
          {/*  */}
          <div
            style={{
              position: 'absolute',
              top: `calc(50% - 85% / 2 - 50px / 2)`,
              right: `calc(50% - 85% / 2 - 50px / 2)`,
              width: `50px`,
              height: `50px`,
              borderRadius: '100%',
              zIndex: 111111111,
            }}
            className='text-white bg-red-500 shadow-xl cursor-pointer rounded-xl'
            onClick={() => {
              setOverlay(false)
            }}
          >
            <svg
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              className=' scale-75'
            >
              <path
                fill='white'
                d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z'
              />
            </svg>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
        </>
      )}
    </>
  )
}
