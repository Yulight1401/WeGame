
/**
 * Painter - This is the abstract class for custom Painters to extend
 */
class Painter {
  constructor ({name, fillStyle = '#000000', stokeStyle = '#000000', lineCap = 'round', lineJoin = 'round', lineWidth = 10, miterLimit = 5}) {
    // paint to deliver painting proxy to paintControler
    if (new.target === Painter) {
      throw new Error('This is the abstract class for custom Painters to extend')
    }
    if (name && name.length > 0) {
      this.name = name
    } else {
      throw Error('painter need a name')
    }
    this.fillStyle = fillStyle
    this.stokeStyle = stokeStyle
    this.lineJoin = lineJoin
    this.lineWidth = lineWidth
    this.lineCap = lineCap
  }
  decorateContext (context) {
    context.fillStyle = this.fillStyle
    context.stokeStyle = this.stokeStyle
    context.lineJoin = this.lineJoin
    context.lineWidth = this.lineWidth
    context.lineCap = this.lineCap
  }
  paint () {

  }
}
export default Painter
