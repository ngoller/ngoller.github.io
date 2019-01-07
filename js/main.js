const grubs = []
const sleepTime = 20;

document.addEventListener('DOMContentLoaded', function () {
	generateGrubs();

	window.innerWidth

	setInterval(eventLoop, sleepTime);
})

function eventLoop () {
	grubs.each
}

function getRandomPosition () {
	return { x: window.innerWidth * Math.random(), y: window.innerHeight * Math.random() }
}

function generateGrubs () {
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

function createGrub () {
	const grub = new Grub(document.createElement('div'));
	grub.setPosition(getRandomPosition())

	return grub;
}