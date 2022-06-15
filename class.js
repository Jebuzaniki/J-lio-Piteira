class Sprite {
    constructor({position, image, frames = {max: 1}, sprites, framesS = {max: 1, h: 1, w: 1}, animate = false}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.framesS = framesS
    }

    draw() {

        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            (this.image.width / this.frames.max),
            (this.image.height),
            (this.position.x),
            (this.position.y),
            (this.image.width / this.frames.max * this.framesS.w),
            (this.image.height / this.frames.max * this.framesS.h)
        )
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else this.frames.val = 0
        }


    }


}

class Entrada {
    static width = 32
    static height = 32

    constructor({position, symbol, color}) {
        this.color = color
        this.position = position
        this.width = 32
        this.height = 32
        this.symbol = symbol

    }

    draw() {
        if (this.color === 'blu') {
            c.fillStyle = 'rgba(0,0,255,0.2)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }
}


class Boundary {
    static width = 32
    static height = 32

    constructor({position, color}) {
        this.color = color
        this.position = position
        this.width = 32
        this.height = 32
    }

    draw() {
        if (this.color === 'red') {
            c.fillStyle = 'rgba(255,0,0,0.2)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        if (this.color === 'green') {
            c.fillStyle = 'rgba(0,255,0,0.2)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }
}
