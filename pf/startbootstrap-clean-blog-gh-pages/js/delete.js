document.addEventListener('click', (e)=>{
    if (e.target.classList.contains('deleteMyPf')) {
        deletePfFromServer(e.target.dataset.ino).then((result) => {
            alert(result.message);
            document.getElementById('getMyPF').click();
        });
    }
});

async function deletePfFromServer(ino){
    try {
        const url = 'http://palgu8989.dothome.co.kr/items/delete';
        const config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www.form.urlencoded'
            },
            body: JSON.stringify({id: ino})
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}