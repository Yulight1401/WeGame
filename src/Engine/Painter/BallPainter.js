/**
 * BallPainter - to paint a ball on sprite position
 *
 */
import Painter from './Painter'
class BallPainter extends Painter {
  constructor ({fill, fillStyle, stokeStyle, lineCap, lineWidth, lineJoin}) {
    // paint to deliver painting proxy to paintControler
    super(...arguments)
    this.fill = fill
  }
  paint (sprite, context) {
    context.save()
    let anchor = sprite.anchorPoint
    let radius = sprite.width / 2
    let x = sprite.left + sprite.width * anchor[0]
    let y = sprite.top + sprite.height * anchor[1]
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.clip()
    this.decorateContext(context)
    this.fill ? context.fill() : context.stroke()
    context.restore()
  }
}
export default BallPainter
