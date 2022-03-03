async function getItemsFromServer(){
    try {
        const resp = await fetch('http://palgu8989.dothome.co.kr/items/read');
        const respText = await resp.text();
        const items = await JSON.parse(respText);
        return await items;
    } catch (error) {}
}
document.getElementById('getMyPF').addEventListener('click',()=>{
    getItemsFromServer().then((itemsObj)=>{
        console.log(itemsObj);
        makeListView(itemsObj.items);
    });
});

function makeListView(itemsArr){
    let str ='';
    itemsArr.forEach(elemObj => {
        str += '<div class="post-preview">';
        str += `<h2 class="post-title">${elemObj.name}</h2>`;            
        str += `<h3 class="post-subtitle">${elemObj.price}% 만족</h3>`;                
        str += `<p class="post-meta">Posted on ${elemObj.modified}</p></div>`;                    
        str += `<div class="w-100"><div class="mb-4" style="display: inline-block;"><a href="${elemObj.description}" class="btn btn-primary" data-ino="${elemObj.id}">보러 가기</a></div>`;
        str += `<div class="mb-4" style="display: inline-block; float: right;">`;
        str += `<button type="button" data-ino="${elemObj.id}" class="btn btn-primary updateMyPf">포트폴리오 수정</button>`;
        str += `<button class="btn btn-primary deleteMyPf" data-ino="${elemObj.id}" style="margin-left: 10px">포트폴리오 삭제</button></div></div>`;
        str += '<hr class="my-4" />';
    });
        str += `<div class="d-flex justify-content-end mb-4"><a class="btn btn-primary" id="createMyPF" href="create.html">포트폴리오 업로드</a></div>`;
    document.getElementById('pfArea').innerHTML = str;
}

document.addEventListener('click',(e)=>{
    if (e.target.classList.contains('updateMyPf')){
        location.href = 'update.html?'+e.target.dataset.ino;
    }
});