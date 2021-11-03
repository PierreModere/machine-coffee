import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
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

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    document.addEventListener('click', this.openDoors.bind(this))
  }
  openDoors() {
    const trapdoor =this.world.room.room.children[0].children[3].children[2];
    const door = this.world.room.room.children[0].children[2].rotation
    const door2 = this.world.room.room.children[0].children[0].rotation
    const camera = this.camera.camera

    gsap.to(door, {
      y: -Math.PI * 1.1,
      duration: 2.5,
      ease: Power4.easeOut,
    })
    gsap
      .to(door2, {
        y: Math.PI * 1.1,
        duration: 2.5,
        ease: Power4.easeOut,
      })
      .then(
        gsap.to(camera.position, {
          x: 20,
          y:10,
          delay: 0.5,
          duration: 2.8,
          ease: Power3,
        }),
        gsap.to(trapdoor.position, {
          x: 0,
          delay: 1.5,
          duration: 1,
          ease: Power3,
        })
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
      powerPreference: 'high-performance',
    })
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.gammaFactor = 2.2
    // Set background color
    this.renderer.setClearColor(0x212121, 1)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    // Set RequestAnimationFrame with 60fps
    this.time.on('tick', () => {
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
        expanded: true,
      })
      folder.addInput(this.renderOnBlur, 'activated', {
        label: 'Render on window blur',
      })
    }
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      time: this.time,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
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
