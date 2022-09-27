import { useGLBEditor } from '@/helpers/useGLBEditor'
import { TabUnifroms } from './TabUniforms'

export function ENPNodeDetail() {
  // let setOverlay = useGLBEditor((s) => s.setOverlay)
  // let overlay = useGLBEditor((s) => s.overlay)
  let activeNodeID = useGLBEditor((s) => s.activeNodeID)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let removeLink = useGLBEditor((s) => s.removeLink)
  let removeNode = useGLBEditor((s) => s.removeNode)
  let setActiveNodeID = useGLBEditor((s) => s.setActiveNodeID)
  let paramsTab = useGLBEditor((s) => s.paramsTab)
  let setParamsTab = useGLBEditor((s) => s.setParamsTab)
  let nodeDrag = useGLBEditor((s) => s.nodeDrag)
  let refreshSystem = useGLBEditor((s) => s.refreshSystem)
  let reloadGraphID = useGLBEditor((s) => s.reloadGraphID)

  //
  let effectNode = activeSceneSelection?.userData?.effectNode
  if (!effectNode) {
    return <></>
  }

  let nodes = effectNode.nodes || []
  let node = nodes.find((e) => e._id === activeNodeID)
  //
  return (
    <>
      {node && (
        <>
          {/* <span id={nodeDrag?.nodeID}></span> */}
          {/* <span id={activeSceneSelection.uuid}></span> */}
          {/* <span id={reloadGraphID + 'reloadGraphID-ennodedetails'}></span> */}
          {/*
          <div className=' absolute top-0 right-0 p-1'>
            <button
              onClick={() => {
                setActiveNodeID('')
              }}
            >
              <svg
                width={24}
                height={24}
                clipRule='evenodd'
                fillRule='evenodd'
                strokeLinejoin='round'
                strokeMiterlimit='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='red'
                  d='m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z'
                  fillRule='nonzero'
                />
              </svg>
            </button>
          </div> */}

          <div
            style={{
              height: '100%',
              overflow: 'scroll',
            }}
            //
          >
            <div className=''>
              <div className='flex items-center w-full h-8 pl-2 bg-yellow-300 '>
                Node: {node.displayTitle}
              </div>
            </div>
            {/* <div className='w-full bg-gray-200'>
              <div
                onClick={() => {
                  //
                  setParamsTab('uniforms')
                }}
                className='inline-block px-2 py-1 my-1 ml-1 mr-1 text-white bg-orange-500 rounded-lg cursor-pointer'
              >
                Parameters
              </div>
              <div
                onClick={() => {
                  //
                  setParamsTab('conns')
                }}
                className='inline-block px-2 py-1 my-1 mr-1 text-white bg-orange-500 rounded-lg cursor-pointer'
              >
                Node & Connection Settings
              </div>
            </div> */}
            {/* paramsTab === 'uniforms' &&  */}
            {
              <>
                <TabUnifroms node={node}></TabUnifroms>
              </>
            }
            {/*  */}
            {/*  */}
            {/*  */}

            <div className='h-1 border-black boder-b'></div>
            {/* paramsTab === 'conns' &&  */}
            {
              <>
                <div>
                  <div className='p-2 text-xl'>Node Removal</div>
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
                          refreshSystem()
                        }}
                      >
                        {`Remove this node and it's connections.`}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='p-2 text-xl'>Connections</div>
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
            }
          </div>

          {/*  */}
          {/*  */}
        </>
      )}
    </>
  )
}
