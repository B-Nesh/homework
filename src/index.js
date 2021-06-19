import './index.css'


// Initialize step
const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const dpr = devicePixelRatio
const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d') 

// CanvasRenderingContext2D

canvas.width = CANVAS_WIDTH * dpr
canvas.height = CANVAS_HEIGHT * dpr

canvas.style.width = `${CANVAS_WIDTH}px`
canvas.style.height = `${CANVAS_HEIGHT}px`





