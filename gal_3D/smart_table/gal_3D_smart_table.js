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
const nomeExclu = 'mesa_smart';

// =========================================================
// CONFIGURAÇÕES DA CÂMERA
// =========================================================
const camPos = [0, 1100, -2200];
const targetPos = [0, 300, 0];
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
                root.position.set(0, 0, 200);
                envMap: scene.environment;

			//VIDRO
			if (child.material.name === 'ms_monitor_vidro') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
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
      if (child.material.name === 'ms_vidro') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xeeeeee,
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
            if (child.material.name === 'ms_luz_central') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            emissive: 0xdddddd,
            emissiveIntensity: 1,
            metalness: 0.1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// luz_pisca
            if (child.material.name === 'ms_leds_verdes') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x00FF00,
            emissive: 0x00FF00,
            emissiveIntensity: 1,
            metalness: 0.1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
            // crome
            if (child.material.name === 'ms_grade_redonda') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/dots.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(1, 1); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            alphaMap: albta1,
            metalness: 1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
            transparent: true,
          });
			child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'ms_grade_reta') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/carnav3_pb_inv.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(1.5, 1.5); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
            color: 0x333333,
            alphaMap: albta1,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
            transparent: true,
          });
      child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'ms_panel_timer') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/painel_smart_table copy.jpg');
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(-1, -1); // Reescalona a textura
      albta1.offset.set(0, 0); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// crome
            if (child.material.name === 'ms_iphone_screen') {
      const tLoada1 = new THREE.TextureLoader();
      const albta1 = tLoada1.load('./imgs/iphone-5-home-screen-ios-72.jpg', (loadedTexture) => {
      });
      albta1.mapping = THREE.EquirectangularReflectionMapping;
      albta1.wrapS = THREE.RepeatWrapping;
      albta1.wrapT = THREE.RepeatWrapping;
      albta1.repeat.set(0.085, 0.15); // Reescalona a textura
      albta1.offset.set(0, -0.025); // Reposiciona a textura

      child.material = new THREE.MeshStandardMaterial({
      map: albta1,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
// luz_traseira
            if (child.material.name === 'ms_metal_geral') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            metalness: 1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
		// luz_traseira
            if (child.material.name === 'ms_caixas_mus1') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xE0D9BD,
            metalness: 0,
            roughness: 0.01, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_plast_black') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x404040,
            metalness: 0.2,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_plast_grey') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x4E4E4E,
            metalness: 0,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_crome') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x808080,
            metalness: 1,
            roughness: 0.01, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_madeira') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xE0A531,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_feltros_mus') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x323232,
            metalness: 0,
            roughness: 0.7, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_plast_white') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xddcccc,
            metalness: 0.1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_poste_luz_central') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF5EBE6,
            metalness: 1,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_gunmetal') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_cobre') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xC68676,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_plast_wine') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x691515,
            metalness: 1,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_pink_metal') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xFF80BF,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_green_metal') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x00F900,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_plast_yellow') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xFFEA00,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_plast_blue') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x00A8FF,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'ms_caixas_mus2') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF1F2F8,
            metalness: 1,
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
    .load('hdr_mesa_smart_low.hdr', function (lowResTexture) {
        lowResTexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.backgroundRotation.y += -1.58;
        scene.environmentRotation.y += -1.58;

        // Aplicar a versão de baixa resolução como background e environment
        scene.background = lowResTexture;
        scene.environment = lowResTexture;

        // Carregar a imagem HDR em alta resolução em segundo plano
        new RGBELoader()
            .setPath('bg_hdr/')
            .load('hdr_mesa_smart_high.hdr', function (highResTexture) {
                highResTexture.mapping = THREE.EquirectangularReflectionMapping;
              
                // Substituir a imagem de baixa resolução pela de alta qualidade
                scene.background = highResTexture;
                scene.environment = highResTexture;

                console.log('HDR de alta qualidade carregada e aplicada.');
            });
    });