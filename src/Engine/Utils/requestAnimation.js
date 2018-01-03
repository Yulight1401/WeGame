
/**
 * requestNextAnimation - This is the polyfill for window.requestanimation
 *
 * @return {function} The window.requestanimation polyfill function
 */
let requestNextAnimation = () => {
  let originalWebkitMethod
  let wrapper
  let callback = function () { console.log('requsestAnimation has polyfilled !') }
  let geckoVersion = 0
  let userAgent = navigator.userAgent
  let index = 0
  let self = this
  callback()
  if (window.webkitRequestAnimationFrame) {
    wrapper = (time) => {
      time === undefined ? time = +new Date() : null
      self.callback(time)
    }
    originalWebkitMethod = window.webkitRequestAnimationFrame
    window.webkitRequestAnimationFrame = (callback, element) => {
      self.callback = callback
      originalWebkitMethod(wrapper, element)
    }
  }
  if (window.mozRequestAnimationFrame) {
    index = userAgent.indexOf('rv:')
    if (userAgent.indexOf('Gecko') !== -1) {
      geckoVersion = userAgent.substr(index + 3, 3)
      if (geckoVersion === '2.0') {
        window.mozRequestAnimationFrame = undefined
      }
    }
  }
  return window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
       window.msRequestAnimationFrame ||
    function (callback, element) {
      let start, finish
      window.setTimeOut(() => {
        start = +new Date()
        callback(start)
        finish = +new Date()
        self.timeout = 1000 / 60 - (finish - start)
      }, self.timeout)
    }
}
window.requestNextAnimation = requestNextAnimation()
