/**
 * AnimationTimer - set a timer for a duration
 */
class AnimationTimer {
  constructor (duration) {
    this.duration = duration
    this.startTime = 0
    this.elapsedTime = 0
    this.isRunning = false
  }
  start () {
    this.startTime = +new Date()
    this.isRunning = true
  }
  stop () {
    this.elapsedTime = +new Date() - this.startTime
    this.isRunning = false
  }
  getElapsedTime () {
    if (this.isRunning) {
      return (+new Date() - this.startTime)
    } else {
      return this.elapsedTime
    }
  }
  isRunning () {
    return this.isRunning
  }
  isOver () {
    return this.getElapsedTime() > this.duration
  }
}

export default AnimationTimer
