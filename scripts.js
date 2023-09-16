const boxes = document.querySelectorAll('.box');

boxes.forEach((element) => {
    element.addEventListener('click', () => {
        element.innerText = 'W';
    });
});