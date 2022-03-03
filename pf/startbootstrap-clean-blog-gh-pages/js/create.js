async function createPfToServer(itemsObj){
    try {
        console.log(itemsObj);
        debugger;
        const url = 'http://palgu8989.dothome.co.kr/items/create';
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(itemsObj)
        }
        const resp = await fetch(url, config);
        debugger;
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    } finally{
        console.log('async completed');
    }
}

document.getElementById('createBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    const inputs = document.querySelectorAll('#pfInput input');

    let itemsObj = {};

    inputs.forEach(elem => {
        itemsObj[elem.id] = elem.value;
    });
    console.log(itemsObj);

    const now = new Date();
    let createdNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    itemsObj.created = createdNow;

    createPfToServer(itemsObj).then((result)=>{
        alert(result.message);
        location.replace('index.html');
    });
});