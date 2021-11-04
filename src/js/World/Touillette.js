import { Object3D } from 'three'
import gsap, { Power4 } from 'gsap'
export default class Touillette {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Touillette'

    // this.createGobelet()
  }
  createTouillette() {
    this.touillette = this.assets.models.touillette.scene
    this.container.add(this.touillette)
    this.touillette.scale.set(5, 5, 5)
    this.touillette.position.x = 37
    this.touillette.position.y = 8
    this.touillette.position.z = 0
  }
  animateTouillette() {
    let tl = gsap.timeline()
    tl.to(this.touillette.position, { y: 5, duration: 0.3, delay: 2 })
    tl.to(this.touillette.position, { y: 5.1, duration: 0.1 })
    tl.to(this.touillette.position, { y: 5, duration: 0.05 })
  }
}
