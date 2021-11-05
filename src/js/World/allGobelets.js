import { Object3D } from 'three'
export default class AllGobelets {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Room'

  }
  createGobelets() {
    this.allGobelets = this.assets.models.allGobelets.scene
    this.container.add(this.allGobelets)
    this.allGobelets.scale.set(5, 5, 5)
  }
}
