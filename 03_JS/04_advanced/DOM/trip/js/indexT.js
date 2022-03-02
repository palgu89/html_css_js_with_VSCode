const aLinks = document.querySelectorAll('.city');
// console.log(aLinks);
// const [index, seoul, tokyo, paris] = aLinks; // 받아온 링크들을 생성한 배열에 넣음
// console.log(index);

const imgTag = document.querySelector('img');
for (let i = 0; i < aLinks.length; i++) {   // for문을 돌며 링크들에 click 이벤트를 장착 시킨다
    aLinks[i].addEventListener('click', function(){
        // console.log(aLinks[i]); // 누를 때마다 해당 태그가 출력 됨
        // console.log(aLinks[i].classList[1]);    // 누를 때마다 a link의 두번째 클래스 이름이 출력 됨 -> index seoul tokyo paris
        imgTag.src = `img/${aLinks[i].classList[1]}.jpg`;   // 누를 때마다 경로의 이름이 바뀜
        aLinks.forEach((elem)=>{
            elem.classList.remove('curr_sel');  // 일단 curr_sel 클래스를 다 지운 다음
        });
        aLinks[i].classList.add('curr_sel');    // 해당 클래스만 다시 줘서 볼더처리 하자
    });
    aLinks[i].style.setProperty('cursor', 'pointer');   // 마우스 포인터 만들기 -> 여기보단 css로 하자
}