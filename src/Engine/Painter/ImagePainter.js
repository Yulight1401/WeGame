/**
 * ImagePainter - Paint img on sprite's position
 */
class ImagePainter {
	constructor (imgUrl) {
		this.image = new Image()
		this.image.src = imgUrl
	}
	paint (sprite, context) {
		let anchor = sprite.anchorPoint
		if (this.image.complete) {
			context.drawImage(this.image, sprite.left + sprite.width * anchor[0], sprite.top + sprite.height * anchor[0], sprite.width, sprite.height)
		}
	}
}
