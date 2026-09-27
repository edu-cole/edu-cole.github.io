import * as THREE from 'three';

import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import {
scene,
controls,
setupCamera
} from '../js/gal_3D.js';

import {
galleryObjects
} from '../js/gal_3D_catalogo.js';

// =========================================================
// IDENTIFICAR CENÁRIO ATUAL
// =========================================================
const htmlAtual = window.location.pathname .split('/') .pop();
const cenaAtual = galleryObjects.find( item => item.html === htmlAtual );
if (!cenaAtual) {
console.error( 'Cenário não encontrado no catálogo:', htmlAtual);
throw new Error( 'Cenário não encontrado no catálogo.');
}
const nomeExclu = cenaAtual.id;
const ncams = Number(cenaAtual.ncams);

// =========================================================
// CONFIGURAÇÕES DA CÂMERA
// =========================================================
const camPos = [0, 0, 0];
const targetPos = [0, -0.25, 1];
const camFov = 50;
const camNear = 1;
const camFar = 5000;

// =========================================================
// CONFIGURAÇÕES DAS LUZES
// =========================================================
const ambientLightColor = 0xB1E1FF;
const directionalLightColor = 0xffffff;
const directionalLightIntensity = 1;
const directionalLightPos = [0, 100, 0];

// =========================================================
// CÂMERA
// =========================================================
const CameraExclu = new THREE.PerspectiveCamera( camFov, window.innerWidth / window.innerHeight, camNear, camFar );

CameraExclu.position.set( camPos[0], camPos[1], camPos[2]);
setupCamera(CameraExclu);
controls.target.set( targetPos[0], targetPos[1], targetPos[2]);
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;
controls.update();

// =========================================================
// LUZES
// =========================================================
const ambientLight = new THREE.AmbientLight( ambientLightColor);
scene.add( ambientLight );
const directionalLight = new THREE.DirectionalLight( directionalLightColor, directionalLightIntensity);
directionalLight.position.set( directionalLightPos[0], directionalLightPos[1], directionalLightPos[2] ).normalize();
scene.add( directionalLight );

// =========================================================
// RESET DA CÂMERA
// =========================================================
document.querySelector ('#reset_but') .addEventListener ('click', () => {
        CameraExclu.position.set( camPos[0], camPos[1], camPos[2] );
        controls.target.set( targetPos[0], targetPos[1], targetPos[2] );
        controls.update();
    }
);

// =========================================================
// CONFIGURAÇÃO DOS HDRs
// =========================================================
const hdrPath = 'bg_hdr/';
const camerasHDR = Array.from(
{ length: ncams },
(_, index) => {
        const cam = index + 1;
        return { low: `hdr_${nomeExclu}_cam${cam}_low.hdr`,
            high: `hdr_${nomeExclu}_cam${cam}_high.hdr`
        };
    }
);

// =========================================================
// ESTADO DOS HDRs
// =========================================================
const hdrCache = [];
let currentCamera = 0;
let loadingCamera = -1;

// =========================================================
// LOADER
// =========================================================
const rgbeLoader = new RGBELoader();

// =========================================================
// APLICAR HDR
// =========================================================
function applyHDR( texture ) {
texture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = texture;
scene.environment = texture;
}

// =========================================================
// CARREGAR HDR
// =========================================================
function loadHDR( cameraIndex, quality ) {
const file = camerasHDR[cameraIndex][quality];
return new Promise( (resolve, reject) => {
        rgbeLoader .setPath(hdrPath) .load( file, (texture) => {
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    resolve( texture );
                },
                undefined,
                reject
            );
    }
);
}

// =========================================================
// BOTÕES DAS CÂMERAS
// =========================================================
const cameraButtons = Array.from( document.querySelectorAll( '.cam_but') );

// =========================================================
// VALIDAR QUANTIDADE DE CÂMERAS
// =========================================================
if ( cameraButtons.length !== ncams ) {
console.warn( `O catálogo informa ${ncams} câmeras, ` + `mas o HTML possui ${cameraButtons.length} botões.`);
}

// =========================================================
// CONFIGURAR THUMBNAILS
// =========================================================
function setupCameraThumbnails() {
cameraButtons.forEach( (button, index) => {
        const cam = index + 1;
        button.style.backgroundImage = `url("imgs/${nomeExclu}_thumb_cam${cam}.jpg")`;
    }
);
}

// =========================================================
// ATUALIZAR BOTÃO ATIVO
// =========================================================
function updateCameraButtons() {
cameraButtons.forEach( (button, index) => {
        button.classList.toggle( 'act', index === currentCamera );
    }
);
}

// =========================================================
// CARREGAR UMA CÂMERA
// =========================================================
async function loadCamera( cameraIndex ) {
if ( cameraIndex < 0 || cameraIndex >= camerasHDR.length) {
    return;
}

// -----------------------------------------------------
// JÁ ESTÁ CARREGADA
// -----------------------------------------------------
if ( hdrCache[cameraIndex] && hdrCache[cameraIndex].high) {
    applyHDR( hdrCache[cameraIndex].high );
    return;
}

// -----------------------------------------------------
// EVITAR DUPLICAR CARREGAMENTO
// -----------------------------------------------------
if ( loadingCamera === cameraIndex ) {
    return;
}

loadingCamera = cameraIndex;
try {

    // -------------------------------------------------
    // LOW
    // -------------------------------------------------
    const lowTexture = await loadHDR( cameraIndex, 'low' );
    hdrCache[cameraIndex] = { low: lowTexture };
    applyHDR( lowTexture );

    // -------------------------------------------------
    // HIGH
    // -------------------------------------------------
    const highTexture = await loadHDR( cameraIndex, 'high' );
    hdrCache[cameraIndex].high = highTexture;
    applyHDR( highTexture );

    // -------------------------------------------------
    // LIBERAR LOW DA MEMÓRIA
    // -------------------------------------------------
    lowTexture.dispose();
    delete hdrCache[cameraIndex].low;
} catch (error) {
    console.error(
        `Erro ao carregar a câmera ${cameraIndex + 1} de ${nomeExclu}:`,
        error
    );
}
loadingCamera = -1;
}

// =========================================================
// TROCAR CÂMERA
// =========================================================
function changeCamera( cameraIndex ) {
if ( cameraIndex < 0 || cameraIndex >= camerasHDR.length) { return; }
currentCamera = cameraIndex;
updateCameraButtons();
loadCamera( cameraIndex);
}

// =========================================================
// EVENTOS DOS BOTÕES
// =========================================================
cameraButtons.forEach( (button, index) => {
    button.addEventListener( 'click', () => {
            CameraExclu.position.set( camPos[0], camPos[1], camPos[2] );
        controls.target.set( targetPos[0], targetPos[1], targetPos[2] );
        controls.update();
            changeCamera( index );
        }
    );
}
);

// =========================================================
// ESTADO INICIAL DOS BOTÕES
// =========================================================
updateCameraButtons();

// =========================================================
// THUMBNAILS
// =========================================================
setupCameraThumbnails();

// =========================================================
// INICIALIZAÇÃO
// =========================================================
loadCamera(0);