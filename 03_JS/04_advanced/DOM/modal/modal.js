const modalBtn = document.getElementById('modalBtn');
const closeBtn = document.getElementById('closeBtn');
const modal = document.querySelector('.modal-wrapper');

modalBtn.onclick = () => {
    modal.style.display = 'block';
};

closeBtn.onclick = () => {
    modal.style.display = 'none';
};