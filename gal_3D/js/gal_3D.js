import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { galleryObjects } from './gal_3D_catalogo.js';

let camera, scene, renderer, controls;
let cubeCamera;

//set java buttons
let currentViewMode = 'beauty';
const loadedMeshes = [];
const edgeObjects = [];
let edgesEnabled = false;

init();

function init() {
				const canvas = document.querySelector( '#c' );
				renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				scene = new THREE.Scene();
				
				window.addEventListener( 'resize', onWindowResized );

				// Cube Camera para reflexões
				cubeCamera = new THREE.CubeCamera( 1, 1000, new THREE.WebGLCubeRenderTarget( 256, { type: THREE.HalfFloatType } ) );
			}

// =========================================================
// CONFIGURAÇÃO DA CÂMERA
// =========================================================
function setupCamera(newCamera) {
				camera = newCamera;
				controls = new OrbitControls( camera, renderer.domElement );
				controls.autoRotate = true;
				controls.autoRotateSpeed = 1.5;
				animate();
			}

// =========================================================
// IDIOMA DA PÁGINA
// =========================================================
const pageParams = new URLSearchParams(window.location.search);
const pageLanguage = pageParams.get('lang') || 'pt';

// =========================================================
// AVISO INICIAL - NAVEGAÇÃO 3D
// =========================================================
const htmlAtual = window.location.pathname .split('/') .pop();
const paginaAtual = galleryObjects.find( item => item.html === htmlAtual);
const isScene = paginaAtual && paginaAtual.type === 'scene';
const helpBox = document.createElement('div'); helpBox.id = 'navigation_help';

// ---------------------------------------------------------
// IDIOMA
// ---------------------------------------------------------
const helpLanguage = new URLSearchParams(window.location.search) .get('lang') || 'pt';

// ---------------------------------------------------------
// TEXTO
// ---------------------------------------------------------

if (isScene) {
if (helpLanguage === 'en') {
    helpBox.innerHTML =
        'Click and drag with the left mouse button to rotate the 3D scene,<br>' +
        'use the buttons to explore the 3D scene further.';
} else {
    helpBox.innerHTML =
        'Clique e arraste com o botão esquerdo para rotacionar a cena 3D,<br>' +
        'use os botões para explorar melhor a cena 3D.';
}
} else {
if (helpLanguage === 'en') {
    helpBox.innerHTML =
        'Click and drag with the left mouse button to rotate the object,<br>' +
        'click and drag with the right mouse button to position the object,<br>' +
        'use the mouse wheel to zoom in and out<br>' +
        'And use the buttons to explore the 3D models further.';
} else {
    helpBox.innerHTML =
        'Clique e arraste com o botão esquerdo para rotacionar o objeto,<br>' +
        'clique e arraste com o botão direito para posicionar o objeto,<br>' +
        'use o scroll do mouse para dar zoom (in e out) no objeto<br>' +
        'e use os botões para explorar melhor a modelagem 3D.';
}
}

// ---------------------------------------------------------
// BOTÃO X
// ---------------------------------------------------------
const closeButton =
    document.createElement('span');
closeButton.id = 'navigation_help_close';
closeButton.textContent = '×';
helpBox.appendChild(closeButton);
// ---------------------------------------------------------
// ADICIONAR À PÁGINA
// ---------------------------------------------------------
document.body.appendChild(helpBox);
// ---------------------------------------------------------
// FECHAR
// ---------------------------------------------------------
function closeNavigationHelp() {
    helpBox.classList.add('hidden');
}
// ---------------------------------------------------------
// PRIMEIRO CLIQUE / PRESSÃO DO MOUSE
// ---------------------------------------------------------
document.addEventListener(
    'pointerdown',
    closeNavigationHelp,
    { once: true }
);

// =========================================================
// NAVEGAÇÃO PRINCIPAL
// =========================================================
// HOME
const homeBut = document.querySelector('#home_but'); if (pageLanguage === 'en') { homeBut.href = '../../index_en.html';} else { homeBut.href = '../../index.html';}
// RGB
const backBut = document.querySelector('#back_but'); if (pageLanguage === 'en') { backBut.href = '../../index_rgb_en.html';} else { backBut.href = '../../index_rgb.html';}
// GALERIA
const galListBut = document.querySelector('#gal_list_but'); galListBut.href = `../gal_3d_mosaico.html?lang=${pageLanguage}`;

// =========================================================
// NAVEGAÇÃO ENTRE OBJETOS / CENÁRIOS - ANTERIOR / PRÓXIMO
// =========================================================
// ---------------------------------------------------------
// ITENS DISPONÍVEIS PARA NAVEGAÇÃO
// ---------------------------------------------------------
const navigableItems =
    galleryObjects.filter(
        item => item.status === 'published'
    );
