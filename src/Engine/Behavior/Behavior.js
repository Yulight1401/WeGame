/**
 * Behavior - Description
 * this is a abstract class
 */
class Behavior {
  constructor ({name, state = {}, func = function () {}}) {
    if (name && name.length > 0) {
      this.name = name
    } else {
      throw Error('behavior need a name')
    }
    this.state = state
    this.func = func
  }
  execute (sp, context, time) {
    this.func(sp, context, time)
  }
}

export default Behavior
