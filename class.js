class Sprite {
    constructor({position, image, frames = {max: 1}, sprites, framesS = [{max: 1, h: 1, w: 1}], animate = false}) {
        console.log()
        this.position = position
        this.images = image

        this.currentImageIndex = 0
        this.frames = {...frames, val: 0, elapsed: 0}
        this.images[this.currentImageIndex].onload = () => {
            this.width = this.images[this.currentImageIndex].width / this.frames.max
            this.height = this.images[this.currentImageIndex].height
        }
        this.animate = animate
        this.sprites = sprites
        this.framesS = framesS
        this.maxFrames = frames.max
    }

    draw() {

        c.drawImage(
            this.images[this.currentImageIndex],
            this.frames.val * this.width,
            0,
            (this.images[this.currentImageIndex].width / this.frames.max),
            (this.images[this.currentImageIndex].height),
            (this.position.x),
            (this.position.y),
            (this.images[this.currentImageIndex].width / this.frames.max * this.framesS[this.currentImageIndex].w),
            (this.images[this.currentImageIndex].height / this.frames.max * this.framesS[this.currentImageIndex].h)
        )
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.currentImageIndex = 0
                this.frames.max = this.maxFrames
                this.frames.val = 0

            }
        }


    }


}

class Player extends Sprite {
    constructor(SpriteOptions, name, health = 100) {
        super(SpriteOptions)
        this.health = health
        this.maxHealth = health
        this.name = name
    }

    attack({attack, recipient, lifeElement}) {
        this.currentImageIndex = 1
        this.frames.max = 6
        recipient.health -= attack.damage
        const lifePercentage = recipient.getLife()
        lifeElement.style.width = `${lifePercentage}%`
        const attackTypeElement = document.querySelector('#tipoataque h1')
        attackTypeElement.textContent = `${this.name} fez ${attack.damage} dano ao ${recipient.name}`

    }

    Regenarate(lifeElementId) {
        this.health = 100
        const lifePercentage = this.getLife()
        const lifeElement = document.querySelector(lifeElementId)
        lifeElement.style.width = `${lifePercentage}%`
    }

    getLife() {
        return (this.health / 100) * this.maxHealth
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
            c.fillStyle = 'rgba(0,0,255,0)'
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
            c.fillStyle = 'rgba(0,255,0,0)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }
}
