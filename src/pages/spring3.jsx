import { getID } from '@/helpers/getID'
import {
  Box,
  Environment,
  Instance,
  Instances,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { sin } from '@tensorflow/tfjs-core'
import { useRef } from 'react'
import { Vector2, Vector3 } from 'three'
// import {  } from 'three140'

/*
Stiffness (-20 kg / s2)
Damping (-0.5 kg / s)
Frequency (0) Hz
Mass (0.5) kg

*/
//https://burakkanber.com/blog/physics-in-javascript-car-suspension-part-1-spring-mass-damper/
/* Spring stiffness, in kg / s^2 */

/* Block position and velocity. */
let makeBlock = ({ xMin, yMin, xMax, yMax, uvX, uvY }) => {
  let isXMin = false,
    isYMin = false,
    isXMax = false,
    isYMax = false

  let hood = {
    connT: new Vector2(+0 + uvX, +1 + uvY),
    connD: new Vector2(+0 + uvX, -1 + uvY),
    connR: new Vector2(-1 + uvX, +0 + uvY),
    connL: new Vector2(+1 + uvX, +0 + uvY),

    connTL: new Vector2(-1 + uvX, +1 + uvY),
    connTR: new Vector2(+1 + uvX, +1 + uvY),
    connDL: new Vector2(-1 + uvX, -1 + uvY),
    connDR: new Vector2(+1 + uvX, -1 + uvY),
  }

  let mass = 0.03 + 0.01

  if (uvX === xMin) {
    isXMin = true
  }
  if (uvX === xMax) {
    isXMax = true
  }

  if (uvY === yMin) {
    isYMin = true
  }
  if (uvY === yMax) {
    isYMax = true
  }

  return {
    _id: getID(),
    uvX: uvX,
    uvY: uvY,

    isXMin,
    isYMin,

    isXMax,
    isYMax,

    pos: new Vector3(uvX, uvY, 0),
    vel: new Vector3(0, 0, 0),

    mass,

    ...hood,
  }
}

let BoxUnit = ({ data }) => {
  let ref = useRef()

  useFrame(() => {
    if (ref.current) {
      ref.current.position.copy(data.pos)
    }
  })
  return <Instance ref={ref} onPointerDown={() => {}}></Instance>
}
let Boxes = () => {
  return (
    <Instances>
      <boxBufferGeometry args={[0.2, 0.2, 0.00001]}></boxBufferGeometry>
      <meshStandardMaterial color={'#ff0000'}></meshStandardMaterial>
      {blocks.map((b) => (
        <BoxUnit data={b} key={b._id}></BoxUnit>
      ))}
    </Instances>
  )
}

// let block = makeBlock({ type: 'block' })

let uK = -20

let uB = -5.0

let uGravity = new Vector3(0, -9.8, 0)

// let uWind = new Vector3(-1, 0.0, 0.0)

let uAnchor = new Vector3(0, 0, 0)
let blocks = []
let unit = 20
for (let y = -unit; y <= 0; y++) {
  for (let x = -unit; x <= unit; x++) {
    blocks.push(
      makeBlock({
        xMin: -unit,
        xMax: unit,
        yMin: -unit,
        yMax: 0,
        uvX: x,
        uvY: y,
      })
    )
  }
}

// let pinMouse = makeBlock({
//   xMin: -unit,
//   xMax: unit,
//   yMin: -unit,
//   yMax: unit,
//   uvX: 0,
//   uvY: 0,
// })

let frameRate = 1 / 60

let mouse = { x: new Vector3(), isDown: false }

let tF_Spring = new Vector3()
let tF_Damper = new Vector3()
let tAcceleration = new Vector3()

// let tForceAny = new Vector3()

let tDiff = new Vector3()

let tSpread = new Vector3()
const Page = () => {
  let ref = useRef()
  // let viewport = useThree((s) => s.viewport)
  // let size = useThree((s) => s.size)
  let time = 0
  useFrame((st, dt) => {
    frameRate = dt

    if (frameRate >= 1 / 60) {
      frameRate = 1 / 60
    }
    time += frameRate

    // pin.pos.copy(uAnchor)

    // tForceAny.copy(pin.pos).multiplyScalar(uK)

    // tF_Spring.copy(block.pos).sub(pin.pos).multiplyScalar(uK).sub(tForceAny)

    // tF_Damper.copy(block.vel).sub(pin.vel).multiplyScalar(uB)

    // tAcceleration
    //   .copy(tF_Spring)
    //   .add(tF_Damper)
    //   .multiplyScalar(1 / block.mass)

    // tAcceleration.add(uGravity)

    // block.vel.addScaledVector(tAcceleration, frameRate)
    // block.pos.addScaledVector(block.vel, frameRate)

    // if (ref.current) {
    //   ref.current.position.copy(block.pos)
    // }

    // here we go//

    blocks.forEach((iBlock) => {
      if (iBlock.isYMax) {
        // let pin = pinMouse
        tSpread.x = uAnchor.x + iBlock.uvX
        tSpread.y =
          uAnchor.y +
          iBlock.uvY +
          5.0 * Math.sin(time * 5.0 + (iBlock.uvX / unit) * 3.1415 * 1.5)
        tSpread.z =
          5.0 * Math.sin(time * 5.0 + (iBlock.uvX / unit) * 3.1415 * 1.5)

        // tForceAny.copy(tSpread).multiplyScalar(uK)

        iBlock.pos.lerp(tSpread, 0.05)

        // tF_Spring
        //   .copy(iBlock.pos)
        //   .sub(pin.pos)
        //   .multiplyScalar(uK)
        //   .sub(tForceAny)
        // tF_Damper.copy(iBlock.vel).sub(pin.vel).multiplyScalar(uB)

        // //
        // tAcceleration
        //   .copy(tF_Spring)
        //   .add(tF_Damper)
        //   .multiplyScalar(1 / iBlock.mass)

        // iBlock.vel.addScaledVector(tAcceleration, frameRate)
        // iBlock.pos.addScaledVector(iBlock.vel, frameRate)
      } else {
        let updown = []

        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connT.x && iBlock.uvY === b.connT.y
          )
        )
        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connD.x && iBlock.uvY === b.connD.y
          )
        )

        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connL.x && iBlock.uvY === b.connL.y
          )
        )
        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connR.x && iBlock.uvY === b.connR.y
          )
        )

        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connTL.x && iBlock.uvY === b.connTL.y
          )
        )
        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connTR.x && iBlock.uvY === b.connTR.y
          )
        )
        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connDL.x && iBlock.uvY === b.connDL.y
          )
        )
        updown.push(
          blocks.find(
            (b) => iBlock.uvX === b.connDR.x && iBlock.uvY === b.connDR.y
          )
        )

        updown.forEach((pin) => {
          if (pin) {
            // let dist = iBlock.pos.distanceTo(pin.pos)
            // let springLg = 0.5

            // let diff = dist - springLg
            // tSpread.copy(iBlock.pos)
            // tForceAny.copy(tSpread).multiplyScalar(-0.1)

            tF_Spring.copy(iBlock.pos).sub(pin.pos).multiplyScalar(uK)
            tF_Damper.copy(iBlock.vel).sub(pin.vel).multiplyScalar(uB)

            //
            tAcceleration
              .copy(tF_Spring)
              .add(tF_Damper)
              .multiplyScalar(1 / iBlock.mass)

            tAcceleration.addScaledVector(uGravity, -uK)

            let diff = tDiff.copy(iBlock.pos).sub(pin.pos).length() - 1.5

            if (diff >= 1.5) {
              diff = 1.5
            }
            if (diff <= -1.5) {
              diff = -1.5
            }
            // tAcceleration.addScaledVector(diff, 1 / 8)

            iBlock.vel.addScaledVector(tAcceleration, (frameRate / 8) * diff)
            iBlock.pos.addScaledVector(iBlock.vel, frameRate / 8)

            //
          }
          //
        })
      }
    })
  })

  let scene = useThree((s) => s.scene)
  let camera = useThree((s) => s.camera)
  camera.position.z = 100
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
              uAnchor.copy(ev.point)
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

        <Boxes></Boxes>
      </group>

      <Box
        scale={1}
        name='uAnchorMesh'
        position={[0, 0, 0]}
        onPointerDown={() => {
          mouse.isDown = 'uAnchorMesh'
        }}
        args={[5, 5, 5]}
      >
        <meshStandardMaterial
          transparent={true}
          opacity={0.5}
          color={'#0000ff'}
        ></meshStandardMaterial>
      </Box>
      {/*  */}
      {/*  */}
      {/*  */}

      <Environment preset='apartment' background></Environment>

      {/* <OrbitControls></OrbitControls> */}
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
