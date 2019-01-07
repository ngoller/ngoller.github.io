const grubs = []
const sleepTime = 20;
let previousTime = 0;
let events = { mousedown: 0, mouseup: 0 }
let state = { mousedown: 0, paused: 0}
// last mouse event
let mouse = {}

/**
 * Set up event listeners
 */
document.addEventListener('DOMContentLoaded', function () {
	generateGrubs();

	window.innerWidth

	previousTime = window.performance.now()
	setInterval(eventLoop, sleepTime);
})

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
	processState()
	processInputEvents()
	
	if (state.paused) {
		return;
	}

	grubs.forEach((grub) => {
		grub.update(dt)
	})

	previousTime = window.performance.now()
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
	const body = document.querySelector('body')
	const innerHeight = window.innerHeight
	const innerWidth = window.innerWidth
	console.info('DOM Content Loaded... beginning festivities.')
	for (let i = 0; i < 20; i++) {
		const grub = createGrub()
		grubs.push(grub)

		body.appendChild(grub.el)
	}
}

function createGrub() {
	const grub = new Grub();
	grub.setPosition(getRandomPosition())
	grub.setVelocity([(Math.random() - .5) / 50, (Math.random() - .5) / 50])

	return grub;
}