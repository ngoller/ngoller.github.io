class Grub {
	constructor(el) {
        this._el = el
        el.classList.add('grub')
    }

    get el() {
        return this._el
    }

    set el(el) {
        this._el = el
    }

    setPosition(position) {
        this.setX(position.x)
        this.setY(position.y)
    }

    setX (x) {
        this._el.style.left = x
    }

    setY (y) {
        this._el.style.top = y
    }
}