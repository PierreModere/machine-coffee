import { Object3D } from 'three'
import gsap, { Power4 } from 'gsap'
export default class Desk {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Desk'

    this.createDesk()
  }
  createDesk() {
    this.desk = this.assets.models.desk.scene
    this.container.add(this.desk)
    this.desk.scale.set(5, 5, 5)
    this.desk.position.set(-105, -3.3, 0)
  }
}
