import { Object3D } from 'three'
export default class Room {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Room'

    this.createRoom()
    this.setMovement()
  }
  createRoom() {
    this.room = this.assets.models.room.scene
    this.container.add(this.room)
    this.room.scale.set(5, 5, 5)
    this.room.children[0].children[4].children[2].position.x=30
  }

}
