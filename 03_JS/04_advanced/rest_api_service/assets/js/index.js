async function getItemsFromServer(){
    try {
        const resp = await fetch('http://palgu8989.dothome.co.kr/items/read');
        const respText = await resp.text(); // JSON으로 바로 해도 됨
        const items = await JSON.parse(respText); // 객체화
        return await items;
    } catch (error) {
        console.log(error);
    } finally {
        console.log('async completed');
    }   // console.log는 확인용이라 나중에 다 지운다
}

//delete
async function deleteItemFromServer(ino){
    try {
        const url = 'http://palgu8989.dothome.co.kr/items/delete';
        const config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www.form.urlencoded'
            },
            body: JSON.stringify({id: ino}) // delete.php에서 id로 받기로 되어있음
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}

async function getItemViewFromServer(ino) {
    try {
        const resp = await fetch('http://palgu8989.dothome.co.kr/items/read/'+ino);
        const respText = await resp.text();
        const items = await JSON.parse(respText);
        return await items;
    } catch (error) {
        console.log(error);
    } finally {
        console.log('async completed');
    }  
}

// function makeListView(itemsArr){    // value값들의 모임이라 배열
//     let d = new Date();
//     console.log(d);
//     for (let i = 0; i < itemsArr.length; i++) {
//         let str = '<div class="card shadow-sm><div class="card-body">';
//         str += `<p class="card-text">${itemsArr[i].name}</p>`;
//         str += '<div class="d-flex justify-content-between align-items-center">';
//         str += '<div class="btn-group">';
//         str += '<button type="button" class="btn btn-sm btn-outline-secondary">View</button>';
//         str += '<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>';
//         if (itemsArr[i].modified.substring(0, 9 == '2021-10-22')) {
//             str += `</div><small class="text-muted">${itemsArr[i].modified.substring(10)}</small>`;
//         } else {
//             str += `</div><small class="text-muted">${itemsArr[i].modified.substring(0, 9)}</small>`;
//         }
//         let md = new Date(itemsArr[i].modified);
//         str += `${Math.floor((d - md)/1000/60/60/24)}일 전`;
//         str += '</div></div></div></div>';
//         document.getElementById('itemListArea').innerHTML += str;
//     }
// }

// 선생님 버전
function compareToday(day){
    const today = new Date();
    let [date, month, year] = [today.getDate(), today.getMonth()+1, today.getFullYear()];
    let [d_year, d_month, d_day] = (day.substring(0, day.indexOf(' '))).split('-');
    
    if (date == d_day && month == d_month && year == d_year) {
        return day.substring(day.indexOf(' '))
    }else {
        return day.substring(0, day.indexOf(' '));
    }
    // return date == d_day ? month == d_month ? year == d_year : day.substring(day.indexOf(' ')) : day.substring(0, day.indexof(' '));
}
function makeListView(itemsArr) {
    let str ='';
    itemsArr.forEach(elemObj => {
        str += '<div class="col">';
        str += '<div class="card shadow-sm">';
        str += '<div class="card-body">';
        str += `<p class="card-text">${elemObj.name}</p>`;
        str += ' <div class="d-flex justify-content-between align-items-center">';
        str += '<div class="btn-group">';
        str += `<button type="button" data-ino="${elemObj.id}" class="btn btn-sm btn-outline-secondary view">View</button>`;
        str += `<button type="button" data-ino="${elemObj.id}" class="btn btn-sm btn-outline-secondary edit">Edit</button>`;
        str += `<button type="button" data-ino="${elemObj.id}" class="btn btn-sm btn-outline-danger del">Del</button></div>`;
        str += `<small class="text-muted">${compareToday(elemObj.modified)}</small>`;
        str += '</div></div></div></div>';
    });
    document.getElementById('itemListArea').innerHTML = str;
        // str += `<button type="button" class="btn btn-sm btn-outline-secondary id="item_${elemObj.id}">View</button>`;
        // button을 누르면 정보가 나오게 하기 위해 버튼에 id를 부여하는데
        // elemObj에 id라는 key가 있음. 숫자 value로 되어있으니 가져와서 쓰면 id구성 가능
        // but 효율적이지 못하다
}

// document.addEventListener('DOMContentLoaded',()=>{ // 비슷한게 document.body.onload 인데 속도가 느려서 저걸 더 많이 씀
// 이건 페이지 로드 할 때마다 실행 되니까 완성 했을 때 다시 이렇게 하자
document.getElementById('getItemList').addEventListener('click',()=>{
    getItemsFromServer().then((itemsObj) =>{  // 이 함수를 쓰면 서버로부터 데이터를 가져오겠다
        console.log(itemsObj);  // key + value
        // console.log('------------------------');
        // console.log(itemsObj.items);    // value
        makeListView(itemsObj.items);   // 우리가 필요한건 key의 value값이니까 itemsObj.items 또는 itemsObj['items']
    });
});


// function makeItemView(itemArr){
//     console.log(itemArr[0]);
//     document.getElementById('itemListArea').innerHTML = '';
//     // 구현시작할 지점: 화면 한 개의 객체 정보를 출력하는 코드 작성
//     // html 코드는 index.html: 138 line 참고
//     let str= '';
//     for (let i = 0; i < itemArr.length; i++) {
//         str += '<div class="col d-flex align-items-start">';
//         str += '<div><h4 class="fw-bold mb-0">Item Detail</h4>';
//         str += `<p>${JSON.stringify(itemArr[i])}</p></div></div>`;
//     }
//     document.getElementById('itemDetailView').innerHTML += str;
// }

// 선생님 버전
function makeItemView(itemArr){
    document.getElementById('itemListArea').innerHTML ='';
    // 구현시작할 지점: 화면 한 개의 객체 정보를 출력하는 코드 작성
    // html 코드는 index.html: 138 line 참고
    const itemObj = itemArr[0];
    let str = '<h2 class="pb-2 border-bottom">Item Detail</h2>';
    str += '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5" id="itemDetailView">';
    for (let key in itemObj) {
        str += '<div class="col d-flex align-items-start">';
        str += `<div><h4 class="fw-bold mb-0">${key}</h4>`;
        str += `<p>${itemObj[key]}</p></div></div>`;
    }
    str += '</div>';
    document.getElementById('icon-grid').innerHTML = str;
}

document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('view')){
        // console.log(e.target.dataset.ino);
        getItemViewFromServer(e.target.dataset.ino).then((dataObj)=>{
            // console.log(dataObj);   // 함수로 객체를 다 받아오면 그 때 찍겠다
            makeItemView(dataObj.items);
        });
    }
    // delete
    if (e.target.classList.contains('del')) {
        deleteItemFromServer(e.target.dataset.ino).then(result =>{
            alert(result.message);
            document.getElementById('getItemList').click();
        });
    }

    if (e.target.classList.contains('edit')){
        location.href = 'update.html?'+e.target.dataset.ino;    // 클릭하면 update.html 뒤에 ? 와 누른 data의 번호를 보낸다
    }
});

// delete 하기
// 1. del 버튼 생성
// 2. del 버튼에 data-ino 세팅
// 3. del 버튼이벤트를 설정해서 async 함수 호출
// 4. url = "자신의 닷홈주소/items/delete"
// 5. config는 create와 동일
// 6. config의 body는 (id: 자울 아이디 번호)를 stringify
// 7. 모두 완료되면 삭제 완료 alert 실행
// 8. index의 list를 출력하는 버튼을 click()으로 이벤트 부여
// 9. 삭제된 아이템이 없는 리스트가 출력되면 성공