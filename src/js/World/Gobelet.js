import { Object3D } from 'three'
import gsap, { Power4 } from 'gsap'
export default class Gobelet {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Gobelet'

    // this.createGobelet()
  }
  createGobelet() {
    this.gobelet = this.assets.models.gobelet.scene
    this.container.add(this.gobelet)
    this.gobelet.scale.set(5, 5, 5)
    this.gobelet.position.x = 37
    this.gobelet.position.y = 8
    this.gobelet.position.z = 0
  }
  animateGobelet() {
    let tl = gsap.timeline()
    tl.to(this.gobelet.position, { y: 5, duration: 0.3, delay: 1.4 })
    tl.to(this.gobelet.position, { y: 5.08, duration: 0.1 })
    tl.to(this.gobelet.position, { y: 5, duration: 0.05 })
  }
}
