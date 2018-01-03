/**
 * sprite - Game object for moving execute actions
 * attribute:
 * top - Y of the object
 * left - X of the object
 * width -
 * height -
 * velocityX - the speed on X
 * velocityY - the speed on Y
 * visible -
 * animating - if the sprite is runing a animation
 * behaviors - a sequence of behaviors for sprite to do
 * methods:
 * paint - run painter's paint method to paint the sprite
 * update - execute behaviors sequence
 */
class Sprite {
  /**
   * constructor - Description
   *
   * @param {string} name      Description
   * @param {painter} painter   Description
   * @param {array<behavior>} behaviors Description
   *
   * @return {type} none
   */
  constructor ({name = '', painters = [], behaviors = [], width = 10, height = 10, x = 0, y = 0, anchorPoint = [0, 0], state = {}, velocityY = 0, velocityX = 0, funcs = {}}) {
    this.name = name
    this.top = y
    this.left = x
    this.width = width
    this.height = height
    this.state = state
    this.funcs = funcs
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.visible = true
    this.animating = false
    this.anchorPoint = anchorPoint
    this.painters = painters
    this.behaviors = behaviors
    this.direction = {
      cos: 0,
      sin: 1
    }
  }
  // paint to deliver painting proxy to paintControler
  paint (context) {
    let self = this
    if (this.visible) {
      this.painters.map((painter) => {
        painter.paint(self, context)
      })
    }
  }
  // to eval sprite behavior
  update (context, time) {
    let self = this
    this.behaviors.map((behavior) => {
      behavior.execute(self, context, time)
    })
  }
  // Behavior and painter should be unique, if there is same painter or behavior in the queue, it won't be pushed.
  addPainter (painter) {
    if (this.isUnique(this.painters, painter)) {
      this.painters.push(painter)
    } else {
    }
  }
  addBehavior (behavior) {
    // console.log(this.isUnique(this.behaviors, behavior))
    if (this.isUnique(this.behaviors, behavior)) {
      this.behaviors.push(behavior)
    } else {
    }
  }
  isUnique (arrays, item) {
    let length = arrays.length
    if (length === 0) {
      return true
    } else {
      for (let i in arrays) {
        if (arrays[i] === item) {
          return false
        }
        if (parseInt(i) === length - 1) {
          return true
        }
      }
    }
  }
  removePainter (p) {
    let index = -1
    this.painters.map((painter, pos) => {
      if (p === painter.name) {
        index = pos
      }
    })
    if (index > -1) {
      this.painters.splice(index, 1)
    }
    return index
  }
  removeBehavior (b) {
    let index = -1
    this.behaviors.map((behavior, pos) => {
      if (b === behavior.name) {
        index = pos
      }
    })
    if (index > -1) {
      this.behaviors.splice(index, 1)
    }
    return index
  }
  setAnchorPoint (point) {
    this.anchorPoint = point
  }
  setPosition (posX, posY) {
    this.left = posX
    this.top = posY
  }
  setArea (width, height) {
    this.width = width
    this.height = height
  }
  set VX (val) {
    let vy = this.velocityY
    if (!(vy === 0 && val === 0)) {
      let d = Math.sqrt(vy * vy + val * val)
      let cos = val / d
      let sin = vy / d
      this.direction.cos = cos
      this.direction.sin = sin
    }
    this.velocityX = val
  }
  get VX () {
    return this.velocityX
  }
  set VY (val) {
    let vx = this.velocityX
    if (!(vx === 0 && val === 0)) {
      let d = Math.sqrt(vx * vx + val * val)
      let cos = vx / d
      let sin = val / d
      this.direction.cos = cos
      this.direction.sin = sin
    }
    this.velocityY = val
  }
  get VY () {
    return this.velocityY
  }
}
export default Sprite