// ---------------------------------------------------------
// IDENTIFICAR ITEM ATUAL
// ---------------------------------------------------------
const currentFolder =
    window.location.pathname.split('/').slice(-2, -1)[0];
const currentIndex =
    navigableItems.findIndex(
        item => item.folder === currentFolder
    );
// ---------------------------------------------------------
// CONFIGURAR PREV / NEXT
// ---------------------------------------------------------
if (currentIndex !== -1) {
    const previousIndex =
        (currentIndex - 1 + navigableItems.length) %
        navigableItems.length;
    const nextIndex =
        (currentIndex + 1) %
        navigableItems.length;
    // -----------------------------------------------------
    // PREVIOUS
    // -----------------------------------------------------
    const prevBut =
        document.querySelector('#prev_but');
    const previousItem =
        navigableItems[previousIndex];
    prevBut.href =
        `../${previousItem.folder}/${previousItem.html}?lang=${pageLanguage}`;
    // -----------------------------------------------------
    // NEXT
    // -----------------------------------------------------
    const nextBut =
        document.querySelector('#next_but');
    const nextItem =
        navigableItems[nextIndex];
    nextBut.href =
        `../${nextItem.folder}/${nextItem.html}?lang=${pageLanguage}`;
}
			// FULLSCREEN
			const fullscreenButton =
    		document.querySelector('#fullscreen_but');
			function updateFullscreenButton() {
		    if (document.fullscreenElement) {
	        fullscreenButton.classList.add('act');
		    }else{
	        fullscreenButton.classList.remove('act');
		    }
			}

			fullscreenButton.addEventListener('click', async () => {
		    if (!document.fullscreenElement) {
	        await document.documentElement.requestFullscreen();
		    } else {
	        await document.exitFullscreen();
		    }
			});
			document.addEventListener('fullscreenchange', () => {
		    updateFullscreenButton();
		    });

			updateFullscreenButton();

			//velos
			const rotationSpeeds = [
    		{speed: 1.5, act: 'vel1_act.png', hover: 'vel1_hover.png'},
    		{speed: 0.75, act: 'vel05_act.png', hover: 'vel05_hover.png'},
    		{speed: 0.375, act: 'vel025_act.png', hover: 'vel025_hover.png'},
    		{speed: 0, act: 'vel0_act.png', hover: 'vel0_hover.png'},
    		{speed: 2.25, act: 'vel1_5_act.png', hover: 'vel1_5_hover.png'}
			];
			let rotationSpeedIndex = 0;
			const rotationSpeedButton = document.querySelector('#anim_speed');
			function updateSpeedButton() {const currentSpeed = rotationSpeeds[rotationSpeedIndex]; rotationSpeedButton.style.backgroundImage = `url("../imgs/${currentSpeed.act}")`;}
			updateSpeedButton();
			rotationSpeedButton.addEventListener('click', () => {
		    rotationSpeedIndex++;
		    if (rotationSpeedIndex >= rotationSpeeds.length) {
        	rotationSpeedIndex = 0;
    		}
    		const currentSpeed = rotationSpeeds[rotationSpeedIndex];

    		// Quando chegar ao 0x, parar completamente a rotação
    		if (currentSpeed.speed === 0) {
        	controls.autoRotate = false;
    		} else {
        	controls.autoRotate = true;
        	controls.autoRotateSpeed = currentSpeed.speed;
    		}
    		updateSpeedButton();
    		});
    		rotationSpeedButton.addEventListener('mouseenter', () => {
    		const currentSpeed =
        	rotationSpeeds[rotationSpeedIndex];
		    rotationSpeedButton.style.backgroundImage =
        	`url("../imgs/${currentSpeed.hover}")`;
			});
			rotationSpeedButton.addEventListener('mouseleave', () => {
		    const currentSpeed =
        	rotationSpeeds[rotationSpeedIndex];
		    rotationSpeedButton.style.backgroundImage =
        	`url("../imgs/${currentSpeed.act}")`;
			});

			function onWindowResized() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function setViewMode(mode) {
			currentViewMode = mode;
			loadedMeshes.forEach((mesh) => {
			if (mode === 'beauty') {
			mesh.material = mesh.userData.beautyMaterial;
			}
			if (mode === 'clay') {
			mesh.material = new THREE.MeshStandardMaterial({
				color: '#c05648',
				roughness: 0.65,
				metalness: 0,
				side: THREE.DoubleSide
			});
			}
			if (mode === 'wireframe') {
			mesh.material = new THREE.MeshBasicMaterial({
				color: '#ffffff',
				wireframe: true,
				side: THREE.DoubleSide
			});
			}
			});
			}

			function toggleEdges() {
			if (edgesEnabled) {
			loadedMeshes.forEach((mesh) => {
			const geometry = new THREE.WireframeGeometry(mesh.geometry);
			const material = new THREE.LineBasicMaterial({
				color: '#ffffff'
			});
			const edges = new THREE.LineSegments(geometry, material);
			mesh.add(edges);
			edgeObjects.push(edges);
			});
			} else {
			edgeObjects.forEach((edge) => {
			edge.parent.remove(edge);
			edge.geometry.dispose();
			edge.material.dispose();
			});
			edgeObjects.length = 0;
			}
			}

			// BOTÕES DE VISUALIZAÇÃO
			document.querySelectorAll('.v_butb, .v_butc, .v_butw, .v_bute').forEach((button) => {
		    button.addEventListener('click', () => {
	        const mode = button.dataset.mode;
	        if (mode === 'edges') {
            edgesEnabled = !edgesEnabled;
            button.classList.toggle('act', edgesEnabled);
            toggleEdges();
            return;
	        }
	        setViewMode(mode);
	        document
            .querySelectorAll('.v_butb, .v_butc, .v_butw, .v_bute')
            .forEach((btn) => {
	        if (btn.dataset.mode !== 'edges') {
            btn.classList.remove('act');
            }
            });
	        button.classList.add('act');
		    });
			});

			function animate( msTime ) {
				const time = msTime / 1000;
				// Atualizar a câmera cubo para reflexões
				cubeCamera.update( renderer, scene );
				// Atualizar os controles
				controls.update();
				// Renderizar a cena
				renderer.render( scene, camera );
				requestAnimationFrame( animate );
			}

