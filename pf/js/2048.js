// 1. 시작
// 2. 4x4 테이블 만들기
// 3. 랜덤하게 2 두개 넣기
// 4. 사용자 입력(키보드 방향키)
// 5. 방향 확인 후 숫자 이동
// 6. 같은 숫자를 만나 합쳐질 수 있는가?
//  6-1. 네 -> 숫자를 합친다 -> 2048인가?
//      6-1-1. 네 -> 승리
//      6-1-2. 아니오 -> 랜덤하게 2를 넣는다 -> 사용자 입력
//  6-2. 아니오 -> 공간이 있는가?
//      6-2-1. 네 -> 랜덤하게 2를 넣는다 -> 사용자 입력
//      6-2-2. 아니오 -> 패배


let table = document.getElementById('table');
let score = document.getElementById('score');
let startNum = new Array();
let td = new Array();
for (let i = 0; i < 4; i++) {
    td[i] = new Array();
    for (let j = 0; j < 4; j++) {
        td[i][j] = document.getElementById(`${i}${j}`);
    }
}
// table -> tbody -> tr -> td
function start(){
    for (let i = 0; i < 4; i++) {
        startNum[i] = new Array();
        for (let j = 0; j < 4; j++) {
            startNum[i][j] = 0;
            td[i][j].innerHTML += startNum[i][j];
        }
    }
    randomInputTwo();
    draw();
}

function randomInputTwo(){
    let checkCells = [];
    td.forEach(function (row, i){
        row.forEach(function (col, j){
            if(!col){
                checkCells.push([i,j]);
            }
        });
    });
    let randomInput = checkCells[Math.floor(Math.random()*checkCells.length)];
    td[randomCell[0]][randomInput[1]] = 2;
}

function draw(){
    td.forEach(function (row, i){
        row.forEach(function (col, j){
            if (col > 0) {
                td.textContent = col;
                td.className = `color-${col}`;
            }else{
                td.textContent = '';
                td.className = '';
            }
        });
    });
}

start();
