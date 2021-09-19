// 기본적인 canvas 세팅
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight - 100;

// 녹색 네모 화면에 만들기
// ctx.fillStyle = 'green';
// ctx.fillRect(10,10,100,100);
let img1 = new Image ();
img1.src = 'Cactus.png';

let img2 = new Image ();
img2.src = 'dino.png'; 

let dino = { // 공룡 object
    x : 10,   // 공룡 좌표
    y : 200,  // 공룡 좌표 
    width : 70,  // 공룡 폭   
    height : 70, // 공룡 높이
    draw(){ // 공룡 그리는 함수
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y)
    }
}
// dino.draw();

// 장애물 만들기. 근데 여러 장애물들을 만들 때 속성,width, height가 다 다를 수 있으므로 비슷한 object가 많이 필요함. 따라서 클래스로 만드는게 편함.
class Cactus {
    constructor(){  // 선인장 위치
        this.x = 500; // 왼쪽에서부터 500px
        this.y = 200; // 위에서부터 200px 
        this.width = 70; 
        this.height = 70;
    }
    draw(){
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x, this.y)
    }
}
// let cactus = new Cactus();
// cactus.draw();

let timer = 0;
let jumpTimer = 0;
let cactusArray = [];
let animation;
// 1초에 60번 코드 실행하기
// 공룡이 움직이는 애니메이션을 라이브러리 없이 쌩으로 구현할꺼면, 함수를 넣어서 1초에 60번 움직이도록 만듬
function animateDino(){
    animation = requestAnimationFrame(animateDino);
    timer++; // 

    ctx.clearRect(0,0, canvas.width, canvas.height)

    if(timer % 150 === 0){ //1초마다, 60프레임 마다 선인장 만들기
        let cactus = new Cactus();
        cactusArray.push(cactus);
    }
    cactusArray.forEach((a,i,o)=>{ //반복문으로 선인장을 계속 생성
        //x좌표가 0미만이면 제거
        if(a.x < 0){
            o.splice(i,1)
        }

        if(jump == true){
            dino.y-=2 ; // 공룡이 무한정으로 올라가면서 점프함
            jumpTimer++; //점프시 프레임이 1증가
        }
        if(jump == false){
            if(dino.y < 200){ // 최저 y높이를 지정하고 그 이상으로 ++ 금지
                dino.y+=2; 
            }
        }  
        if (jumpTimer > 70){
            jump = false;// 100프레임 지나면 공룡이 올라가는거 중지
            jumpTimer = 0;
        }
        a.x-=2; 
        collision(dino, a);
        a.draw();
    })
    // dino.x++; // 공룡이 앞으로 감
    dino.draw(); 
}
animateDino();

function collision(dino,cactus){// 충돌 체크
    let xDifference = cactus.x - (dino.x + dino.width);
    let yDifference = cactus.y - (dino.y + dino.height); 
    if (xDifference < 0 && yDifference < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jump = false // 스위치와 같은 역할
//스페이스바 누르면 공룡 점프
document.addEventListener('keydown',function(b){
    if(b.code === 'Space'){
        jump = true;
    }
})