const canvas = document.querySelector('canvas');
const c =canvas.getContext ('2d')



canvas.width= 1024
canvas.height= 576

let colisionMap = []

for (let i=0; i< colisionsCasa[0].length; i+=20){
   colisionMap.push(colisionsCasa[0].slice(i ,20+i))
}
let entradaMap = []
for (let i=0; i< entradaCasa[0].length; i+=20){
    entradaMap.push(entradaCasa[0].slice(i,20+i))
}


let boundaries = []
let entradas=[]
const offset = {
    mapaCasa : {
        x:400,
        y:32
    },
    mapaOverWorld: {
        x:208,
        y:-1712
    },
    mapaForest:{
        x:130,
        y:96

    },
    mapaCastle:{

        x:-114,
        y:-901
    },
    mapaSandSung:{
        x:400,
        y:-1120
    },
    mapaRuinedTower:{
        x:-120,
        y: -883
    },
    mapaHauntedForest:{
        x:0,
        y:0
    },
    mapaShop:{
        x:204,
        y:-282
    },
    mapaEvilCastle:{
        x:0,
        y:0
    }

}

colisionMap.forEach((row, i) =>{
    row.forEach((symbol,j)=>{
        if (symbol === 1921 || symbol === 3841 ) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.mapaCasa.x,
                        y: i * Boundary.height + offset.mapaCasa.y
                    }
                })
            )
        }
    })
})


entradaMap.forEach((row, i,) =>{
    row.forEach((symbol,j)=>{
        if (symbol === 3865 || symbol === 3864 || symbol === 3863|| symbol ===3866|| symbol ===3862|| symbol === 3860
            || symbol ===3861|| symbol === 3897|| symbol === 3859|| symbol === 3858|| symbol ===1938|| symbol === 1922||symbol===3833){

            entradas.push(
                new Entrada({
                    position:{
                        x:j* Entrada.width + offset.mapaCasa.x,
                        y:i* Entrada.height+ offset.mapaCasa.y,

                    }, symbol
                })
            )

        }
    })
})

function changeCollisions(index,size,offset) {
    colisionMap = []

    for(let  i = 0; i < colisionsCasa[index].length; i += size) {
        colisionMap.push(colisionsCasa[index].slice(i, size + i))

    }

     boundaries=[]

    colisionMap.forEach((row, i,) => {
        row.forEach((symbol, j) => {
            if(symbol === 1921 || symbol === 3841|| symbol === 5761|| symbol === 1937||symbol===3856||symbol===1601||symbol=== 1930|| symbol === 3857
            ){
                boundaries.push(new Boundary({
                    position: {
                        x:j* Boundary.width + offset.x,
                        y:i* Boundary.height+ offset.y
                    }}))

            }

        })
    })
    movables=[background,foreground,...boundaries,...entradas]
}
function changeEntradas(index,size,offset) {
    entradaMap = []

    for(let  i = 0; i < entradaCasa[index].length; i += size) {
        entradaMap.push(entradaCasa[index].slice(i, size + i))

    }

    entradas=[]

    entradaMap.forEach((row, i, ) => {
        row.forEach((symbol, j) => {
            if(symbol === 3865 || symbol === 3864 || symbol === 3863|| symbol ===3866|| symbol ===3862|| symbol === 3860
                || symbol ===3861|| symbol === 3859|| symbol === 3858|| symbol ===1938|| symbol === 5777
                || symbol===1922|| symbol===3867|| symbol===1617|| symbol===5778|| symbol===5789||symbol===1947||symbol === 3897||symbol===3833||symbol===5888){
                entradas.push(new Entrada({
                    position: {
                        x:j* Entrada.width + offset.x,
                        y:i* Entrada.height+ offset.y
                    },
                symbol
                }))

            }

        })
    })
    movables=[background,foreground,...boundaries,...entradas]
}


const image = new Image()
image.src='./img/casa.png'

