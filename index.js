const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const audio = {
    Overworld: new Audio('./audio/Overworld.mp3'),
    Battle: new Audio('./audio/Battle.mp3'),
    Slash: new Audio('./audio/Slash.mp3'),
    Smash: new Audio('./audio/Smash.mp3')
}

canvas.width = 1024
canvas.height = 576

let colisionMap = []

for (let i = 0; i < colisionsCasa[0].length; i += 20) {
    colisionMap.push(colisionsCasa[0].slice(i, 20 + i))
}
let entradaMap = []
for (let i = 0; i < entradaCasa[0].length; i += 20) {
    entradaMap.push(entradaCasa[0].slice(i, 20 + i))
}
let battleMap = []
for (let i = 0; i < colisionsCasa[0].length; i += 20) {
    battleMap.push(colisionsCasa[0].slice(i, 20 + i))
}
let boundaries = []
let entradas = []
let battles = []
const offset = {
    mapaCasa: {
        x: 336,
        y: 32
    },
    mapaOverWorld: {
        x: 208,
        y: -1712
    },
    mapaForest: {
        x: 130,
        y: 96

    },
    mapaCastle: {

        x: -123,
        y: -863
    },
    mapaSandSung: {
        x: 400,
        y: -1000
    },
    mapaRuinedTower: {
        x: -120,
        y: -883
    },
    mapaHauntedForest: {
        x: 0,
        y: 0
    },
    mapaShop: {
        x: 204,
        y: -232
    },
    mapaEvilCastle: {
        x: 0,
        y: 0
    }

}
battleMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 0) {
            battles.push(
                new Boundary({
                    color: 'green',
                    position: {
                        x: j * Boundary.width + offset.mapaCasa.x,
                        y: i * Boundary.height + offset.mapaCasa.y
                    }
                })
            )
        }
    })
})


colisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1921 || symbol === 3841) {
            boundaries.push(
                new Boundary({
                    color: 'red',
                    position: {
                        x: j * Boundary.width + offset.mapaCasa.x,
                        y: i * Boundary.height + offset.mapaCasa.y
                    }
                })
            )
        }
    })
})


entradaMap.forEach((row, i,) => {
    row.forEach((symbol, j) => {
        if (symbol === 3865 || symbol === 3864 || symbol === 3863 || symbol === 3866 || symbol === 3862 || symbol === 3860
            || symbol === 3861 || symbol === 3897 || symbol === 3859 || symbol === 3858 || symbol === 1938 || symbol === 1922 || symbol === 3833) {

            entradas.push(
                new Entrada({
                    color: 'blu',
                    position: {

                        x: j * Entrada.width + offset.mapaCasa.x,
                        y: i * Entrada.height + offset.mapaCasa.y,

                    }, symbol
                })
            )

        }
    })
})

