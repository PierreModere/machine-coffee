import { Object3D, AnimationMixer, Clock, LoopOnce } from 'three'
import gsap, { Power4 } from 'gsap'
export default class AllTouillettes {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'AllTouillettes'

    // this.createGobelet()
  }
  createTouillettes() {
    this.allTouillettes = this.assets.models.allTouillettes.scene
    this.container.add(this.allTouillettes)
    this.allTouillettes.scale.set(5, 5, 5)
    this.allTouillettes.position.x = 37
    this.allTouillettes.position.y = 5
    this.allTouillettes.position.z = 0
    this.mixer = new AnimationMixer(this.assets.models.allTouillettes.scene)

    this.clock = new Clock()

    this.assets.models.allTouillettes.animations.forEach((clip) => {
      let anim = this.mixer.clipAction(clip)
      anim.setLoop(LoopOnce)
      anim.clampWhenFinished = true
      anim.enable = true
      setTimeout(() => {
        anim.play()
      }, 3650)
    })

    this.animateTouillettes()
  }
  animateTouillettes() {
    this.time.on('tick', () => {
      var delta = this.clock.getDelta()
      this.mixer.update(delta)
    })
  }
}