// ======================================================
// JANELA DE INFORMAÇÕES
// ======================================================

const infoButton = document.querySelector('#info_but');
const infoOverlay = document.querySelector('#info_overlay');
const infoClose = document.querySelector('#info_close');

const infoLang = document.querySelector('#info_lang');
const infoContentPT = document.querySelector('#info_content_pt');
const infoContentEN = document.querySelector('#info_content_en');

//idioma inicial
const urlParams = new URLSearchParams(window.location.search);
let infoLanguage = urlParams.get('lang');

// Se não existir ?lang=..., usamos português
if (infoLanguage !== 'en' && infoLanguage !== 'pt') {
    infoLanguage = 'pt';
}

// =========================================================
// ATUALIZA CONTEÚDO + BANDEIRA
// =========================================================
function updateInfoLanguage() {
    if (infoLanguage === 'pt') {
        infoContentPT.style.display = 'block';
        infoContentEN.style.display = 'none';
        // Idioma atual = português
        infoLang.style.backgroundImage =
            'url("../imgs/bandeira_br_thumb1.jpg")';
        infoLang.setAttribute(
            'aria-label',
            'Mudar para inglês'
        );
    } else {
        infoContentPT.style.display = 'none';
        infoContentEN.style.display = 'block';
        // Idioma atual = inglês
        infoLang.style.backgroundImage =
            'url("../imgs/bandeira_en_thumb1.jpg")';
        infoLang.setAttribute(
            'aria-label',
            'Mudar para português'
        );
    }
}

// =========================================================
// BANDEIRA — HOVER
// =========================================================
infoLang.addEventListener('mouseenter', () => {
    if (infoLanguage === 'pt') {
        // Estou em PT → hover mostra EN
        infoLang.style.backgroundImage =
            'url("../imgs/bandeira_en_thumb1.jpg")';
    } else {
        // Estou em EN → hover mostra PT
        infoLang.style.backgroundImage =
            'url("../imgs/bandeira_br_thumb1.jpg")';
    }
});
infoLang.addEventListener('mouseleave', () => {
    // Saiu do hover → volta a mostrar idioma atual
    updateInfoLanguage();
});

// =========================================================
// BANDEIRA — CLIQUE
// =========================================================
infoLang.addEventListener('click', () => {
    if (infoLanguage === 'pt') {
        infoLanguage = 'en';
    } else {
        infoLanguage = 'pt';
    }
    // Atualiza a URL sem recarregar a página
    const newURL =
        window.location.pathname +
        '?lang=' + infoLanguage;
    window.history.replaceState({}, '', newURL);
    updateInfoLanguage();
});


// ABRIR
infoButton.addEventListener('click', () => {
    infoOverlay.classList.add('open');
    infoButton.classList.add('act');
});
// FECHAR PELO X
infoClose.addEventListener('click', () => {
    infoOverlay.classList.remove('open');
    infoButton.classList.remove('act');
});
// FECHAR CLICANDO FORA DA JANELA
infoOverlay.addEventListener('click', (event) => {
    if (event.target === infoOverlay) {
        infoOverlay.classList.remove('open');
        infoButton.classList.remove('act');
    }
});
// FECHAR COM ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        infoOverlay.classList.remove('open');
        infoButton.classList.remove('act');
    }
});			

// =========================================================
// INICIALIZA IDIOMA
// =========================================================
updateInfoLanguage();
export {
    scene,
    camera,
    controls,
    loadedMeshes,
    setupCamera
};