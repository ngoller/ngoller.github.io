let grubs = []
const sleepTime = 20;
let canvas
let ctx
let previousTime = 0;
let events = {}
let initialState = { mousedown: 0, paused: 0, keyup: 0, reset: false }
let state = {}
let mouse, key, fileInput, offscreenCanvas

function reset(imageData) {
  grubs = []
  canvas = document.querySelector("#canvas")
  offscreenCanvas = document.querySelector("#offscreenCanvas")
  ctx = canvas.getContext('2d', { alpha: false })
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  generateGrubs(imageData)
  previousTime = window.performance.now()
  state = {}
  events = {}
  state = Object.assign(state, initialState);
}

document.addEventListener('DOMContentLoaded', () => {
  reset()
  fileInput = document.querySelector("#fileInput")
  fileInput.addEventListener('change', handleImageUpload)
  requestAnimationFrame(eventLoop)
});

document.addEventListener('mousedown', function (e) {
  events.mousedown = e
  mouse = e
})

document.addEventListener('mouseup', function (e) {
  events.mouseup = e
  mouse = e
})

document.addEventListener('mousemove', function (e) {
  events.mousemove = e
  mouse = e
})

document.addEventListener('keyup', function (e) {
  events.keyup = e
  key = e
})

/**
* The main event loop of the application. Handles updating entities and processing of input
*/
function eventLoop() {
  const dt = window.performance.now() - previousTime
  if (dt < sleepTime) {
    requestAnimationFrame(eventLoop)
    return
  }

  processInputEvents()
  if (state.paused) {
    return
  }
  processState()

  grubs.forEach((grub) => {
    grub.update(dt)
  })

  draw();

  previousTime = window.performance.now()
  requestAnimationFrame(eventLoop)
}

function draw() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  grubs.forEach((grub) => {
    grub.draw(canvas, ctx)
  })
}

function processInputEvents() {
  if (events.mousedown) {
    state.mousedown = 1
  }

  if (events.mouseup) {
    state.mousedown = 0
  }

  if (events.keyup) {
    switch (key.key) {
      case 'r':
        state.reset = true
        break
      case 'f':
        fileInput.click()
        break
      default:
        break
    }
  }

  events = {}
}

function processState() {
  if (state.reset) {
    reset();
  }

  if (state.mousedown) {
    grubs.forEach((grub) => {
      grub.pushTowards([mouse.pageX, mouse.pageY], .005)
    })
  }
}

function getRandomPosition() {
  return [window.innerWidth * Math.random(), window.innerHeight * Math.random()]
}

function generateGrubs(img) {
  if (img) {
    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        const pixel = getPixel(img, i*img.height + j);
        grubs.push(createGrub(300 + j * 4, 150 + i * 4, pixel))
      }
    }
  } else {
    for (let i = 0; i < 120; i++) {
      for (let j = 0; j < 120; j++) {
        grubs.push(createGrub(300 + i * 4, 150 + j * 4))
      }
    }
  }
}

function createGrub(x,y,pixel) {
  const grub = new Grub()
  grub.setPosition([x,y])
  if (pixel) {
    grub._color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  }

  return grub;
}

function handleImageUpload(e) {
  if (e.target.files && e.target.files.length) {
    const image = new Image()
    image.onload = () => {
      offscreenCanvas.width = image.width;
      offscreenCanvas.height = image.height;
      const ctx = offscreenCanvas.getContext("2d")
      ctx.drawImage(image, 0, 0, offscreenCanvas.width, offscreenCanvas.height)
      const idt = ctx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height)
      reset(idt);
    }
    image.src = URL.createObjectURL(e.target.files[0])
  }
}

function getPixel(imgData, index) {
  return imgData.data.subarray(index*4, index*4+4) // Uint8ClampedArray(4) [R,G,B,A]
}
