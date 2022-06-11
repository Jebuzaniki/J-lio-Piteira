class Sprite{
    constructor ({position,image,framesa= { max:1},framesb= { max:1},framesc= { max:1} }){
        this.position = position
        this.image = image
        this.framesa= framesa
        this.framesb= framesb
        this.framesc= framesc
        this.image.onload=() => {
            this.width = this.image.width / this.framesc.max
            this.height = this.image.height / this.framesc.max
        }
    }
    draw(){

        c.drawImage(this.image,
            0,
            0,
            (this.image.width/this.framesa.max),
            (this.image.height/this.framesb.max),
            (this.position.x),
            (this.position.y),
            (this.image.width/this.framesc.max),
            (this.image.height/this.framesc.max))


    }

}
class Entrada{
    static width=32
    static height=32
    constructor({position,symbol}){
        this.position = position
        this.width =32
        this.height =32
        this.symbol = symbol

    }
    draw( ){
        c.fillStyle = 'rgba(0,0,255,0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Boundary{
    static width=32
    static height=32
    constructor({position}){
        this.position = position
        this.width =32
        this.height =32
    }
    draw( ){
        c.fillStyle = 'rgba(255,0,0,0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}