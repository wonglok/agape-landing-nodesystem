import {
  provideProjects,
  saveProjects,
  verifyPermission,
} from '@/components/projects/FileSystem/FileSystem'
import { getPosMD5 } from '@/effectnode/store/getPosMD5'
import { Object3D } from 'three'
import {
  Clock,
  Mesh,
  MeshStandardMaterial,
  SphereBufferGeometry,
} from 'three140'
import { GLTFExporter } from 'three140/examples/jsm/exporters/GLTFExporter'
import { DRACOLoader } from 'three140/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three140/examples/jsm/loaders/GLTFLoader'
import { clone } from 'three140/examples/jsm/utils/SkeletonUtils'

//
import { WebIO } from '@gltf-transform/core'
import { DracoMeshCompression } from '@gltf-transform/extensions'

//
import create from 'zustand'
//
import { getID } from './getID'

let generateInside = (set, get) => {
  return {
    //
    activeSceneSelection: false,
    setSelection: (v) => {
      set({ activeSceneSelection: v })
    },
    // //
    // needsSaveFnc: () => {
    //   //
    // },
    needsSaveMsg: '',
    editorNavigationMode: false,
    activeGLBHandle: false,
    activeGLBRawObject: false,
    activeGLBRuntimeObject: false,
    activeGLBSplash: 'pick',
    openFile: async (handle, mode = 'floor') => {
      let self = get()
      let closeFile = self.closeFile
      let saveFile = self.saveFile
      set({ activeGLBSplash: 'loading' })

      if (self.activeGLBHandle) {
        await saveFile({
          handle: self.activeGLBHandle,
          runTimeGLB: self.activeGLBRuntimeObject,
          origGLB: self.activeGLBRawObject,
        })
      }

      let ans = await closeFile({ activeGLBSplash: 'loading' })
      if (ans !== 'ok') {
        return
      }

      //
      let file = await handle.getFile()
      let url = URL.createObjectURL(file)
      let loadGLB = self.loadGLB

      let activeGLBRawObject = await loadGLB(url)
      let activeGLBRuntimeObject = await loadGLB(url)
      getPosMD5(activeGLBRawObject)
      getPosMD5(activeGLBRuntimeObject)

      //
      set({
        activeGLBSplash: 'ready',
        editorNavigationMode: mode,
        activeGLBHandle: handle,
        activeGLBRawObject,
        activeGLBRuntimeObject,
      })
    },

    closeFile: async (
      { activeGLBSplash = 'pick' } = { activeGLBSplash: 'pick' }
    ) => {
      // if (await get().needsSaveFnc()) {
      //   set({ needsSaveMsg: 'please save your file beofre exit!' })
      //   return 'bad'
      // }
      // set({ needsSaveMsg: '' })

      let update = {
        activeGLBSplash: 'pick',
        editorNavigationMode: false,
        activeSceneSelection: false,
        activeGLBHandle: false,
        activeGLBRawObject: false,
        activeGLBRuntimeObject: false,
      }
      if (activeGLBSplash) {
        update['activeGLBSplash'] = activeGLBSplash
      }
      set(update)

      return 'ok'
    },

    //
    reloadFiles: 0,
    projectFolders: [],
    currentFolder: false,

    permission: 'prompt',
    queryPermission: async (handle) => {
      let permission = await handle.queryPermission({ mode: 'readwrite' })
      set({ permission })
    },

    requestPermission: async (handle) => {
      let permission = await verifyPermission(handle, true)

      set({ permission })

      return permission
    },

    setCurrentFolder: (v) => {
      set({ currentFolder: v })
    },

    loadProjectFolder: async () => {
      let projects = await provideProjects()
      set({ projectFolders: projects })

      return projects
    },
    removeProjectFolderByID: async (uuid) => {
      let projects = await provideProjects()

      let idx = projects.findIndex((e) => e._id === uuid)
      projects.splice(idx, 1)

      set({ projectFolders: projects })
      await saveProjects(projects)
    },

    listFolderItem: async (handle) => {
      let arr = []

      for await (let item of handle.values()) {
        //
        if (item.name === '.DS_Store') {
          continue
        }

        arr.push({
          _id: handle.name + '/' + '-' + arr.length + item.name,
          handle: item,
        })
      }

      return arr
    },
    addProjectFolderHandle: async (handle) => {
      let projects = await provideProjects()
      projects.push({
        handle: handle,
        _id: getID(),
      })
      await saveProjects(projects)
    },

    uiClock: new Clock(false),
    lastTime: 0,
    resetTime: () => {
      set({ lastTime: 0 })
    },
    toggleRunning: () => {
      /** @type {Clock} */
      let uiClock = get().uiClock

      // console.log(uiClock.running)
      if (uiClock.running) {
        uiClock.stop()
        set({ lastTime: uiClock.getElapsedTime() })
      } else {
        uiClock.start()
        uiClock.elapsedTime = get().lastTime
      }
      set({ uiClock })
    },
    updateClockTime: (v) => {
      /** @type {Clock} */
      let uiClock = get().uiClock

      if (v <= 0) {
        v = 0
      }

      // console.log(uiClock.running)
      uiClock.elapsedTime = v
      set({ uiClock })
    },

    createWorkspaceFolder: async () => {
      let currentFolder = get().currentFolder

      if (!currentFolder?.handle) {
        return
      }

      let generative = await currentFolder?.handle.getDirectoryHandle(
        'generative',
        {
          create: true,
        }
      )
      let handle = await generative.getFileHandle('hello.en.glb', {
        create: true,
      })

      //
      await writeFile(
        handle,
        //
        await get().createEmptyGLBFileBuffer()
      )

      await currentFolder?.handle.getDirectoryHandle('export', {
        create: true,
      })

      let resources = await currentFolder?.handle.getDirectoryHandle(
        'resources',
        {
          create: true,
        }
      )

      await resources.getDirectoryHandle('glb', { create: true })
      await resources.getDirectoryHandle('hdr', { create: true })
      await resources.getDirectoryHandle('textures', { create: true })
      await resources.getDirectoryHandle('materials', { create: true })

      //
      return
    },
    //
    createEmptyGLBFileBuffer: async () => {
      let o3 = new Object3D()
      let resource = new Object3D()
      resource.add(
        new Mesh(
          new SphereBufferGeometry(1, 32, 32),
          new MeshStandardMaterial({ color: 'green' })
        )
      )
      o3.add(resource)
      resource.userData = {
        myData: {
          yo: 1,
          b: ['yo', 'fun'],
        },
        bufferView: new ArrayBuffer(1024),
        gltfExtensions: {
          EXT_EffectNode_VFX: {},
        },
      }

      return get().exportGLB(o3, [])
    },

    glbCache: new Map(),
    loadGLB: async (url) => {
      let glbCache = get().glbCache
      if (glbCache.has(url)) {
        return await glbCache.get(url)
      }
      let loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setWorkerLimit(32)
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
      // loader.register((parser) => new GLTFEffectNodeLoader(parser))
      let prom = loader.loadAsync(url)
      glbCache.set(url, prom)
      let glb = await prom
      dracoLoader.dispose()
      console.log(glb)
      return glb
    },
    exportGLB: (o3 = new Object3D(), animations = []) => {
      return new Promise((resolve) => {
        let exporter = new GLTFExporter()
        // exporter.register((writer) => new GLTFEffectNodeExport(writer))
        exporter.parse(
          o3,
          (res) => {
            resolve(res)
          },
          (err) => {
            console.log(err)
          },
          {
            includeCustomExtensions: true,
            animations,
            trs: false,
            onlyVisible: false,
            binary: true,
            // maxTextureSize: params.maxTextureSize,
          }
        )
        //
      })
    },
    saveFile: async ({ handle, runTimeGLB, origGLB }) => {
      // console.log('todo save file for glb')

      let clonedRuntime = clone(runTimeGLB.scene)
      let clonedForExport = clone(origGLB.scene)

      clonedRuntime.traverse((runtimeIt) => {
        if (runtimeIt.userData.effectNode) {
          clonedForExport.traverse((exportIt) => {
            if (exportIt.userData.sigMD5 === runtimeIt.userData.sigMD5) {
              exportIt.userData.effectNode = JSON.parse(
                JSON.stringify(runtimeIt.userData.effectNode)
              )
            }
          })
        }
      })

      let animations = origGLB.animations
      let rawGltf = await get().exportGLB(clonedForExport.children, animations)

      let dracoMod = await remoteImport('/draco/draco_encoder_raw.js')

      const io = new WebIO({
        mode: 'cors',
        cache: 'no-cache',
      })

      // let draco3d = loadDraco()

      let mod = dracoMod.DracoEncoderModule()
      io.registerExtensions([DracoMeshCompression])
      io.registerDependencies({
        // 'draco3d.decoder': await draco3d.createDecoderModule(), // Optional.
        'draco3d.encoder': mod, // Optional.
      })

      let glbDocument = await io.readBinary(new Uint8Array(rawGltf))

      glbDocument
        .createExtension(DracoMeshCompression)
        .setRequired(true)
        .setEncoderOptions({
          method: DracoMeshCompression.EncoderMethod.SEQUENTIAL,
          encodeSpeed: 5,
          decodeSpeed: 5,
        })

      // io.setVertexLayout(VertexLayout.SEPARATE)

      let newBin = await io.writeBinary(glbDocument)

      await writeFile(
        handle,
        newBin
        //
        // await get().createEmptyGLBFileBuffer()
      )
      console.log('done')
      return
    },
  }
}

export const useGLBEditor = create((set, get) => {
  return generateInside(set, get)
})

//

async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable()
  await writable.write(contents)
  await writable.close()
}
