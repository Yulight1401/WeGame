/**
 * SpriteSheetPainter - print a sheet of imgs of sprite,
 * let sprite to show some actions
 */
class SpriteSheetPainter {
	constructor (url, cells) {
		this.cells = cells || []
		this.cellIndex = 0
		this.image = new Image()
		this.image.src = url
	}
	advance () {
		this.cellIndex == this.cells.length - 1 ? this.cellIndex = 0 : this.cellIndex++
	}
	paint () {
		let cell = this.cells[this.cellIndex]
		let image = this.image
		if (image.complete) {
	      context.drawImage(image, cell.x, cell.y, cell.w, cell.h, sprite.left, sprite.top, cell.w, cell.h)
		}
	}
}
