async function registerItemToServer(itemObj){
    try {
        const url = 'http://palgu8989.dothome.co.kr/items/create';
        const config = {    // get방식 쓰면 주소에 노출 되기 때문에 post로 바꿔주는 과정
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(itemObj)   // 서버는 string밖엔 못 받으니 string으로 바꿔줌
        }
        const resp = await fetch(url, config);  // config를 url에 실어 보낸다
        const result = await resp.json();   // resp 안 내용을 json으로 형변환
        return await result;
    } catch (error) {
        console.log(error);
    }
}

document.querySelector('button.w-100').addEventListener('click',(e)=>{
    e.preventDefault(); // 페이지 이동을 막음
    const inputs = document.querySelectorAll('.needs-validation input');
    
    let itemObj = {};

    inputs.forEach(elem =>{
        itemObj[elem.id] = elem.value;
    });
    console.log(itemObj);

    // 아래와 똑같은 결과임.
    // let categoryId = document.getElementById('category_id');
    // let selectedValue = categoryId.options[categoryId.options.selectedIndex].value;
    // console.log(selectedValue);

    itemObj.category_id = document.querySelector('#category_id option:checked').value;

    const now = new Date();
    let createdNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    itemObj.created = createdNow;

    registerItemToServer(itemObj).then(result => {
        // console.log(result);
        alert(result.message);  // create.php에 미리 생성해둔 메세지가 나옴
        location.replace('index.html'); // create하고 다시 index.html로 덮어씌움 -> 덮어 씌우면 create의 정보가 남지 않음
    });
    // console.log(itemObj);
});