document.getElementById('feedbackBtn').addEventListener('click',()=>{
    document.getElementById('giveFeedback').style.display = 'none';
    document.getElementById('feedbackBox').style.display = '';
});

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('recivBtn')){
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let feedCont = document.getElementById('feedCont').value;
        console.log(name, email, feedCont);
        document.getElementById('feedbackBox').style.display = 'none';
        document.getElementById('feedbackBtn').style.display = '';
        let str = '';
        str += `<div id="seeFeedback"><p>${name}님의 피드백</p>`;
        str += `<p>: ${feedCont}</p>`;
        str += `<p>email: ${email}</p></div>`;
        document.getElementById('feedbackSec').innerHTML += str;
    }
});

async function getFeedbackFromServer(){
    try {
        const resp = await fetch('http://palgu8989.dothome.co.kr/items/read')
        const respText = await resp.text();
        const fbList = await JSON.parse(respText);
        return await fbList;
    } catch (error) {}
}
// document.getElementById('feedbackBtn').addEventListener('click',()=>{
//     getFeedbackFromServer().then((fbObj)=>{
//         console.log(fbObj);
//     });
// });

async function createFbToServer(fbObj){
    try {
        const url = 'http://palgu8989.dothome.co.kr/items/create';
        const config = {
            method: 'PSOT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(fbObj)
        }
        const resp = await fetch(url, config);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    } finally {
        console.log('async completed');
    }
}
document.getElementById('recivBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    const inputs = document.querySelectorAll('#feedbackForm input');

    let fbObj = {};

    inputs.forEach(elem =>{
        fbObj[elem.id] = elem.value;
    });
    console.log(fbObj);

    const now = new Date();
    let createdNow = `${now.getFullYear()}`
});