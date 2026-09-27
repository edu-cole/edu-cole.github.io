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
const nomeExclu = 'steamsub';

// =========================================================
// CONFIGURAÇÕES DA CÂMERA
// =========================================================
const camPos = [0, 100, 400];
const targetPos = [0, -70, 0];
const camFov = 50;
const camNear = 1;
const camFar = 1500;

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
                root.position.set(0, -0.75, 200);
                envMap: scene.environment;

			//VIDRO
			if (child.material.name === 'sn_vidros') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.01,
        transmission: 1,
        thickness: 0.01,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}			
    //VIDRO Azul
      if (child.material.name === 'sn_agua') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xd5eaff,
        metalness: 0,
        roughness: 0.01,
        transmission: 1,
        thickness: 0.01,
        ior: 1.5,
        transparent: true,
        opacity: 0.5,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}      
// luz_pisca
            if (child.material.name === 'sn_luzes_brancas') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            emissive: 0xdddddd,
            emissiveIntensity: 0.5,
            metalness: 0.1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// luz_pisca
            if (child.material.name === 'sn_luzes_turbinas') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x00FFD4,
            emissive: 0x00FFD4,
            emissiveIntensity: 10,
            metalness: 0,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
            // crome
            if (child.material.name === 'sn_asa1') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/dissolve_circulos3_azul2.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.006, 0.006); // Reescalona a textura
      albta1.offset.set(0.15, 0.01); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 1,
            roughness: 0.6, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'sn_asa2') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/clouds1.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.05, 0.05); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 1,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}// crome
            if (child.material.name === 'sn_asa3') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/dissolve_circulos4_2b.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.025, 0.025); // Reescalona a textura
      albta1.offset.set(0.15, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 1,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
		// luz_traseira
            if (child.material.name === 'sn_helices') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x00B900,
            metalness: 1,
            roughness: 0.01, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'sn_piso_deck') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/Cold As Ice.png');
      albta1.repeat.set(0.5, 0.5); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 0,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'sn_madeiras') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/21246a8b4c20.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.01, 0.01); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 0,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}  
if (child.material.name === 'sn_cobre') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF6A564,
            metalness: 1,
            roughness: 0.01, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sn_metal_dark') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x828285,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'sn_piscina') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/ceramic_azul.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.035, 0.035); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 0,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'sn_turbinas') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x7FA9FF,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sn_plastico_branco') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sn_metal') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF5F5F6,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'sn_marmore') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/dc678975b2e1.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.05, 0.05); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 0,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'sn_piso_salao') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF0F0F0,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
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