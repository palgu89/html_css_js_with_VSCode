document.getElementById('home').addEventListener('click', function(){
    document.getElementById('home').setAttribute('style', 'font-weight: bolder;');
    document.getElementById('img').setAttribute('src', 'img/home.jpg');
    document.getElementById('seoul').setAttribute('style', 'font-weight: normal;');
    document.getElementById('tokyo').setAttribute('style', 'font-weight: normal;');
    document.getElementById('paris').setAttribute('style', 'font-weight: normal;');
});
document.getElementById('seoul').addEventListener('click', function(){
    document.getElementById('seoul').setAttribute('style', 'font-weight: bold;');
    document.getElementById('img').setAttribute('src', 'img/seoul.jpg');
    document.getElementById('home').setAttribute('style', 'font-weight: normal;');
    document.getElementById('tokyo').setAttribute('style', 'font-weight: normal;');
    document.getElementById('paris').setAttribute('style', 'font-weight: normal;');
});
document.getElementById('tokyo').addEventListener('click', function(){
    document.getElementById('tokyo').setAttribute('style', 'font-weight: bold;');
    document.getElementById('img').setAttribute('src', 'img/tokyo.jpg');
    document.getElementById('home').setAttribute('style', 'font-weight: normal;');
    document.getElementById('seoul').setAttribute('style', 'font-weight: normal;');
    document.getElementById('paris').setAttribute('style', 'font-weight: normal;');
});
document.getElementById('paris').addEventListener('click', function(){
    document.getElementById('paris').setAttribute('style', 'font-weight: bold;');
    document.getElementById('img').setAttribute('src', 'img/paris.jpg');
    document.getElementById('home').setAttribute('style', 'font-weight: normal;');
    document.getElementById('seoul').setAttribute('style', 'font-weight: normal;');
    document.getElementById('tokyo').setAttribute('style', 'font-weight: normal;');
});

// // 선생님 버전
// const index = document.getElementById('index');
// const seoul = document.getElementById('seoul');
// const tokyo = document.getElementById('tokyo');
// const paris = document.getElementById('paris');

// index.addEventListener('click', ()=>{   // ()=>{} = function(){}
//     index.setAttribute('style','font-weight: bolder');
//     // index.style.fontWeight.bolder;
//     // index.style.setProperty('font-weight', 'bolder');
//     seoul.setAttribute('style','font-weight: normal');
//     tokyo.setAttribute('style','font-weight: normal');
//     paris.setAttribute('style','font-weight: normal');
//     document.querySelector('img').src = 'img/index.jpg';
//     // document.querySelector('img').setAttribute('src', 'img/index.jpg');
// });
// seoul.addEventListener('click', ()=>{
//     seoul.style.setProperty('font-weight', 'bolder');
//     index.style.setProperty('font-weight', 'bolder');
//     tokyo.style.setProperty('font-weight', 'bolder');
//     paris.style.setProperty('font-weight', 'bolder');
//     document.querySelector('img').src = 'img/seoul.jpg';
// });
// tokyo.addEventListener('click', ()=>{

// });
// paris.addEventListener('click', ()=>{

// });