const foregroundImage = new Image()
foregroundImage.src='./foreground/ForestFG.png'

const playerImage = new Image()
playerImage.src = './img/mainChar.png'


const player= new Sprite({
    position:{
        x:canvas.width/2-96/4 / 2,
        y:canvas.height/2-128/2
    },
    image:playerImage,
    framesa:{
        max:3
    },
    framesb:{
        max:4
    },
    framesc:{
        max:2.3
    }

})



const background = new Sprite({
    position:{

    x:offset.mapaCasa.x,
    y:offset.mapaCasa.y
    },
    image: image

})
const foreground = new Sprite({
    position:{

        x:offset.mapaCasa.x,
        y:offset.mapaCasa.y
    },
    image: foregroundImage

})

const keys = {
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    }
}

let movables=[background,...boundaries,...entradas]
function rectangleColision({rectangle1, rectangle2}){
    return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x<= rectangle2.position.x+ rectangle2.width
        && rectangle1.position.y<= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height>= rectangle2.position.y
    )
}
function rectangleEntrada({rectangle1, rectangle3}){
    return(rectangle1.position.x + rectangle1.width >= rectangle3.position.x
        && rectangle1.position.x<= rectangle3.position.x+ rectangle3.width
        && rectangle1.position.y<= rectangle3.position.y + rectangle3.height
        && rectangle1.position.y + rectangle1.height>= rectangle3.position.y
    )
}
let drawforeground=false
//animation-----------------------------------------
    function animate(){
    window.requestAnimationFrame(animate)
        c.clearRect(0,0,canvas.width,canvas.height)
        background.draw()
        boundaries.forEach(boundary => {
            boundary.draw()
            if(
                rectangleColision({
                    rectangle1:player,
                    rectangle2:boundary
                })
            ){
                console.log('coliding')
            }
        })
        entradas.forEach(entrada => {
            entrada.draw()
            if(rectangleEntrada({
                    rectangle1:player,
                    rectangle3:entrada
                })
            ){
                switch(true){
                    case(entrada.symbol===1938):
                        drawforeground=false
                        offset.mapaOverWorld.x=208
                        offset.mapaOverWorld.y=-1712
                        image.src='./img/Overworld.png'
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=208
                        background.position.y=-1712
                        break
                    case(entrada.symbol===3897):
                        drawforeground=false
                        image.src='./img/casa.png'
                        offset.mapaCasa.x=262
                        offset.mapaCasa.y=-259
                        changeCollisions(0,20,offset.mapaCasa)
                        changeEntradas(0,20,offset.mapaCasa)
                        background.position.x=262
                        background.position.y=-259
                        break
                    case(entrada.symbol===3858):
                        drawforeground=true
                        image.src='./img/Forest.png'
                        foregroundImage.src='./foreground/ForestFG.png'
                        changeCollisions(2,25,offset.mapaForest)
                        changeEntradas(2,25,offset.mapaForest)
                        background.position.x=130
                        background.position.y=98
                        foreground.position.x=130
                        foreground.position.y=98
                        break
                    case(entrada.symbol===5777):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-56
                        offset.mapaOverWorld.y=-1736
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-56
                        background.position.y=-1736
                        break
                    case(entrada.symbol===3860):
                        drawforeground=true
                        image.src='./img/castle.png'
                        foregroundImage.src='./foreground/castleFG.png'
                        changeCollisions(3,40,offset.mapaCastle)
                        changeEntradas(3,40,offset.mapaCastle)
                        background.position.x=-114
                        background.position.y=-894
                        foreground.position.x=-114
                        foreground.position.y=-894
                        break
                    case (entrada.symbol===1922):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=232
                        offset.mapaOverWorld.y=-1313
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=232
                        background.position.y=-1313
                        break
                    case (entrada.symbol===3859):
                        drawforeground=true
                        image.src='./img/sand sung.png'
                        foregroundImage.src='./foreground/sand sungFG.png'
                        changeCollisions(4,50,offset.mapaSandSung)
                        changeEntradas(4,50,offset.mapaSandSung)
                        background.position.x=400
                        background.position.y=-1122
                        foreground.position.x=400
                        foreground.position.y=-1122
                        break
                    case (entrada.symbol===3867):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-500
                        offset.mapaOverWorld.y=-1670
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-500
                        background.position.y=-1670
                        break
                    case (entrada.symbol===1617):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-470
                        offset.mapaOverWorld.y=-1316
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-470
                        background.position.y=-1316
                        break
                    case (entrada.symbol===3861):
                        drawforeground=true
                        image.src='./img/ruined tower.png'
                        foregroundImage.src='./foreground/ruined towerFG.png'
                        changeCollisions(5,40,offset.mapaRuinedTower)
                        changeEntradas(5,40,offset.mapaRuinedTower)
                        background.position.x=-120
                        background.position.y=-883
                        foreground.position.x=-120
                        foreground.position.y=-883
                        break
                    case (entrada.symbol===3862):
                        drawforeground=true
                        image.src='./img/haunted forest.png'
                        foregroundImage.src='./foreground/haunted forestFG.png'
                        offset.mapaHauntedForest.x=-441
                        offset.mapaHauntedForest.y=-1560
                        changeCollisions(6,60,offset.mapaHauntedForest)
                        changeEntradas(6,60,offset.mapaHauntedForest)
                        background.position.x=-441
                        background.position.y=-1560
                        foreground.position.x=-441
                        foreground.position.y=-1560
                        break
                    case (entrada.symbol===3863):
                        drawforeground=true
                        image.src='./img/haunted forest.png'
                        foregroundImage.src='./foreground/haunted forestFG.png'
                        offset.mapaHauntedForest.x=-441
                        offset.mapaHauntedForest.y=24
                        changeCollisions(6,60,offset.mapaHauntedForest)
                        changeEntradas(6,60,offset.mapaHauntedForest)
                        background.position.x=-441
                        background.position.y=24
                        foreground.position.x=-441
                        foreground.position.y=24

                        break
                    case (entrada.symbol===5778):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-86
                        offset.mapaOverWorld.y=-422
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-86
                        background.position.y=-422
                        break
                    case (entrada.symbol===5789):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-83
                        offset.mapaOverWorld.y=-842
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-83
                        background.position.y=-842
                        break
                    case (entrada.symbol===1947):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-26
                        offset.mapaOverWorld.y=-362
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-26
                        background.position.y=-362
                        break
                    case(entrada.symbol===3864):
                        drawforeground=false
                        image.src='./img/shop.png'
                        offset.mapaShop.x=201
                        offset.mapaShop.y=-285
                        changeCollisions(7,20,offset.mapaShop)
                        changeEntradas(7,20,offset.mapaShop)
                        background.position.x=201
                        background.position.y=-285
                        break
                    case (entrada.symbol===3833):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-83
                        offset.mapaOverWorld.y=-161
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-83
                        background.position.y=-161
                        break
                    case(entrada.symbol===3865):
                        drawforeground=true
                        image.src='./img/evil castle.png'
                        foregroundImage.src='./foreground/evil castleFG.png'
                        offset.mapaEvilCastle.x=-117
                        offset.mapaEvilCastle.y=-930
                        changeCollisions(8,40,offset.mapaEvilCastle)
                        changeEntradas(8,40,offset.mapaEvilCastle)
                        background.position.x=-117
                        background.position.y=-930
                        foreground.position.x=-117
                        foreground.position.y=-930
                        break
                    case(entrada.symbol===3866):
                        drawforeground=true
                        image.src='./img/Forest.png'
                        foregroundImage.src='./foreground/ForestFG.png'
                        changeCollisions(2,25,offset.mapaForest)
                        changeEntradas(9,25,offset.mapaForest)
                        background.position.x=130
                        background.position.y=98
                        foreground.position.x=130
                        foreground.position.y=98
                        break

                    case (entrada.symbol===5888):
                        drawforeground=false
                        image.src='./img/Overworld.png'
                        offset.mapaOverWorld.x=-371
                        offset.mapaOverWorld.y=-356
                        changeCollisions(1,40,offset.mapaOverWorld)
                        changeEntradas(1,40,offset.mapaOverWorld)
                        background.position.x=-371
                        background.position.y=-356
                        break
                }
            }
        })
        player.draw()
        if(drawforeground===true){
        foreground.draw()}
       console.log(background.position.x,background.position.y)



        //movimento-velocidade
        let moving=true
        if(keys.w.pressed && lastKey==='w') {
            for (let i = 0;i < boundaries.length; i++){
                let boundary=boundaries[i]
                if(rectangleColision({
                        rectangle1:player,
                        rectangle2: {...boundary, position:{
                            x:boundary.position.x,
                            y:boundary.position.y+3
                            }}
                    })
                ){
                    console.log('coliding')
                    moving=true
                    break
                }}
            /*for (let i = 0;i < entradas.length; i++){
                        let  entrada=entradas[i]
                        if(rectangleEntrada({
                            rectangle1:player,
                            rectangle3: {...entrada, position:{
                                    x:entrada.position.x,
                                    y:entrada.position.y+3
                                }}
                        })
                        ){
                            if(entrada.symbol === 3865 || entrada.symbol === 3864 || entrada.symbol === 3863|| entrada.symbol ===3866|| entrada.symbol ===3862|| entrada.symbol === 3860
                                || entrada.symbol ===3861|| entrada.symbol === 3857|| entrada.symbol === 3859|| entrada.symbol === 3858|| entrada.symbol ===1937)
                            console.log('entrar!')



                        }}*/

            if(moving)
            movables.forEach((movable) => { movable.position.y+=3})
        }
        else if(keys.a.pressed && lastKey==='a') {for (let i = 0;i < boundaries.length; i++){
            let boundary=boundaries[i]
            if(rectangleColision({
                rectangle1:player,
                rectangle2: {...boundary, position:{
                        x:boundary.position.x+3,
                        y:boundary.position.y
                    }}
            })
            ){
                console.log('coliding')
                moving=true
                break
            }
        }
            if(moving)
            movables.forEach((movable) => { movable.position.x+=3})

        }

        else if(keys.s.pressed && lastKey==='s') {
            for (let i = 0;i < boundaries.length; i++){
                let boundary=boundaries[i]
                if(rectangleColision({
                    rectangle1:player,
                    rectangle2: {...boundary, position:{
                            x:boundary.position.x,
                            y:boundary.position.y-3
                        }}
                })
                ){
                    console.log('coliding')
                    moving=true
                    break
                }
            }
            if(moving)
            movables.forEach((movable) => { movable.position.y-=3})

        }
        else if(keys.d.pressed && lastKey==='d') {
            for (let i = 0;i < boundaries.length; i++){
                let boundary=boundaries[i]
                if(rectangleColision({
                    rectangle1:player,
                    rectangle2: {...boundary, position:{
                            x:boundary.position.x-3,
                            y:boundary.position.y
                        }}
                })
                ){
                    console.log('coliding')
                    moving=true
                    break
                }
            }
            if(moving)
            movables.forEach((movable) => { movable.position.x-=3})

        }


    }
animate()
//movimento
let lastKey=''
window.addEventListener('keydown',(e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed=true
            lastKey='w'
            break

        case'a':
            keys.a.pressed=true
            lastKey='a'
            break

        case 's':
            keys.s.pressed=true
            lastKey='s'
            break

        case 'd':
            keys.d.pressed=true
            lastKey='d'
            break

    }
})
window.addEventListener('keyup',(e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed=false
            break

        case'a':
            keys.a.pressed=false
            break
        case 's':
            keys.s.pressed=false
            break

        case 'd':
            keys.d.pressed=false
            break

    }
})
