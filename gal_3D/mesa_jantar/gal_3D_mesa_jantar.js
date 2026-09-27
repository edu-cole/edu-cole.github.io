import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

import {
    scene,
    controls,
    loadedMeshes,
    setupCamera
} from '../js/gal_3D.js';

// nome OBJ / cenário
const nomeExclu = 'mesa_jantar';

// =========================================================
// CONFIGURAÇÕES DA CÂMERA
// =========================================================
const camPos = [0, 1000, 1100];
const targetPos = [0, 50, 0];
const camFov = 50;
const camNear = 1;
const camFar = 2600;

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
const CameraExclu = new THREE.PerspectiveCamera( camFov, window.innerWidth / window.innerHeight, camNear, camFar);
CameraExclu.position.set( camPos[0], camPos[1], camPos[2]);
setupCamera(CameraExclu);
controls.target.set( targetPos[0], targetPos[1], targetPos[2]);


// =========================================================
// LUZES
// =========================================================
const ambientLight = new THREE.AmbientLight( ambientLightColor);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight( directionalLightColor, directionalLightIntensity);
directionalLight.position.set( directionalLightPos[0], directionalLightPos[1], directionalLightPos[2]).normalize();
scene.add(directionalLight);

// =========================================================
// RESET DA CÂMERA
// =========================================================
document.querySelector('#reset_but').addEventListener('click', () => { CameraExclu.position.set( camPos[0], camPos[1], camPos[2]); controls.target.set( targetPos[0], targetPos[1], targetPos[2]);
controls.update();});

// Carregar o OBJ com materiais
        const mtlLoader = new MTLLoader();
        mtlLoader.load( `imgs/${nomeExclu}.mtl`, ( mtl ) => {
          mtl.preload();
          const objLoader = new OBJLoader();
          objLoader.setMaterials( mtl );
          objLoader.load( `${nomeExclu}.obj`, ( root ) => {
            root.traverse((child) => {
              if (child.isMesh) {
                loadedMeshes.push(child);
                child.material.side = THREE.DoubleSide;
                root.position.set(0, 0, 0);
                envMap: scene.environment;

			//VIDRO
			if (child.material.name === 'mj_vidros1') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xdddddd,
        metalness: 0.2,
        roughness: 0.01,
        transmission: 1,
        thickness: 0.3,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}			
    //VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_prato4') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos4.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(0.08, 0.08); // Reescalona a textura
      bumpt.offset.set(0.15, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_prato3') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos3.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(1, 1); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 3,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_prato2') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos2.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(0.15, 0.15); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 2,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_prato1') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos1.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(0.8, 0.8); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 2,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_copo6') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dots.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(1, 1); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_copo5') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/WaterPlain0017_1_L.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(0.25, 0.25); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_copo4') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos4.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(1.5, 1.5); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 
      if (child.material.name === 'mj_copo3') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos3.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(0.9, 0.9); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_copo2') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos2.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(1, 1); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_copo1') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/dissolve_circulos1.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(2, 2); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xbbbbbb,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_jarro1') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/padrao_pepper_redondo.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(1, 1); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        bumpMap: bumpt,
        bumpScale: 1,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_jarro2') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/InkDrop0003_5_L_invert.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(3, 3); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        bumpMap: bumpt,
        bumpScale: 2,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_chicaras') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/InkFull0009_4_L.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(10, 10); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        bumpMap: bumpt,
        bumpScale: 2,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_bandeja') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/GrungePaint0037_M.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(1, 1); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        bumpMap: bumpt,
        bumpScale: 2,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
//VIDRO Azul 0xF5F5F6,
      if (child.material.name === 'mj_acucareiro') {
        const tLoada1 = new THREE.TextureLoader();
      const bumpt = tLoada1.load('./imgs/WrinklesMessyFolds0009_L_amarel2.jpg');
      bumpt.mapping = THREE.EquirectangularReflectionMapping;
      bumpt.wrapS = THREE.RepeatWrapping;
      bumpt.wrapT = THREE.RepeatWrapping;
      bumpt.repeat.set(5, 5); // Reescalona a textura
      bumpt.offset.set(0, 0); // Reposiciona a textura
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        bumpMap: bumpt,
        bumpScale: 4,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}
      // crome
            if (child.material.name === 'mj_madeira') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/21246a8b4c20a.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.1, 0.1); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 0.1,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// luz_traseira
            if (child.material.name === 'mj_metal') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xF5F5F6,
            metalness: 1,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'mj_plastico_marrom') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xA07757,
            metalness: 0.3,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'mj_silver') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF6F9FB,
            metalness: 1,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'mj_matte_alum') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xBDBDBE,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'mj_branco_fosco') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'mj_porcelana') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF5F5F6,
            metalness: 0.5,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'mj_acucar') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF0F0F0,
            metalness: 0.1,
            roughness: 0.8, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

// SALVAR MATERIAL FINAL DO MODO BEAUTY
        child.userData.beautyMaterial = child.material;


		// fim dos mtls extras


							}
						});
						scene.add(root);
					});
				});


// Background HDR
        new RGBELoader()
    .setPath('bg_hdr/')
    .load(`hdr_${nomeExclu}_low.hdr`, function (lowResTexture) {
        lowResTexture.mapping = THREE.EquirectangularReflectionMapping;

        // Aplicar a versão de baixa resolução como background e environment
        scene.background = lowResTexture;
        scene.environment = lowResTexture;

        // Carregar a imagem HDR em alta resolução em segundo plano
        new RGBELoader()
            .setPath('bg_hdr/')
            .load(`hdr_${nomeExclu}_high.hdr`, function (highResTexture) {
                highResTexture.mapping = THREE.EquirectangularReflectionMapping;

                // Substituir a imagem de baixa resolução pela de alta qualidade
                scene.background = highResTexture;
                scene.environment = highResTexture;

                console.log('HDR de alta qualidade carregada e aplicada.');
            });
    });