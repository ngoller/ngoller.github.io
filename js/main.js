const grubs = []
const sleepTime = 20;
let previousTime = 0;

document.addEventListener('DOMContentLoaded', function () {
	generateGrubs();

	window.innerWidth

	previousTime = window.performance.now()
	setInterval(eventLoop, sleepTime);
})

function eventLoop() {
	const dt = window.performance.now() - previousTime

	grubs.forEach((grub) => {
		grub.update(dt)
	})

	previousTime = window.performance.now()
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
	grub.setVelocity([0.01, 0.01])

	return grub;
}