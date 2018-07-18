let bullet = [],count = 9, point = 0, canvas, level = 1, ctx, balls, gun, idTimer, speedX = -1, speedY, firstSpeedX, firstSpeedY, t, flag = false;
TBall = new Class({
    initialize: function(pX,pY,rB) {
        this.posX = pX; //позиция шарика по X
        this.posY = pY; //позиция шарика по Y
        //цвет шарика, формируется случайным оьразом
        this.colBall = 'rgb('+Math.floor(Math.random()*256)+','
            +Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
        this.rBall = rB;
    },
    posX: 0,
    posY: 0,
    colBall:"rgb(0,0,0)",
    rBall: 0,
    colorBall: function(ctx){
        // формируем градиентную заливку для шарика
        with (this){
            let gradient = ctx.createRadialGradient(posX+rBall/4,
                posY-rBall/6, rBall/8, posX, posY, rBall);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.85, colBall);
            return gradient;
        }
    },
    draw : function(ctx){
        // рисуем шарик на canvas
        with (this){
            ctx.fillStyle = colorBall(ctx);
            ctx.beginPath();
            ctx.arc(posX, posY, rBall, 0, 2*Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }
    }
});

TSquare = new Class({
    initialize: function(pX,pY) {
        this.posX = pX; //позиция квадрата по X
        this.posY = pY; //позиция квадрата по Y
        //цвет квадрата, формируется случайным оьразом
        this.colSquare = 'rgb('+Math.floor(Math.random()*256)+','
            +Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
        this.hSquare = 30;
    },
    posX: 0,
    posY: 0,
    colSquare:"rgb(0,0,0)",
    hSquare: 0,
    colorSquare: function(ctx){
        // формируем градиентную заливку для квадрата
        with (this){
            let gradient = ctx.createRadialGradient(posX+hSquare/4,
                posY-hSquare/6, hSquare/8, posX, posY, hSquare);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.85, colSquare);
            return gradient;
        }
    },
    drawSquare : function(ctx){
        // рисуем квадрат на canvas
        with (this){
            ctx.fillStyle = colorSquare(ctx);
            ctx.beginPath();
            ctx.fillRect(posX, posY, hSquare, hSquare);
            ctx.closePath();
            ctx.fill();
        }
    }
});

function drawBack(ctx,col1,col2,w,h){
    // закрашиваем канвас градиентным фоном
    ctx.save();
    let g = ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(1,col1);
    g.addColorStop(0,col2);
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
    ctx.restore();
}
// инициализация работы
function init(){
    if (bullet.length !== 0){
        bullet.splice(0,bullet.length);
    }
    idTimer = [];
    t = 0;
    firstSpeedX = speedX;
    firstSpeedY = speedY;
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        //рисуем фон
        drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
        //создаем 8 шариков, заноси их в массив и выводим на canvas
        balls = [];
        for (let i = 1; i<=count;i++){
            let item = new TBall(Math.floor(Math.random()*(canvas.width-(canvas.width - 30)+1))+(canvas.width - 30),
                10+Math.random()*(canvas.height-30),20);
            item.draw(ctx);
            balls.push(item);
        }
        gun  = new TSquare(0, canvas.height/2);
        gun.drawSquare(ctx);
    }
}

function moveTheGun(event){
    if (flag) {
        let rect = canvas.getBoundingClientRect();
        gun.posY = event.clientY- rect.top - 15;
        gun.drawSquare(ctx);
    }
}

function shoot(event) {
    if (flag) {
        let rect = canvas.getBoundingClientRect();
        let y = event.clientY - rect.top;
        let x = 30;
        bullet.push(new TBall(x, y, 10));
    }
}

function moveBall() {
    //реализация движения фигур, находящихся в массиве
    drawBack(ctx, '#202020', '#aaa', canvas.width, canvas.height);
    gun.drawSquare(ctx);
    for (let i = 0; i < balls.length; i) {
        balls[i].posX = balls[i].posX + speedX;
        //balls[i].posY = balls[i].posY + speedY;
        balls[i].draw(ctx);
        //console.log(balls);
        if (balls[i].posX < 0) {
            balls.splice(i, 1);
            stop();
            alert("You lose! \n Your points = "+ point);
        }  else
            i++;
    }
    if (balls.length === 0){
        stop();
        alert("You win!!!"+"Next level "+eval(level+1)+"\n"+"Your points = "+ point);
        levelUp();
    }
    for (let i = 0; i<bullet.length;i){
        bullet[i].posX = bullet[i].posX +6;
        bullet[i].draw(ctx);
        //bullet[i].posY
        if (bullet[i].posX>canvas.width){
            point = point - 5;
            bullet.splice(i,1);
        } else
            i++;
    }
    for (let i = 0; i<balls.length;i++){
        for (let j = 0; j<bullet.length; j++){
            if(MacroCollision(balls[i],bullet[j])) {
                point = point + 10+level*10;
                bullet.splice(j, 1);
                balls.splice(i, 1);
            }
        }
    }
}

function move(){
    flag = true;
    idTimer[t++] = setInterval('moveBall();',50);
}

/**
 * @return {boolean}
 */
function MacroCollision(obj1,obj2) {
    let XColl = false;
    let YColl = false;
    const prx = 21;
    const pry = 17;


    if ((obj1.posX + (obj1.rBall+prx) >= obj2.posX) && (obj1.posX <= obj2.posX + (obj2.rBall+prx))) XColl = true;
    if ((obj1.posY + (obj1.rBall+pry) >= obj2.posY) && (obj1.posY <= obj2.posY + (obj2.rBall+pry))) YColl = true;

    return XColl && YColl;
}

function stop(){
    for (let i = 0; i < t; i++){
        clearInterval(idTimer[i]);
        flag = false;
    }
}

function levelUp() {
    if (level <= 9){
        level++;
        if (level === 2){
            count = 11;
            speedX = -2;
            init();
        } else if (level === 3){
            count = 14;
            speedX = -2;
            init();
        } else if (level === 4){
            count = 14;
            speedX = -3;
            init();
        }else if (level === 5){
            count = 16;
            speedX -3;
            init();
        } else if (level === 6){
            count = 18;
            speedX -3;
            init();
        } else if (level === 7){
            count = 20;
            speedX = -4;
            init();
        } else if (level === 8){
            count = 22;
            speedX = -5;
            init();
        } else if (level === 9){
            count = 24;
            speedX = -5;
            init();
        } else if (level ===10){
            count = 26;
            speedX = -6;
            init();
        }
    }
}