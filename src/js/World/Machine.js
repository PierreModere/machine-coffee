import { Object3D } from 'three'
export default class Machine {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Machine'

    this.createMachine()
  }
  createMachine() {
    this.machine = this.assets.models.machine.scene
    this.container.add(this.room)
    this.machine.scale.set(5, 5, 5)
  }

}
