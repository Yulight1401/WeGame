export function mixins (...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}
export function autobind (target) {
  target.bind(target)
}
