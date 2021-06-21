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

// Initialize step
const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const BOUNCE_FACTOR = 0.8

let GRAVITY = 100

let rAf


const shapes = []

const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d') 
const gravityValue = document.getElementById('gravity')

canvas.width = CANVAS_WIDTH * devicePixelRatio
  canvas.height = CANVAS_HEIGHT * devicePixelRatio

  canvas.style.width = `${CANVAS_WIDTH}px`
  canvas.style.height = `${CANVAS_HEIGHT}px`

let rect = canvas.getBoundingClientRect()
console.log(rect)

///////////////////////////////////////////////////////////

window.onresize = () => {
  console.log('resize')

  canvas.width = CANVAS_WIDTH * devicePixelRatio
  canvas.height = CANVAS_HEIGHT * devicePixelRatio

  canvas.style.width = `${CANVAS_WIDTH}px`
  canvas.style.height = `${CANVAS_HEIGHT}px`

  rect = canvas.getBoundingClientRect()
  console.log(rect)
}

function initNewObject(canvas, event) {
  let posX = event.layerX
  const posY = event.layerY
  const randRadius = 10 + Math.random() * 15
  let shape
  console.log({devicePixelRatio})
  if(Math.random() < .5){
    if (posX > canvas.width - randRadius) {
      posX = canvas.width - randRadius
    }
    shape = new Rectangle({
          x: posX * devicePixelRatio,
          y: posY * devicePixelRatio,
          width: randRadius,
          height: randRadius,
          color: getRandRGBColor(),
          velocityY: 0,
          gravity: GRAVITY
        })
  }else{
    if(posX < randRadius){
      posX = randRadius
    } else if (posX > canvas.width - randRadius) {
      posX = canvas.width - randRadius
    }
    shape = new Circle({
      x: posX * devicePixelRatio,
          y: posY * devicePixelRatio,
      radius: randRadius,
      color: getRandRGBColor(),
      velocityY: 0,
      gravity: GRAVITY
    })
  }

  
  shapes.push(shape)
}

canvas.addEventListener('mousedown', function(e) {
  initNewObject(canvas, e)
})

gravityValue.addEventListener('change', function(e) {
  const updatedGravity = Number(gravityValue.value)
  GRAVITY = updatedGravity
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


    // ---[]-------------

    if (item instanceof Rectangle && item.y + item.height >= canvas.height) {
      item.y = canvas.height - item.height
      item.velocityY *= -1
      item.velocityY *= BOUNCE_FACTOR
    }

    if (item instanceof Circle && item.y + item.radius > canvas.height) {
      item.y = canvas.height - item.radius
      item.velocityY *= -1
      item.velocityY *= BOUNCE_FACTOR
    }
    //  || 

    item.render(ctx)
  }
  // counter
  ctx.fillStyle = 'black'
  ctx.font ='2em monospace'
  ctx.fillText(shapes.length, canvas.width - 50, 50)

  rAf = requestAnimationFrame(drawFrame)
}

function getRandRGBColor () {
  const randR = Math.round(Math.random() * 255)
  const randG = Math.round(Math.random() * 255)
  const randB = Math.round(Math.random() * 255)
  return `rgb(${randR}, ${randG}, ${randB})`
}