function changeBattleArea(index, size, offset) {
    battleMap = []


    for (let i = 0; i < colisionsCasa[index].length; i += size) {
        battleMap.push(colisionsCasa[index].slice(i, size + i))

    }

    battles = []

    battleMap.forEach((row, i,) => {
        row.forEach((symbol, j) => {
            if (symbol === 0) {
                battles.push(new Boundary({
                    color: 'green',
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))

            }

        })
    })
    movables = [background, foreground, ...boundaries, ...entradas, ...battles]
}

function changeCollisions(index, size, offset) {
    colisionMap = []

    for (let i = 0; i < colisionsCasa[index].length; i += size) {
        colisionMap.push(colisionsCasa[index].slice(i, size + i))

    }

    boundaries = []

    colisionMap.forEach((row, i,) => {
        row.forEach((symbol, j) => {
            if (symbol === 1921 || symbol === 3841 || symbol === 5761 || symbol === 1937 || symbol === 3856 || symbol === 1601 || symbol === 1930 || symbol === 3857
            ) {
                boundaries.push(new Boundary({
                    color: 'red',
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))

            }

        })
    })
    movables = [background, foreground, ...boundaries, ...entradas, ...battles]
}

function changeEntradas(index, size, offset) {
    entradaMap = []

    for (let i = 0; i < entradaCasa[index].length; i += size) {
        entradaMap.push(entradaCasa[index].slice(i, size + i))

    }

    entradas = []

    entradaMap.forEach((row, i,) => {
        row.forEach((symbol, j) => {
            if (symbol === 3865 || symbol === 3864 || symbol === 3863 || symbol === 3866 || symbol === 3862 || symbol === 3860
                || symbol === 3861 || symbol === 3859 || symbol === 3858 || symbol === 1938 || symbol === 5777
                || symbol === 1922 || symbol === 3867 || symbol === 1617 || symbol === 5778 || symbol === 5789 || symbol === 1947 || symbol === 3897 || symbol === 3833 || symbol === 5888) {
                entradas.push(new Entrada({
                    color: 'blu',
                    position: {
                        x: j * Entrada.width + offset.x,
                        y: i * Entrada.height + offset.y
                    },
                    symbol
                }))

            }

        })
    })
    movables = [background, foreground, ...boundaries, ...entradas, ...battles]
}


const image = new Image()
image.src = './img/casa.png'

const foregroundImage = new Image()
foregroundImage.src = './foreground/ForestFG.png'

const playerDownImage = new Image()
playerDownImage.src = './img/mainCharF.png'

const playerUpImage = new Image()
playerUpImage.src = './img/mainCharU.png'

const playerRightImage = new Image()
playerRightImage.src = './img/mainCharR.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/mainCharL.png'


const player = new Sprite({
    position: {
        x: canvas.width / 2 - 96 / 2 / 2,
        y: canvas.height / 2 - 32 / 2
    },
    image: [playerDownImage],
    frames: {
        max: 3
    },

    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    },
    framesS: [{
        max: 3,
        w: 1.7,
        h: 4
    }],
    animate: true


})


const background = new Sprite({

    position: {

        x: offset.mapaCasa.x,
        y: offset.mapaCasa.y
    },
    image: [image]

})
const foreground = new Sprite({
    position: {

        x: offset.mapaCasa.x,
        y: offset.mapaCasa.y
    },
    image: [foregroundImage]

})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let movables = [background, ...boundaries, ...entradas, ...battles, foreground]

function rectangleColision({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function rectangleEntrada({rectangle1, rectangle3}) {
    return (rectangle1.position.x + rectangle1.width >= rectangle3.position.x
        && rectangle1.position.x <= rectangle3.position.x + rectangle3.width
        && rectangle1.position.y <= rectangle3.position.y + rectangle3.height
        && rectangle1.position.y + rectangle1.height >= rectangle3.position.y
    )
}

let drawforeground = false
let battlezone = false
const batalha = {
    initiated: false
}
let playerCanAttack = false

//animation-----------------------------------------
function animate() {
    const animationId = window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    player.draw()
    if (drawforeground === true) {
        foreground.draw()
    }
    let moving = true
    player.animate = false
    if (battlezone === true) {


        if (batalha.initiated) return


        battles.forEach(boundary => {
            boundary.draw()
            //para batalhas
            if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
                if (

                    rectangleColision({
                        rectangle1: player,
                        rectangle2: boundary
                    })
                    && (player.width * player.height) / 2
                    && Math.random() < 0.001
                ) {
                    window.cancelAnimationFrame(animationId)
                    console.log('battle')
                    batalha.initiated = true
                    RunBlinkAnimation()
                    setTimeout(function () {
                        animateBattle()
                        playerCanAttack = true
                        const battleMenu = document.querySelector('#battlemenu')
                        battleMenu.classList.remove('hide')
                        playBattle()

                    }, 4000)
                }
            }
        })
    }

    boundaries.forEach(boundary => {
        boundary.draw()
        if (
            rectangleColision({
                rectangle1: player,
                rectangle2: boundary
            })
        ) {

            console.log('coliding')
        }
    })
    entradas.forEach(entrada => {
        entrada.draw()
        const overlappingArea =
            (Math.min(
                    player.position.x + player.width,
                    entrada.position.x + entrada.width
                ) -
                Math.max(player.position.x, entrada.position.x)) *
            (Math.min(
                    player.position.y + player.height,
                    entrada.position.y + entrada.height
                ) -
                Math.max(player.position.y, entrada.position.y))
        if (rectangleEntrada({
                rectangle1: player,
                rectangle3: entrada
            })

            && overlappingArea > (player.width * player.height) / 2


        ) {
            switch (entrada.symbol) {
                case(1938):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        offset.mapaOverWorld.x = 208
                        offset.mapaOverWorld.y = -1712
                        image.src = './img/Overworld.png'
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = 208
                        background.position.y = -1712

                    }, 1000)
                    break
                case(3897):
                    ChangeZone()
                    battlezone = false
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/casa.png'
                        offset.mapaCasa.x = 255
                        offset.mapaCasa.y = -193
                        changeBattleArea(0, 20, offset.mapaCasa)
                        changeCollisions(0, 20, offset.mapaCasa)
                        changeEntradas(0, 20, offset.mapaCasa)
                        background.position.x = 255
                        background.position.y = -193
                    }, 1000)
                    break
                case(3858):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/Forest.png'
                        foregroundImage.src = './foreground/ForestFG.png'
                        changeBattleArea(2, 25, offset.mapaForest)
                        changeCollisions(2, 25, offset.mapaForest)
                        changeEntradas(2, 25, offset.mapaForest)
                        background.position.x = 130
                        background.position.y = 98
                        foreground.position.x = 130
                        foreground.position.y = 98
                    }, 1000)
                    break
                case(5777):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -56
                        offset.mapaOverWorld.y = -1682
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -56
                        background.position.y = -1682
                    }, 1000)
                    break
                case(3860):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = false
                        drawforeground = true
                        image.src = './img/castle.png'
                        foregroundImage.src = './foreground/castleFG.png'
                        changeBattleArea(3, 40, offset.mapaCastle)
                        changeCollisions(3, 40, offset.mapaCastle)
                        changeEntradas(3, 40, offset.mapaCastle)
                        background.position.x = -123
                        background.position.y = -863
                        foreground.position.x = -123
                        foreground.position.y = -863
                    }, 1000)
                    break
                case (1922):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = 220
                        offset.mapaOverWorld.y = -1265
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = 220
                        background.position.y = -1265
                    }, 1000)
                    break
                case (3859):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/sand sung.png'
                        foregroundImage.src = './foreground/sand sungFG.png'
                        changeCollisions(4, 50, offset.mapaSandSung)
                        changeBattleArea(4, 50, offset.mapaSandSung)
                        changeEntradas(4, 50, offset.mapaSandSung)
                        background.position.x = 400
                        background.position.y = -1000
                        foreground.position.x = 400
                        foreground.position.y = -1000
                    }, 1000)
                    break
                case (3867):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -500
                        offset.mapaOverWorld.y = -1622
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -500
                        background.position.y = -1622
                    }, 1000)
                    break
                case (1617):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -470
                        offset.mapaOverWorld.y = -1316
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -470
                        background.position.y = -1316
                    }, 1000)
                    break
                case (3861):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/ruined tower.png'
                        foregroundImage.src = './foreground/ruined towerFG.png'
                        changeBattleArea(5, 40, offset.mapaRuinedTower)
                        changeCollisions(5, 40, offset.mapaRuinedTower)
                        changeEntradas(5, 40, offset.mapaRuinedTower)
                        background.position.x = -120
                        background.position.y = -883
                        foreground.position.x = -120
                        foreground.position.y = -883
                    }, 1000)
                    break
                case (3862):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/haunted forest.png'
                        foregroundImage.src = './foreground/haunted forestFG.png'
                        offset.mapaHauntedForest.x = -441
                        offset.mapaHauntedForest.y = -1460
                        changeBattleArea(6, 60, offset.mapaHauntedForest)
                        changeCollisions(6, 60, offset.mapaHauntedForest)
                        changeEntradas(6, 60, offset.mapaHauntedForest)
                        background.position.x = -441
                        background.position.y = -1460
                        foreground.position.x = -441
                        foreground.position.y = -1460
                    }, 1000)
                    break
                case (3863):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/haunted forest.png'
                        foregroundImage.src = './foreground/haunted forestFG.png'
                        offset.mapaHauntedForest.x = -441
                        offset.mapaHauntedForest.y = 0
                        changeBattleArea(6, 60, offset.mapaHauntedForest)
                        changeCollisions(6, 60, offset.mapaHauntedForest)
                        changeEntradas(6, 60, offset.mapaHauntedForest)
                        background.position.x = -441
                        background.position.y = 0
                        foreground.position.x = -441
                        foreground.position.y = 0
                    }, 1000)

                    break
                case (5778):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -86
                        offset.mapaOverWorld.y = -400
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -86
                        background.position.y = -400
                    }, 1000)
                    break
                case (5789):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -83
                        offset.mapaOverWorld.y = -842
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -83
                        background.position.y = -842
                    }, 1000)
                    break
                case (1947):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -26
                        offset.mapaOverWorld.y = -362
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -26
                        background.position.y = -362
                    }, 1000)
                    break
                case(3864):
                    ChangeZone()
                    battlezone = false
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/shop.png'
                        offset.mapaShop.x = 201
                        offset.mapaShop.y = -232
                        changeBattleArea(7, 20, offset.mapaShop)
                        changeCollisions(7, 20, offset.mapaShop)
                        changeEntradas(7, 20, offset.mapaShop)
                        background.position.x = 201
                        background.position.y = -232
                    }, 1000)
                    break
                case (3833):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -83
                        offset.mapaOverWorld.y = -161
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -83
                        background.position.y = -161
                    }, 1000)
                    break
                case(3865):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/evil castle.png'
                        foregroundImage.src = './foreground/evil castleFG.png'
                        offset.mapaEvilCastle.x = -117
                        offset.mapaEvilCastle.y = -880
                        changeBattleArea(8, 40, offset.mapaEvilCastle)
                        changeCollisions(8, 40, offset.mapaEvilCastle)
                        changeEntradas(8, 40, offset.mapaEvilCastle)
                        background.position.x = -117
                        background.position.y = -880
                        foreground.position.x = -117
                        foreground.position.y = -880
                    }, 1000)
                    break
                case(3866):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {

                        drawforeground = true
                        image.src = './img/Forest.png'
                        foregroundImage.src = './foreground/ForestFG.png'
                        changeBattleArea(2, 25, offset.mapaForest)
                        changeCollisions(2, 25, offset.mapaForest)
                        changeEntradas(9, 25, offset.mapaForest)
                        background.position.x = 130
                        background.position.y = 98
                        foreground.position.x = 130
                        foreground.position.y = 98
                    }, 1000)
                    break

                case (5888):
                    ChangeZone()
                    setTimeout(function () {
                        battlezone = true
                    }, 2000)
                    setTimeout(function () {
                        drawforeground = false
                        image.src = './img/Overworld.png'
                        offset.mapaOverWorld.x = -371
                        offset.mapaOverWorld.y = -315
                        changeBattleArea(1, 40, offset.mapaOverWorld)
                        changeCollisions(1, 40, offset.mapaOverWorld)
                        changeEntradas(1, 40, offset.mapaOverWorld)
                        background.position.x = -371
                        background.position.y = -315
                    }, 1000)
                    break
            }
        }
    })


    //movimento-velocidade
    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.images[0] = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (rectangleColision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })

            ) {
                console.log('coliding')
                moving = false
                break
            }
        }


        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.images[0] = player.sprites.right

        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (rectangleColision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }

            })
            ) {
                console.log('coliding')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })

    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.images[0] = player.sprites.down

        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (rectangleColision({
                rectangle1: player,
                rectangle2: boundary
            })
            ) {
                console.log('coliding')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })

    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.images[0] = player.sprites.left

        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (rectangleColision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })
            ) {
                console.log('coliding')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })

    }


}


