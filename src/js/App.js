import {
  Scene,
  sRGBEncoding,
  WebGLRenderer,
  Raycaster,
  Vector2,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Group
} from 'three'
import { Pane } from 'tweakpane'
import gsap, { Power3, Power4 } from 'gsap'

import Sizes from '@tools/Sizes'
import Time from '@tools/Time'
import Assets from '@tools/Loader'

import Camera from './Camera'
import World from '@world/index'

export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Assets()
    this.raycaster = new Raycaster()
    this.pointer = new Vector2()
    this.step = 0

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.setTarget()

    document
      .querySelector('#_canvas')
      .addEventListener('click', this.openDoors.bind(this))
  }
  openDoors() {
    if (this.step == 0) {
      this.world.lowVolume()
      this.world.light.upLight()
      const trapdoor = this.world.room.room.children[0].children[4].children[3]
      const machine = this.world.machine.machine
      const door = this.world.room.room.children[0].children[3].rotation
      const door2 = this.world.room.room.children[0].children[1].rotation
      const camera = this.camera.camera
      let tl = gsap.timeline()
      tl.to(door, {
        y: (-Math.PI / 2) * 1.2,
        duration: 2.5,
        ease: Power4.easeOut
      })
      tl.to(
        door2,
        { y: (Math.PI / 2) * 1.2, duration: 2.5, ease: Power4.easeOut },
        '<'
      )
      tl.to(
        machine.position,
        { y: 0.4, duration: 1.9, delay: 0.5, ease: Power3 },
        '<'
      )
      tl.to(machine.rotation, { y: 0, duration: 1.9, ease: Power3 }, '<')
      tl.to(
        camera.position,
        { x: 29, duration: 2.2, delay: 1, ease: Power3 },
        '<'
      )
      tl.to(trapdoor.position, { x: 0, duration: 1.5, ease: Power3 }, '<').then(
        document.addEventListener('mousemove', this.onPointerMove)
      )
      this.step = 1
      document
        .querySelector('#_canvas')
        .removeEventListener('click', this.openDoors)
    }
  }
  onPointerMove = (event) => {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera.camera)
    // calculate objects intersecting the picking ray var intersects =
    const intersects = this.raycaster.intersectObject(
      this.world.machine.machine.children[0].children[9]
    )

    if (intersects.length > 0) {
      intersects[0].object.material.color.set(0xff0000)
      document.querySelector('#_canvas').style.cursor = 'pointer'
      document
        .querySelector('#_canvas')
        .addEventListener('click', this.firstStep)
    } else {
      this.world.machine.machine.children[0].children[9].material.color.set(
        0x73ccee
      )
      document.querySelector('#_canvas').style.cursor = 'initial'
      document
        .querySelector('#_canvas')
        .removeEventListener('click', this.firstStep)
    }
  }
  firstStep = () => {
    if (this.step == 1) {
      this.world.playCoffeeSound()
      const coffee = this.world.coffee.coffee
      coffee.visible = true
      let tl = gsap.timeline()
      tl.to(this.camera.camera.position, { y: 9, duration: 1 })
      tl.to(this.cube.position, { y: 9, duration: 1 }, 0)
      tl.to(coffee.position, { y: -6, duration: 3 }).then(
        this.world.machine.setText('text2')
      )
      tl.to(this.camera.camera.position, { y: 13, duration: 0.6 })
      tl.to(this.cube.position, { y: 13, duration: 0.6 }, '<')
      setTimeout(() => {
        this.step = 2
      }, 1000)
    }
    if (this.step == 2) {
      this.world.gobelet.createGobelet()
      this.world.touillette.createTouillette()

      let tl = gsap.timeline()
      tl.to(this.camera.camera.position, { y: 9, duration: 1, delay: 0.5 })
      tl.to(this.cube.position, { y: 9, duration: 1 }, '<').then(
        this.world.machine.setText('text3'),
        this.world.gobelet.animateGobelet(),
        this.world.touillette.animateTouillette(),
        tl.to(this.camera.camera.position, { y: 13, duration: 1, delay: 2.7 }),
        tl.to(this.cube.position, { y: 13, duration: 1 }, '<')
      )
      tl.call(this.secondPass)
    }
  }
  secondPass = () => {
    this.world.machine.setText('text4')
    let tl = gsap.timeline({
      onComplete: this.thirdPass()
    })

    tl.to(this.camera.camera.position, {
      y: 9,
      duration: 1,
      delay: 3,
      ease: Power4
    })
    tl.to(this.cube.position, { y: 9, duration: 1, ease: Power4 }, '<')
  }

  thirdPass() {
    this.world.allTouillettes.createTouillettes()
    const gobGroup = new Group()
    gobGroup.add(this.world.allTouillettes.allTouillettes)
    gobGroup.add(this.world.touillette.touillette)
    gobGroup.add(this.world.gobelet.gobelet)
    this.world.container.add(gobGroup)
    let tl = gsap.timeline()
    tl.to(gobGroup.position, {
      x: -4.2,
      y: -0.7,
      z: 1,
      duration: 0.9,
      delay: 4.9,
      ease: Power4.easeOut
    }).then(
      this.world.allGobelets.createGobelets(),
      setTimeout(() => {
        this.world.machine.setText('text5'),
          setTimeout(() => {
            this.world.playBip()
          }, 1200)
          this.camera.camera.attach(gobGroup),
          this.forthPass()
      }, 6000)
    )

    // this.camera.camera.attach(gobGroup)
  }

  forthPass() {
    const door = this.world.room.room.children[0].children[3].rotation
    const door2 = this.world.room.room.children[0].children[1].rotation
    let tl = gsap.timeline()
    tl.to(this.camera.camera.position, {
      y: 13,
      duration: 1,
      ease: Power4
    })
    tl.to(this.cube.position, { y: 13, duration: 1, ease: Power4 }, '<')
    tl.to(this.camera.camera.position, {
      x: -210,
      y: 5,
      duration: 3,
      delay: 2
    })

    tl.to(
      door,
      {
        y: 0,
        duration: 2,
        delay: 0.5,
        ease: Power4.easeOut
      },
      '<'
    )
    tl.to(door2, { y: 0, duration: 2, ease: Power4.easeOut }, '<').then(
      this.world.light.downLight(),
      this.world.lowMusic()
    )
    tl.to(
      this.cube.position,
      {
        x: -300,
        z: 0,
        y: 5,
        duration: 2.4,
        ease: Power4.easeOut
      },
      '-=1'
    )
    tl.to(
      document.querySelector('#_canvas'),
      {
        opacity: 0,
        duration: 2,
        delay: 3,
        ease: Power4.easeOut
      },
      '<'
    )
  }

  setRenderer() {
    // Set scene
    this.scene = new Scene()
    // Set renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.gammaFactor = 2.2
    // Set background color
    this.renderer.setClearColor(0x000000, 1)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    this.renderer.shadowMap.enabled = true
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    // Set RequestAnimationFrame with 60fps
    this.time.on('tick', () => {
      this.camera.camera.lookAt(this.cube.position)

      // When tab is not visible (tab is not active or window is minimized), browser stops requesting animation frames. Thus, this does not work
      // if the window is only in the background without focus (for example, if you select another window without minimizing the browser one),
      // which might cause some performance or batteries issues when testing on multiple browsers
      if (!(this.renderOnBlur?.activated && !document.hasFocus())) {
        this.renderer.render(this.scene, this.camera.camera)
      }
    })

    if (this.debug) {
      this.renderOnBlur = { activated: true }
      const folder = this.debug.addFolder({
        title: 'Renderer',
        expanded: true
      })
      folder.addInput(this.renderOnBlur, 'activated', {
        label: 'Render on window blur'
      })
    }
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      time: this.time
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setTarget() {
    const geometry = new BoxGeometry(3, 3, 3)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    this.cube = new Mesh(geometry, material)
    this.cube.visible = false
    this.cube.position.set(35, 13, 0)
    this.scene.add(this.cube)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      assets: this.assets
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new Pane()
    }
  }
}
