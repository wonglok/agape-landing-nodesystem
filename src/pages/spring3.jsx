import { Box, Environment, PerspectiveCamera, Plane } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
// import {  } from 'three140'

/*
Stiffness (-20 kg / s2)
Damping (-0.5 kg / s)
Frequency (0) Hz
Mass (0.5) kg

*/
//https://burakkanber.com/blog/physics-in-javascript-car-suspension-part-1-spring-mass-damper/
/* Spring stiffness, in kg / s^2 */
let sK = -20

/* Damping constant, in kg / s */
let sB = -0.5

let anchor = { pos: new Vector3(0, 0, 0) }

/* Block position and velocity. */
let block = {
  pos: new Vector3(),
  vel: new Vector3(),
  mass: 0.3,
}

let wall = { pos: new Vector3(), vel: new Vector3(), mass: 0.3 }

let frameRate = 1 / 60

let mouse = { x: new Vector3(), isDown: false }

//
let tF_Spring = new Vector3()
let tF_Damper = new Vector3()
let tAcceleration = new Vector3()
let tRestorationForce = new Vector3()
let uGravity = new Vector3(0, -9.8 * 10, 0)

const Page = () => {
  let ref = useRef()
  // let viewport = useThree((s) => s.viewport)
  // let size = useThree((s) => s.size)

  useFrame((st, dt) => {
    frameRate = dt
    /* Move the wall. */
    // wall.t += frameRate
    // wall.lx = wall.pos
    // wall.pos = 30 + 70 * Math.sin(2 * Math.PI * wall.frequency * wall.t)
    // wall.vel = (wall.pos - wall.lx) / frameRate

    tRestorationForce.copy(anchor.pos).multiplyScalar(sK)

    tF_Spring
      .copy(block.pos)
      .sub(wall.pos)
      .multiplyScalar(sK)
      .sub(tRestorationForce)

    tF_Damper.copy(block.vel).sub(wall.vel).multiplyScalar(sB)

    tAcceleration
      .copy(tF_Spring)
      .add(tF_Damper)
      .multiplyScalar(1 / block.mass)

    tAcceleration.add(uGravity)

    block.vel.addScaledVector(tAcceleration, frameRate)
    block.pos.addScaledVector(block.vel, frameRate)
    if (ref.current) {
      ref.current.position.copy(block.pos)
    }
  })

  let scene = useThree((s) => s.scene)
  return (
    <>
      {/* <YoSpin>
        <Box>
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </Box>
      </YoSpin> */}
      <group position={[0.0, 0, 0]} scale={1}>
        <Plane
          args={[100, 100]}
          onPointerUp={() => {
            mouse.isDown = false
          }}
          onPointerMove={(ev) => {
            let mesh = scene.getObjectByName(mouse.isDown)

            if (mesh) {
              ev.point.z = 0
              anchor.pos.copy(ev.point)
              mesh.position.copy(ev.point)
            }
          }}
        >
          <meshBasicMaterial transparent={true} opacity={0}></meshBasicMaterial>
        </Plane>
        {/*  */}
        {/*  */}
        <Box ref={ref} args={[1, 1, 0.00001]} onPointerDown={() => {}}>
          <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
        </Box>
      </group>

      <Box
        scale={1}
        name='anchorMesh'
        position={[0, 0, 0]}
        onPointerDown={() => {
          mouse.isDown = 'anchorMesh'
        }}
        args={[0.5, 0.5, 0.5]}
      >
        <meshStandardMaterial color={'#0000ff'}></meshStandardMaterial>
      </Box>
      {/*  */}
      {/*  */}
      {/*  */}

      <Environment preset='apartment' background></Environment>

      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}

Page.layout = 'PromotePage'

Page.SEO = function SEO() {
  return <span className=''>{/* <Loader></Loader> */}</span>
}

async function getStaticProps() {
  return {
    props: {
      sceneName: 'index',
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
export default Page

//

//
