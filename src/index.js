import './index.css'

class Rectangle {
  constructor ({
    x = 0,
    y = 0,
    width = 10,
    height = 10,
    color = 'black',
    velocityY = 0,
    gravity = 0,
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color

    this.velocityY = velocityY

    this.gravity = gravity
  }

  update (dt) {
    this.velocityY += this.gravity * dt
    this.y += this.velocityY * dt
  }

  render (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

class Circle {
  constructor ({
    x = 0,
    y = 0,
    radius = 10,
    color = 'black',
    velocityY = 0,
    gravity = 0,
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color

    this.velocityY = velocityY

    this.gravity = gravity
  }

  update (dt) {
    this.velocityY += this.gravity * dt
    this.y += this.velocityY * dt

  }

  render (ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

}

let oldTime = 0
let rAf

// Initialize step
const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

let GRAVITY = 100

let counter = 0

const shapes = []

const dpr = devicePixelRatio
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d') 
const gravityValue = document.getElementById('gravity')

canvas.width = CANVAS_WIDTH * dpr
canvas.height = CANVAS_HEIGHT * dpr

canvas.style.width = `${CANVAS_WIDTH}px`
canvas.style.height = `${CANVAS_HEIGHT}px`

///////////////////////////////////////////////////////////

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  let posX = event.clientX - rect.left
  const posY = event.clientY - rect.top
  const randRadius = 10 + Math.random() * 15
  let shape

  if(Math.round(Math.random())<.5){
    shape = new Rectangle({
          x: posX,
          y: posY,
          width: randRadius,
          height: randRadius,
          color: getRandRGBColor(),
          velocityY: 0,
          gravity: GRAVITY
        })
  }else{
    if(posX < randRadius){
      posX = randRadius
    }
    shape = new Circle({
      x: posX,
      y: posY,
      radius: randRadius,
      color: getRandRGBColor(),
      velocityY: 0,
      gravity: GRAVITY
    })
  }

  
  shapes.push(shape)
}

canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e)
  counter += 1
})

gravityValue.addEventListener('change', function(e) {
  GRAVITY = gravityValue.value
})

///////////////////////////////////////////////////////////


requestAnimationFrame(drawFrame)

// Rendering loop
function drawFrame (ts) {
  ts /= 500
  const dt = ts - oldTime
  oldTime = ts

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height)


  let i = shapes.length
  while (i--) {
    const item = shapes[i]
    item.gravity = GRAVITY
    item.update(dt)

    if (item.y + item.height > canvas.height || item.y + item.radius > canvas.height) {
      if(item.velocityY < GRAVITY){
        item.velocityY = 250
      }

      item.velocityY *= -1 
    }

    item.render(ctx)
  }
  // counter
  ctx.fillStyle = 'black'
  ctx.font ='2em monospace'
  ctx.fillText(counter, 450, 50)

  rAf = requestAnimationFrame(drawFrame)
}

function getRandRGBColor () {
  const randR = Math.round(Math.random() * 255)
  const randG = Math.round(Math.random() * 255)
  const randB = Math.round(Math.random() * 255)
  return `rgb(${randR}, ${randG}, ${randB})`
}
