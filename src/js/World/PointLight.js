import {
  Object3D,
  DirectionalLight,
  DirectionalLightHelper,
  Color,
} from 'three'
import gsap from 'gsap'
export default class PointLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Point Light'
    this.params = {
      color: 0xffffff,
      positionX: 20,
      positionY: 15,
      positionZ: 0,
    }
    this.createPointLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  upLight() {
    gsap.to(this.light, { intensity: 1, duration: 5 })
  }
  downLight() {
    gsap.to(this.light, { intensity: -0.1, duration: 1 })
  }
  createPointLight() {
    this.light = new DirectionalLight(0xffffff, 0.2)
    this.light.position.set(-50, 25, 0)
    this.light.castShadow = true
    this.light.shadow.radius = 2
    this.light.shadow.mapSize.width = 1024
    this.light.shadow.mapSize.height = 1024

    this.light.shadow.camera.top = 170
    this.light.shadow.camera.bottom = -70
    this.light.shadow.camera.left = -150
    this.light.shadow.camera.right = 150
    this.light.shadow.camera.near = 25
    this.light.shadow.camera.far = 250
    this.light.shadow.bias = -0.005

    this.container.add(this.light)
  }
  setDebug() {
    // Color debug
    this.debugFolder = this.debug.addFolder({
      title: 'Point Light',
      expanded: true,
    })
    this.debugFolder.addInput(this.params, 'color').on('change', () => {
      this.light.color = new Color(this.params.color)
    })
    //Position debug
    this.debugFolder.addInput(this.light.position, 'x', {
      min: -5,
      max: 5,
      step: 0.1,
    })
    this.debugFolder.addInput(this.light.position, 'y', {
      min: -5,
      max: 5,
      step: 0.1,
    })
    this.debugFolder.addInput(this.light.position, 'z', {
      min: -5,
      max: 5,
      step: 0.1,
    })
  }
}
