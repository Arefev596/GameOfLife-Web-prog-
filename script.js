var mas = [];
var count = 0;
var timer;
var counter = 1;
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

canvas.onclick = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    //console.log(x);
    //console.log(y);
    x = Math.floor(x/10); // получаем координаты нажатой ячейки
    y = Math.floor(y/10);
    mas[y][x]=1; // записываем в поле 1 о наличии выбранной ячейки
    //console.log(mas);
    drawField();
}

function createArea(){ // создание "поля" 60x60
    var n=30, m=30;
    for (var i=0; i<n; i++){
        mas[i]=[];
        for(var j=0; j<m; j++){
            mas[i][j] = 0;
        }
    }
}
createArea();

function drawField(){ // рисование ячейки при нажатии
    context.clearRect(0, 0, 300, 300);
    var n=30, m=30;
    for (var i=0; i<n; i++){ // ось y
        for(var j=0; j<m; j++){ // ось x
            if (mas[i][j] == 1){
                context.fillRect(j*10, i*10, 10, 10);
            }
        }
    }
}

function StartLife(){
    var mas2 = [];
    var n=30, m=30;
    for (var i=0; i<n; i++){
        mas2[i]=[];
        for(var j=0; j<m; j++){
            var neighbors = 0;
            if (mas[check(i)-1][j] == 1){ //верх
                neighbors++;
            }
            if (mas[check2(i)+1][j] == 1){ //снизу
                neighbors++;
            }
            if (mas[i][check(j)-1] == 1){ //слева
                neighbors++;
            }
            if (mas[i][check2(j)+1] == 1){ // справа
                neighbors++;
            }
            
            if(mas[check(i)-1][check2(j)+1] == 1){ // диагональ сверху слева
                neighbors++;
            }
            if(mas[check2(i)+1][check2(j)+1] == 1){ // диагональ справа снизу
                neighbors++;
            }
            if(mas[check2(i)+1][check(j)-1] == 1){ // диагональ слева снизу
                neighbors++;
            }
            if(mas[check(i)-1][check(j)-1] == 1){ // диагональ сверху справа
                neighbors++;
            }
            
            if (neighbors==2 || neighbors==3){
                mas2[i][j] = 1;
            }
            else {
                mas2[i][j] = 0;
            }
        }
    }
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = ("Поколение: " + count);
    timer = setTimeout(StartLife, 1000);
}

function check(i){ // проверка на наличие соседа сверху или слева
    if (i==0)   return 30;
    else        return i;
}
    
function check2(j){ // проверка на наличие соседа справа или снизу
    if (j == 29)    return -1;
    else            return j;
}

start = document.getElementById('start');
start.onclick = StartLife;

function resetPage(){
    location.reload();
    return false;
}

function fast(){
    StartLife();
    counter++;
    document.getElementById('counterSec').innerHTML = ("Поколений в секунду: " + counter);
}

reset = document.getElementById('reset');
reset.onclick = resetPage;

faster = document.getElementById('faster');
faster.onclick = fast;

stop = document.getElementById('stop');
stop.onclick = function(){
    clearTimeout(timer);
}

window.addEventListener("beforeunload", beforeUnLoad);

function beforeUnLoad(event) {
    event.preventDefault();
    event.returnValue = '';
}