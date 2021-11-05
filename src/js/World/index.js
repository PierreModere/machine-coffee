import { AxesHelper, Object3D } from 'three'
import { Howl, Howler } from 'howler'
import gsap, { Power4 } from 'gsap'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Room from './Room'
import Machine from './Machine'
import Coffee from './Coffee'
import Gobelet from './Gobelet'
import Touillette from './Touillette'
import AllTouillettes from './allTouillettes'
import AllGobelets from './allGobelets'
import Desk from './Desk'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder({
        title: 'World',
        expanded: true,
      })
    }

    this.setLoader()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setRoom()
    this.setMachine()
    this.setCoffee()
    this.setGobelet()
    this.setTouillette()
    this.setAllTouillettes()
    this.setAllGobelets()
    this.setDesk()

    this.setAudio()
  }
  setLoader() {
    this.waitDiv = document.querySelector('.waitScreen')
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.progress.style.width = this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
        }%`
      })

      this.assets.on('ressourcesReady', () => {
        setTimeout(() => {
          this.init()
          this.loadDiv.classList.add('loadScreen-fade')
          this.waitDiv
            .querySelector('.wait-text')
            .addEventListener('click', () => {
              this.waitDiv.classList.add('waitScreen-fade')
              this.playAudio()
              setTimeout(() => {
                this.waitDiv.remove()
              }, 2000)
            })
          setTimeout(() => {
            this.loadDiv.remove()
          }, 2000)
        }, 1000)
      })
    }
  }
  setAudio() {
    this.ambiance = new Howl({
      src: 'sound.mp3',
    })
    this.music = new Howl({
      src: 'music.mp3',
      volume: 0,
    })
    this.coffeeSound = new Howl({
      src: 'coffee.mp3',
      volume: 0.7,
    })

    this.bip = new Howl({
      src: 'bip.mp3',
      volume: 0.3,
    })
  }
  playBip() {
    this.bip.play()
  }
  playAudio() {
    this.ambiance.play()
  }
  lowVolume() {
    gsap.to(this.ambiance, {
      volume: 0.05,
      duration: 7,
      ease: Power4,
    })
    this.music.play()
    gsap.to(this.music, {
      volume: 0.05,
      duration: 5,
      delay: 1,
      ease: Power4,
    })
  }
  lowMusic() {
    gsap.to(this.ambiance, {
      volume: 0,
      duration: 2,
    })
    this.ambiance.stop()

    gsap
      .to(this.music, {
        volume: 0,
        duration: 5,
        delay: 6,
      })
      .then(() => {
        this.music.stop()
      })
  }

  playCoffeeSound() {
    this.coffeeSound.play()
  }
  setAmbientLight() {
    this.ambientlight = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.ambientlight.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setRoom() {
    this.room = new Room({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.room.container)
  }
  setMachine() {
    this.machine = new Machine({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.machine.container)
  }
  setCoffee() {
    this.coffee = new Coffee({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.coffee.container)
  }
  setGobelet() {
    this.gobelet = new Gobelet({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.gobelet.container)
  }
  setTouillette() {
    this.touillette = new Touillette({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.touillette.container)
  }
  setAllTouillettes() {
    this.allTouillettes = new AllTouillettes({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.allTouillettes.container)
  }
  setAllGobelets() {
    this.allGobelets = new AllGobelets({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.allGobelets.container)
  }
  setDesk() {
    this.desk = new Desk({
      time: this.time,
      assets: this.assets,
    })
    this.container.add(this.desk.container)
  }
}
