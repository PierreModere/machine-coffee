import { Object3D, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug
    this.time = options.time
    this.cursor = { x: 0, y: 0 }

    // Set up
    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
    this.setPosition()
    this.setMovement()
    window.addEventListener('mousemove', (event) => {
      ;(this.cursor.x = event.clientX / window.innerWidth - 0.5),
        (this.cursor.y = event.clientY / window.innerHeight - 0.5)
    })
    //this.setOrbitControls()
  }
  setCamera() {
    // Create camera
    this.camera = new PerspectiveCamera(
      70,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.1,
      1000
    )
    // this.camera.lookAt(1, 0, 0)
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }
  setPosition() {
    // Set camera position
    this.camera.rotateY(Math.PI * 1.5)
    this.camera.position.x = -55
    this.camera.position.y = 13
    this.camera.position.z = 0
  }
  setMovement() {
    this.time.on('tick', () => {
      this.camera.position.z = -Math.sin(this.cursor.x * Math.PI) * 2
      // this.camera.position.y =
      //   this.container.parent.children[2].position.y +
      //   Math.sin(this.cursor.y * Math.PI)
    })
  }
  setOrbitControls() {
    // Set orbit control
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    )
    this.orbitControls.enabled = false
    this.orbitControls.enableKeys = true
    this.orbitControls.zoomSpeed = 1

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Camera',
        expanded: true,
      })
      this.debugFolder.addInput(this.orbitControls, 'enabled', {
        label: 'OrbitControl',
      })
    }
  }
}
