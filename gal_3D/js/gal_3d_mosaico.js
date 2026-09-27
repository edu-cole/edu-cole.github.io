import { galleryObjects } from './gal_3D_catalogo.js';
// =========================================================
// IDIOMA
// =========================================================
const params =
    new URLSearchParams(window.location.search);
let language =
    params.get('lang') || 'pt';
if (language !== 'en' && language !== 'pt') {
    language = 'pt';
}

// =========================================================
// TÍTULO DA PÁGINA
// =========================================================
if (language === 'en') {
    document.title =
        '3D Navigations - Eduardo Cole';
    document.querySelector('#titulo_pagina').textContent =
        '3D Navigations - Eduardo Cole';
} else {
    document.title =
        'Navegações 3D - Eduardo Cole';
    document.querySelector('#titulo_pagina').textContent =
        'Navegações 3D - Eduardo Cole';
}

// =========================================================
// SEÇÕES
// =========================================================
const gridObjetos =
    document.querySelector('#grid_objetos');
const gridCenarios =
    document.querySelector('#grid_cenarios');
const tituloObjetos =
    document.querySelector('#titulo_objetos');
const tituloCenarios =
    document.querySelector('#titulo_cenarios');
if (language === 'en') {
    tituloObjetos.textContent =
        '3D OBJECTS';
    tituloCenarios.textContent =
        '3D SCENES';
} else {
    tituloObjetos.textContent =
        'OBJETOS 3D';
    tituloCenarios.textContent =
        'CENAS 3D';
}

// =========================================================
// GERAR CARDS
// =========================================================
function gerarCards(tipo, grid) {

    // -----------------------------------------------------
    // PUBLICADOS
    // -----------------------------------------------------
    const publicados = galleryObjects.filter( object =>
                object.type === tipo && object.status === 'published' );

    // -----------------------------------------------------
    // COMINGS
    // -----------------------------------------------------
    const comings = galleryObjects.filter( object => 
                object.type === tipo && object.status === 'coming' );

    // -----------------------------------------------------
    // QUANTIDADE DE COMINGS NECESSÁRIA
    // -----------------------------------------------------
    const resto = publicados.length % 4;
    const quantidadeComing = resto === 0 ? 0 : 4 - resto;

    // -----------------------------------------------------
    // SELECIONAR CARDS QUE SERÃO EXIBIDOS
    // -----------------------------------------------------
    const objetosExibidos = publicados.concat( comings.slice(0, quantidadeComing) );

    // -----------------------------------------------------
    // CRIAR CARDS
    // -----------------------------------------------------
    objetosExibidos.forEach((object) => {

        // -------------------------------------------------
        // CRIAR LINK
        // -------------------------------------------------
        const card = document.createElement('a');
        card.className = 'card_3d';
        card.dataset.object = object.id;

        // -------------------------------------------------
        // LINK
        // -------------------------------------------------
        card.href = `${object.folder}/${object.html}?lang=${language}`;

        // -------------------------------------------------
        // IMAGEM
        // -------------------------------------------------
        const image = document.createElement('img');
        if (language === 'en') { image.src = `imgs/${object.imageEN}`;
            image.alt = object.titleEN;
        } else {
            image.src = `imgs/${object.imagePT}`;
            image.alt = object.titlePT;
        }

        // -------------------------------------------------
        // TÍTULO
        // -------------------------------------------------
        const title = document.createElement('div');
        title.className = 'card_title';
        if (language === 'en') {
            title.textContent = object.titleEN;
        } else {
            title.textContent = object.titlePT;
        }

        // -------------------------------------------------
        // MONTAR CARD
        // -------------------------------------------------
        card.appendChild(image);
        card.appendChild(title);

        // -------------------------------------------------
        // COLOCAR NA SEÇÃO
        // -------------------------------------------------
        grid.appendChild(card);
    });
}

// =========================================================
// OBJETOS
// =========================================================
gerarCards( 'object', gridObjetos);

// =========================================================
// CENÁRIOS
// =========================================================

gerarCards( 'scene', gridCenarios);

// =========================================================
// HOME
// =========================================================
const homeBut =
    document.querySelector('#home_but');
if (language === 'en') {
    homeBut.href =
        '../index_en.html';
} else {
    homeBut.href =
        '../index.html';
}

// =========================================================
// RGB
// =========================================================
const rgbBut =
    document.querySelector('#rgb_but');
if (language === 'en') {
    rgbBut.href =
        '../index_rgb_en.html';
} else {
    rgbBut.href =
        '../index_rgb.html';
}

// =========================================================
// BANDEIRAS
// =========================================================
const langPT =
    document.querySelector('#lang_pt');
langPT.href =
    window.location.pathname + '?lang=pt';
const langEN =
    document.querySelector('#lang_en');
langEN.href =
    window.location.pathname + '?lang=en';

// =========================================================
// MOVIMENTO 3D DOS CARDS
// =========================================================
const cards = 
    document.querySelectorAll('#grid_objetos .card_3d, #grid_cenarios .card_3d' );
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
        const strength =
            0.75 + (index % 4) * 0.08;
        const rotateY =
            mouseX * 5 * strength;
        const rotateX =
            mouseY * -5 * strength;
        card.style.transform =
            `rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
    });

    requestAnimationFrame(animateCards);
}

animateCards();