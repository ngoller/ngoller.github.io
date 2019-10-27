class Grub {
    constructor() {
        this._color = 'rgb(120,120,120)'
        this.width = 4
        this.height = 4
        this._v = [0, 0]
        this._a = [0, 0]
        this._p = [0, 0]
    }

    update(dt) {
        this.x += this.vx * dt
        this.y += this.vy * dt
        this.vx += this.ax
        this.vy += this.ay

        this.vx *= .999;
        this.vy *= .999;
    }

    pushTowards(point, strength=1) {
        this.vx += strength * (point[0] - this.x > 0 ? 1 : -1)
        this.vy += strength * (point[1] - this.y > 0 ? 1 : -1)
    }

    setAcceleration(acceleration) {
        this._v.x = acceleration[0]
        this._v.y = acceleration[1]
    }

    setVelocity(velocity) {
        this.vx = velocity[0]
        this.vy = velocity[1]
    }

    setPosition(position) {
        this.x = position[0]
        this.y = position[1]
    }

    draw(canvas, ctx) {
        ctx.fillStyle = this._color;
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    }

    get el() {
        return this._el
    }

    set el(el) {
        this._el = el
    }

    get x() {
        return this._p[0]
    }

    set x(x) {
        this._p[0] = x
    }

    get y() {
        return this._p[1]
    }

    set y(y) {
        this._p[1] = y
    }

    get p() {
        return this._p
    }

    get v() {
        return this._v
    }

    get a() {
        return this._a
    }
    
    get vx() {
        return this._v[0]
    }
    set vx(vx) {
        this._v[0] = vx
    }

    get vy() {
        return this._v[1]
    }
    set vy(vy) {
        this._v[1] = vy
    }

    get ax() {
        return this._a[0]
    }
    set ax(ax) {
        this._a[0] = ax
    }

    get ay() {
        return this._a[1]
    }
    set ay(ay) {
        this._a[1] = ay
    }
}