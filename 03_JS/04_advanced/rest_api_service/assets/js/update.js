// 1. 수정할 id 받아오기 > id=?
// 2. 서버로부터 해당 id의 객체 받아오기
// 3. 객체의 데이터 중 input, select tag에 데이터 출력시키기
// 4. 수정 한 후 submit 버튼 클릭하면 이벤트 받아오기
// 5. form tag 내의 수정한 데이터 받아와서 객체 만들기
// 6. 만든 객체를 서버측으로 업데이트 요청하기
// 7. 요청 결과 받아서 alert()으로 결과 출력
// 8. list 다시 호출하기

async function getItemViewFromServer(ino) {
        try {
            const resp = await fetch('http://palgu8989.dothome.co.kr/items/read/'+ino);
            const respText = await resp.text();
            const itemsObj = await JSON.parse(respText);
            return await itemsObj;
        } catch (error) {
            console.log(error);
        } finally {
            console.log('async completed');
        }  
}

async function modifyItemToServer(itemObj){
    try {
        const url = 'http://palgu8989.dothome.co.kr/items/update';
        const config = {    
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(itemObj)
        }
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}

function setInputsValue(itemObj) {
    // document.getElementById('name').value = itemObj.name;
    // document.getElementById('price').value = itemObj.price;
    // document.getElementById('description').value = itemObj.description;
    
    // 넣을 요소가 많아지면
    const inputs = document.querySelectorAll('.needs-validation input');

    inputs.forEach(input =>{
        input.value = itemObj[input.id];
    });

    let optionList = document.querySelectorAll('#category_id option');
    optionList.forEach(option =>{
        if(option.value == itemObj.category_id){
            option.setAttribute('selected', true);
       }
   });
}

document.addEventListener("DOMContentLoaded",()=>{   // body보다 빠른 로딩
    const queryString = location.search;    // 주소값을 제외한 ? 포함 뒤의 것들을 가져다 줌
    // console.log(queryString);  // ?숫자(id vaiflue) 출력
    let ino = queryString.substring(1); // 물음표 뺌
    // console.log(queryString, ino);  // ?숫자, 숫자

   getItemViewFromServer(ino).then(itemObj=>{
        console.log(itemObj.items[0]);
        setInputsValue(itemObj.items[0]);
    });
});

document.querySelector('button.w-100').addEventListener('click',(e)=>{
    e.preventDefault(); // 페이지 이동을 막음
    const inputs = document.querySelectorAll('.needs-validation input');
        
    let itemObj = {};
    
    inputs.forEach(elem =>{
        itemObj[elem.id] = elem.value;
    });
    
    itemObj.category_id = document.querySelector('#category_id option:checked').value;
    
    const now = new Date();
    let createdNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    itemObj.modified = createdNow;
    console.log(itemObj);
    
    modifyItemToServer(itemObj).then(result => {
        alert(result.message);  
        location.replace('index.html'); // detail(view)로 이동이 더 많음
    });
});