const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground/Background.png'
const battleBackground = new Sprite({
    position: {
        x: 80,
        y: -215
    },
    image: [battleBackgroundImage]
})
const Player2dImage = new Image()
Player2dImage.src = './img/2d/idle/adventurer-idle-2-03.png'
const PlayerAttackImage = new Image()
PlayerAttackImage.src = './img/2d/attack/adventurer-attack3-05.png'
const Player2d = new Player({
        position: {
            x: 250,
            y: 480
        },
        image: [Player2dImage, PlayerAttackImage],
        frames: {
            max: 4
        },
        framesS: [{
            w: 2,
            h: 10
        }, {
            w: 2,
            h: 15
        }],
        animate: true
    }, 'Player'
)
const MonsterImage = new Image()
MonsterImage.src = './img/2d/idle/Idle.png'
const MonsterAttackImage = new Image()
MonsterAttackImage.src = './img/2d/attack/Attack.png'
const Monster = new Player({
    position: {
        x: 600,
        y: 440
    },
    image: [MonsterImage, MonsterAttackImage],
    frames: {
        max: 4
    },
    framesS: [{
        w: 2,
        h: 5
    },
        {
            w: 2,
            h: 8
        }],
    animate: true
}, 'Goblin')

function animateBattle() {
    if (batalha.initiated) window.requestAnimationFrame(animateBattle)
    console.log('animating battle')
    battleBackground.draw()
    Player2d.draw()
    Monster.draw()
}

