import 'common/index.css'
import Dungeon from './Engine/Dungeon'

const canvas = document.getElementById('canvas')
let instance = new Dungeon('test')
instance.init(canvas)

canvas.width = instance.winWidth
canvas.height = instance.winHeight

let sprite = new Dungeon.Sprite({
  name: 'main',
  x: 0,
  y: 50,
  width: 50,
  height: 50,
  anchorPoint: [0, 0],
  velocityX: 0,
  velocityY: 0,
  state: {
    hurt: 50
  }
})
let enemy = new Dungeon.Sprite({
  name: 'enemy',
  x: 0,
  y: 450,
  width: 50,
  height: 50,
  anchorPoint: [0, 0],
  state: {
    hp: 1000
  }
})
let painter = new Dungeon.BallPainter({
  name: 'test',
  fill: true,
  fillStyle: '#999999'
})
sprite.addPainter(painter)
enemy.addPainter(painter)
let move = new Dungeon.Behavior({
  name: 'move',
  state: {
    index: 0
  },
  func: function (sp, context, time) {
    if (parseInt(instance.FPS)) {
      sp.left = sp.left + sp.velocityX / parseInt(instance.FPS)
      sp.top = sp.top + sp.velocityY / parseInt(instance.FPS)
    }
  }
})
let conclusion = new Dungeon.Behavior({
  name: 'conclusion',
  func: function (sp, context, time) {
    let [sx, sy] = [sp.left, sp.top]
    instance.Sprites.map((othersp) => {
      if (othersp.name !== 'bullet' && othersp.name !== 'main') {
        let distance = Math.sqrt(Math.pow((Math.abs(sx - othersp.left)), 2) + Math.pow((Math.abs(sy - othersp.top)), 2))
        if (distance < othersp.width / 2) {
          instance.removeSprite(sp)
          othersp.width += 5
        }
      }
    })
  }
})
sprite.addBehavior(move)
instance.addSprite(sprite)
instance.addSprite(enemy)
instance.setCoordinate('xyc')
instance.loaded(function () {
  this.start()
})
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 65) {
    sprite.VX = -100
  } else if (e.keyCode === 87) {
    sprite.VY = 100
  } else if (e.keyCode === 68) {
    sprite.VX = 100
  } else if (e.keyCode === 83) {
    sprite.VY = -100
  } else if (e.keyCode === 74) {
    fire(sprite)
  }
})
window.addEventListener('keyup', (e) => {
  if (e.keyCode === 65) {
    sprite.VX = 0
  } else if (e.keyCode === 87) {
    sprite.VY = 0
  } else if (e.keyCode === 68) {
    sprite.VX = 0
  } else if (e.keyCode === 83) {
    sprite.VY = 0
  }
})

function fire (sprite) {
  let vx, vy, direction, posx, posy
  const speed = 500
  direction = sprite.direction
  posx = sprite.left
  posy = sprite.top
  vx = speed * direction.cos
  vy = speed * direction.sin
  let bullet = new Dungeon.Sprite({
    name: 'bullet',
    x: posx,
    y: posy,
    width: 20,
    height: 20,
    anchorPoint: [0, 0]
  })
  bullet.VX = vx
  bullet.VY = vy
  bullet.addPainter(painter)
  bullet.addBehavior(move)
  bullet.addBehavior(conclusion)
  instance.addSprite(bullet)
}
