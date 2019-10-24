const grubs = []
const sleepTime = 20;
let canvas;
let ctx;
let previousTime = 0;
let events = { mousedown: 0, mouseup: 0 }
let state = { mousedown: 0, paused: 0}

document.addEventListener('DOMContentLoaded', () => {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  generateGrubs();
  previousTime = window.performance.now()
	requestAnimationFrame(eventLoop);
});

document.addEventListener('mousedown', function (e) {
	events.mousedown = e
	mouse = e
})

document.addEventListener('mouseup', function (e) {
	events.mouseup = e
	mouse = e
})

document.addEventListener('mousemove', function(e) {
	events.mousemove = e
	mouse = e
})

/**
* The main event loop of the application. Handles updating entities and processing of input
*/
function eventLoop() {
  const dt = window.performance.now() - previousTime
  if (dt < sleepTime) {
    requestAnimationFrame(eventLoop)
    return;
  }

  processState()
  processInputEvents()

  if (state.paused) {
    return;
  }

  grubs.forEach((grub) => {
    grub.update(dt)
  })

  draw();

  previousTime = window.performance.now()
  requestAnimationFrame(eventLoop);
}

function draw() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0, window.innerWidth, window.innerHeight);
  grubs.forEach((grub) => {
    grub.draw(canvas, ctx);
  })
}

function processInputEvents() {
	if (events.mousedown) {
		state.mousedown = 1
	}

	if (events.mouseup) {
		state.mousedown = 0
	}

	events = {}
}

function processState() {
	if (state.mousedown) {
		grubs.forEach((grub) => {
			grub.pushTowards([mouse.pageX, mouse.pageY], .005)
		})
	}
}

function getRandomPosition() {
	return [window.innerWidth * Math.random(), window.innerHeight * Math.random()]
}

function generateGrubs() {
	for (let i = 0; i < 150; i++) {
    for (let j = 0; j < 150; j++) {
      grubs.push(createGrub(i,j));
    }
  }
}

function createGrub(i,j) {
	const grub = new Grub()
	grub.setPosition([300 + i*4,150 + j*4]);

	return grub;
}