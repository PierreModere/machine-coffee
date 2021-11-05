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
    this.container.add(this.machine)
    this.machine.scale.set(5, 5, 5)
    this.machine.position.x = 37
    this.machine.position.y = -20
    this.machine.position.z = 0
    this.machine.rotateY(Math.PI / 2.2)
    this.setText('text1')
  }
  setText(textNumber) {
    setTimeout(() => {
      this.machine.children[0].children[11].children[1].material.map =
        this.assets.textures[textNumber]
      this.machine.children[0].children[11].children[1].material.map.flipY = false
    }, 1500)
  }
}
