/**
 * Dungeon - This is the namespace for GameEngine
 * Engine's updatecycle:
 * willUpdate - this method will called before update
 * haveUpdate - this method will called after update
 * Engine's lifecycle:
 * init - the first to called to init the project
 * loaded - this method will called when the resources loaded
 *
 */
import Sprite from './Sprite/Sprite'
import BallPainter from './Painter/BallPainter'
import ResourceLoader from './Utils/ResourceLoader'
import Behavior from './Behavior/Behavior'
import AnimationTimer from './Timer/AnimationTimer'

require('./Utils/requestAnimation')

class Dungeon {
  static Sprite = Sprite
  static BallPainter = BallPainter
  static ResourceLoader = ResourceLoader
  static Behavior = Behavior
  static AnimationTimer = AnimationTimer
  static winWidth
  static winHeight
  static FPS
  constructor (model = 'product') {
    this.state = 'pending'
    this.sprites = []
    // this is a queue to loaded all the resources
    this.resourcesList = []
    // this is a queue work flow before update
    this.willUpatelist = []
    // this is a queue work flow after update
    this.haveUpdatelist = []
    // when all is ready this func will be called
    this.loadedCallback = function () {}
    this.model = model
    this.transform = []
    // this offscreen canvas is prepared to draw conplex bg
    this.offscreenCanvas = document.createElement('canvas')
    this.offscreenContext = this.offscreenCanvas.getContext('2d')
    // in the test model, the screen will show a fps state
    if (model === 'test') {
      this.fps = document.createElement('p')
      this.fps.style = 'position:fixed;left:0px;top:0px;z-index:1024'
      document.body.appendChild(this.fps)
      this.time = 0
    }
  }

  /**
   * init - bind the canvas and loaded the resources, after all, it will call loadedCallback
   *
   * @param {dom} canvas Description
   *
   */
  init (canvas) {
    let self = this
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.setWin()
    this.loadResources().then((res) => {
      self.loadedCallback(res)
    }, (error) => {
      throw error
    })
  }

  /**
   * setWin - Description get and save the windows' height and width polyfill
   *
   * @return {type} Description
   */
  setWin () {
    if (window.innerWidth) {
      this.winWidth = window.innerWidth
    } else if ((document.body) && (document.body.clientWidth)) {
      this.winWidth = document.body.clientWidth
    }
    // 获取窗口高度
    if (window.innerHeight) {
      this.winHeight = window.innerHeight
    } else if ((document.body) && (document.body.clientHeight)) {
      this.winHeight = document.body.clientHeight
    }
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
      this.winHeight = document.documentElement.clientHeight
      this.winWidth = document.documentElement.clientWidth
    }
  }

  /**
   * setResourceList - Description set the resources List for engine to cache
   *
   * @param {type} res Description
   *
   * @return {type} Description
   */
  setResourceList (res) {
    this.resourcesList = res
  }

  /**
   * setCoordinate - Description set the coordinate
   *
   * @param {string} [pos=xy] Description
   *
   * @return {type} Description
   */
  setCoordinate (pos = 'xy') {
    if (pos === 'xy') {
      // the coordinate system will be a xy, the origin is on the left bottom
      this.context.transform(1, 0, 0, -1, 0, this.winHeight)
      this.transform = [1, 0, 0, -1, 0, this.winHeight]
    }
    if (pos === 'xyc') {
      // the coordinate system will be a xy, the origin is on the center bottom
      this.context.transform(1, 0, 0, -1, this.winWidth / 2, this.winHeight)
      this.transform = [1, 0, 0, -1, this.winWidth / 2, this.winHeight]
    }
    if (typeof pos === Array) {
      this.context.transform(...pos)
      this.transform = pos
    }
  }
  async loadResources () {
    let promises = this.resourcesList.map((res) => {
      ResourceLoader(res)
    })
    let results = await Promise.all(promises)
    return results
  }
  loaded (func) {
    this.loadedCallback = func
  }
  willUpdate () {
    this.willUpatelist.map((func) => {
      func()
    })
  }
  haveUpdate () {
    this.haveUpdatelist.map((func) => {
      func()
    })
  }

  /**
   * setWillUpdateList - Description this used as a queue, it will be execute before sprite update
   *
   * @param {array} funcs Description this should be a arrays of functions
   *
   * @return {type} Description
   */
  setWillUpdateList (funcs) {
    this.willUpatelist = funcs
  }
  // this used as a queue and will be executed after sprite update
  setHaveUpdateList (funcs) {
    this.haveUpdatelist = funcs
  }

  /**
   * addSprite - Description
   *
   * @param {object} sprite Description a sprite object, should be the instance of the sprite
   *
   * @return {type} Description
   */
  addSprite (sprite) {
    this.sprites.push(sprite)
  }
  removeSprite (sp) {
    for (let i in this.sprites) {
      if (this.sprites[i] === sp) {
        delete this.sprites[i]
      }
    }
  }
  removeSpriteByName (name) {
    for (let i in this.sprites) {
      if (this.sprites[i].name === name) {
        delete this.sprites[i]
      }
    }
  }
  /**
   * updateSprite - Description update the sprite, in sprite, it will execute the behavior first and paint it
   *
   * @return {type} Description
   */
  updateSprite () {
    this.Sprites.map((sprite, pos) => {
      if (this.isOutBoundary(sprite)) {
        delete this.sprites[pos]
      } else {
        sprite.update(this.context, this.time)
        sprite.paint(this.context)
      }
    })
  }
  isOutBoundary (sp) {
    let leftBound = -this.transform[4] - sp.width
    let rightBound = this.winWidth - this.transform[4] + sp.width
    let topBound = this.winHeight + sp.height
    let bottomBound = -sp.height
    if (sp.left < leftBound || sp.left > rightBound || sp.top < bottomBound || sp.top > topBound) {
      return true
    } else {
      return false
    }
  }
  get Sprites () {
    return this.sprites.filter((sp) => {
      if (sp) {
        return true
      } else {
        return false
      }
    })
  }
  /**
   * start - Description
   *
   * @return {type} Description start the game loop
   */
  start () {
    this.state = 'running'
    window.requestNextAnimation(this.update.bind(this))
  }

  /**
   * pause - Description pause the game by seting the state to 'pause'
   *
   * @return {type} Description
   */
  pause () {
    this.state = 'pause'
  }

  /**
   * update - Description the game loop
   *
   * @return {type} Description
   */
  update () {
    this.context.clearRect(-this.winWidth / 2, 0, this.winWidth * 1, this.winHeight * 1)
    if (this.state === 'running') {
      if (this.model === 'test') {
        let time = +new Date()
        if (this.time !== 0) {
          let offsetTime = time - this.time
          if (offsetTime > 250) {
            let fps = 1000 * 15 / offsetTime
            this.fps.innerHTML = fps.toFixed() + 'fps'
            this.FPS = fps.toFixed()
            this.time = time
          }
        } else {
          this.time = time
        }
      }
      this.willUpdate()
      this.updateSprite()
      this.haveUpdate()
      window.requestNextAnimation(this.update.bind(this))
    }
  }
}

export default Dungeon
