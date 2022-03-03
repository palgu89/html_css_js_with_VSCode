async function getPfFromServer(ino){
    try {
        const resp = await fetch('http://palgu8989.dothome.co.kr/items/read/'+ino);
        const respText = await resp.text();
        const itemsObj = await JSON.parse(respText);
        return await itemsObj;
    } catch (error) {
        console.log(error);
    } finally{
        console.log('async completed');
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const queryString = location.search;
    let ino = queryString.substring(1);

    getPfFromServer(ino).then(itemsObj=>{
        console.log(itemsObj.items[0]);
        setInputsValue(itemsObj.items[0]);
    });
});

function setInputsValue(itemsObj){
    const inputs = document.querySelectorAll('#pfInput input');

    inputs.forEach(elem => {
        elem.value = itemsObj[elem.id];
    });
}

document.querySelector('#updateBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    const inputs = document.querySelectorAll('#pfInput input');
    let itemsObj = {};
    
    inputs.forEach(elem => {
        itemsObj[elem.id] = elem.value;
    });

    const now = new Date();
    let createdNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    itemsObj.modified = createdNow;
    updatePfToServer(itemsObj).then((result)=>{
        alert(result.message);
        location.replace('index.html');
    });
});

async function updatePfToServer(itemsObj){
    try {
        const url = 'http://palgu8989.dothome.co.kr/items/update';
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(itemsObj)
        }
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}