const attackButton = document.querySelector('#ataques button:first-of-type')

attackButton.addEventListener('click', () => {
    if (!playerCanAttack) return
    playSlash()
    Player2d.attack({
        attack: {
            name: 'Golpear',
            damage: 25,
            type: 'Fisico'
        },
        recipient: Monster,
        lifeElement: document.querySelector('#barravida4')
    })
    playerCanAttack = false
    if (Monster.health > 0) {
        setTimeout(function () {
            playSmash()
            Monster.attack({
                attack: {
                    name: 'Golpear',
                    damage: 10,
                    type: 'Fisico'
                },
                recipient: Player2d,
                lifeElement: document.querySelector('#barravida2')
            })
            playerCanAttack = true
        }, 2000)
    } else {
        ChangeZone()
        batalha.initiated = false
        setTimeout(function () {
            window.requestAnimationFrame(animate)
            Monster.Regenarate('#barravida4')
            Player2d.Regenarate('#barravida2')
            const battleMenu = document.querySelector('#battlemenu')
            battleMenu.classList.add('hide')
            playOverworld()
        }, 1000)
    }

})


//movimento
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break

    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break

        case'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break

    }
})

function ChangeZone() {
    const Overlay = document.getElementById('overlappingDiv')
    Overlay.className = ''
    Overlay.classList.add('Fade')
    setTimeout(function () {
            Overlay.className = ''
        }, 2000
    )


}

function RunBlinkAnimation() {
    const Overlay = document.getElementById('overlappingDiv')
    Overlay.className = ''
    Overlay.classList.add('Blink')
    setTimeout(function () {
            Overlay.className = ''
        }, 7000
    )


}

const mainMenu = document.querySelector('#main-menu')
mainMenu.addEventListener('click', function () {

    mainMenu.classList.add('FadeOut')
    setTimeout(function () {
        mainMenu.remove()
        playOverworld()
    }, 2000)
    animate()

})

function playOverworld() {
    audio.Overworld.loop = true
    audio.Overworld.currentTime = 0
    audio.Overworld.volume = 0.15
    audio.Battle.pause()
    audio.Battle.currentTime = 0
    audio.Overworld.play()
}

function playBattle() {
    audio.Battle.loop = true
    audio.Battle.currentTime = 0
    audio.Battle.volume = 0.15
    audio.Overworld.pause()
    audio.Overworld.currentTime = 0
    audio.Battle.play()

}

function playSlash() {
    audio.Slash.currentTime = 0
    audio.Slash.volume = 0.20
    audio.Slash.play()

}

function playSmash() {
    audio.Smash.currentTime = 0
    audio.Smash.volume = 0.20
    audio.Smash.play()

}
