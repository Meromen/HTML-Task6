let canvas, ctx, balls, squares, idTimer, speedX, speedY, firstSpeedX, firstSpeedY, t, flag = false;
TBall = new Class({
    initialize: function(pX,pY) {
        this.posX = pX; //позиция шарика по X
        this.posY = pY; //позиция шарика по Y
        //цвет шарика, формируется случайным оьразом
        this.colBall = 'rgb('+Math.floor(Math.random()*256)+','
            +Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
        // радиус шарика, случайное число от 5 до 30
        this.rBall = 5+Math.random()*25;
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
        // радиус квадрата, случайное число от 5 до 30
        this.hSquare = 10+Math.random()*25;
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
    speedX = 0;
    speedY = -3;
    idTimer = [];
    t = 0;
    firstSpeedX = speedX;
    firstSpeedY = speedY;
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        //рисуем фон
        drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
        //создаем 10 шариков, заноси их в массив и выводим на canvas
        balls = [];
        for (let i = 1; i<=7;i++){
            let item = new TBall(10+Math.random()*(canvas.width-30),
                10+Math.random()*(canvas.height-30));
            item.draw(ctx);
            balls.push(item);
        }
        squares = [];
        for (let i = 1; i<=7;i++){
            let item = new TSquare(10+Math.random()*(canvas.width-30),
                10+Math.random()*(canvas.height-30));
            item.drawSquare(ctx);
            squares.push(item);
        }
    }
}
// создаем новый шарик или квадрат по щелчку мыши, добавляем его в массив шариков и рисуем его
function goInput(event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let randomFigure = Math.floor(Math.random() * (2- 1 + 1)) + 1;
    switch (randomFigure){
        case 1:
            let item1 = new TBall(x,y);
            item1.draw(ctx);
            balls.push(item1);
            break;
        case 2:
            let item2 = new TSquare(x,y);
            item2.drawSquare(ctx);
            squares.push(item2);
            break;
    }
}
function moveBall(){
    //реализация движения фигур, находящихся в массиве
    drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
    for (let i = 0; i < balls.length;i){
        balls[i].posX = balls[i].posX + speedX;
        balls[i].posY = balls[i].posY + speedY;
        balls[i].draw(ctx);
        balls[i].rBall += 0.3;
        if ((balls[i].posX > canvas.width)||(balls[i].posX < 0) ||(balls[i].posY < 0 || balls[i].rBall > 50))
            balls.splice(i,1);
        else
            i++;
    }
    for (let i = 0; i < squares.length;i){
        squares[i].posX = squares[i].posX + speedX;
        squares[i].posY = squares[i].posY + speedY;
        squares[i].drawSquare(ctx);
        squares[i].hSquare += 0.3;
        if ((squares[i].posX > canvas.width)||(squares[i].posX < 0) ||(squares[i].posY < 0 || squares[i].hSquare > 50))
            squares.splice(i,1);
        else
            i++;
    }
    if (flag) {
        directionRandom();
    }
}
function move(){
    idTimer[t++] = setInterval('moveBall();',50);
}
function stop(){
    for (let i = 0; i < t; i++){
        clearInterval(idTimer[i]);
    }
}
function speedInc(){
    if (speedX > 0 || firstSpeedX > 0){
        speedX++;
    }else if (speedX < 0 || firstSpeedX < 0) {
        speedX--;
    }else if (speedY > 0 || firstSpeedY > 0){
        speedY++
    }else if (speedY < 0 || firstSpeedY < 0){
        speedY--
    }
}
function speedDec(){
    if (speedX > 0){
        speedX--;
    }else if (speedX < 0) {
        speedX++;
    }else if (speedY > 0){
        speedY--
    }else if (speedY < 0){
        speedY++
    }
}
function directionRight(){
    if (speedX === 0 && speedY >= 0){
        speedX = speedY;
        speedY = 0;
    }else if (speedX === 0 && speedY <= 0){
        speedX = speedY*(-1);
        speedY = 0;
    }else if (speedX < 0){
        speedX *= -1;
    }
    if (speedX !== 0 || speedY !== 0){
        firstSpeedX = speedX;
        firstSpeedY = speedY;
    }
}
function directionLeft(){
    if (speedX === 0 && speedY <= 0){
        speedX = speedY;
        speedY = 0;
    }else if (speedX === 0 && speedY >= 0){
        speedX = speedY*(-1);
        speedY = 0;
    }else if (speedX > 0){
        speedX *= -1;
    }
    if (speedX !== 0 || speedY !== 0){
        firstSpeedX = speedX;
        firstSpeedY = speedY;
    }
}
function directionTop(){
    if (speedY === 0 && speedX <= 0){
        speedY = speedX;
        speedX = 0;
    }else if (speedY === 0 && speedX >= 0){
        speedY = speedX*(-1);
        speedX = 0;
    }else if (speedY > 0){
        speedY *= -1;
    }
    if (speedX !== 0 || speedY !== 0){
        firstSpeedX = speedX;
        firstSpeedY = speedY;
    }
}
function directionBottom(){
    if (speedY === 0 && speedX >= 0){
        speedY = speedX;
        speedX = 0;
    }else if (speedY === 0 && speedX <= 0){
        speedY = speedX*(-1);
        speedX = 0;
    }else if (speedY < 0){
        speedY *= -1;
    }
    if (speedX !== 0 || speedY !== 0){
        firstSpeedX = speedX;
        firstSpeedY = speedY;
    }
}
function directionRandom(){
    let randomDirection = Math.floor(Math.random() * (4- 1 + 1)) + 1;
    switch(randomDirection){
        case 1:
            directionRight();
            break;
        case 2:
            directionLeft();
            break;
        case 3:
            directionTop();
            break;
        case 4:
            directionBottom();
            break;
    }
}
function random(){
    flag = !flag;
}