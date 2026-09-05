const cards = document.querySelectorAll('.card_3d');


let mouseX = 0;
let mouseY = 0;


document.addEventListener('mousemove', (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;

});


function animateCards() {

    cards.forEach((card, index) => {

        /*
        Cada card recebe uma intensidade
        ligeiramente diferente.
        */

        const strength =
            0.75 + (index % 4) * 0.08;


        const rotateY =
            mouseX * 3 * strength;


        const rotateX =
            mouseY * -3 * strength;


        card.style.transform =
            `rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    requestAnimationFrame(animateCards);

}


animateCards();