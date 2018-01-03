/**
 * SpriteAnimator - Description
 */
 class SpriteAnimator {
	constructor (painters, elapsedCallback, duration) {
		this.painters = painters || []
		this.elapsedCallback = elapsedCallback
		this.duration = duration || 1000
		this.startTime = 0
		this.index = 0
	}

 /**
  * end - Description
  *
  * @param {type} sprite          Description
  * @param {type} originalPainter Description
  *
  * @return {type} Description
  */
	end (sprite, originalPainter) {
		sprite.animating = false
		this.elapsedCallback ? this.elapsedCallback(sprite) : sprite.painter = originalPainter
	}

 /**
  * start - Description
  *
  * @param {type} sprite   Description
  * @param {type} duration Description
  *
  * @return {type} Description
  */
	start (sprite, duration) {
		let endTime = (new Date()).getTime() + duration,
			period = duration / (this.painters.length),
			animator = this,
			originalPainter = sprite.painter,
			lastUpdate = 0

		this.index = 0
		sprite.animating =true
		sprite.painter = this.painters[this.index]

	}
}
