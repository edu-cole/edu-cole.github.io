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
const nomeExclu = 'hurobo';

// =========================================================
// CONFIGURAÇÕES DA CÂMERA
// =========================================================
const camPos = [0, 30, 34];
const targetPos = [0, 17, 0];
const camFov = 50;
const camNear = 1;
const camFar = 100;

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
								root.position.set(0, -0.5, 0);
								envMap: scene.environment;

			//alum_geral
			if (child.material.name === 'base_kbca') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x666773,
            metalness: 0.7,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}					

            // crome
            if (child.material.name === 'steel_jaw_eyes') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// red
            if (child.material.name === 'dark_metal_') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x908F85,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// copper
            if (child.material.name === 'copper_bochecha') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x9b5400,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}	
		// luz_traseira
            if (child.material.name === 'chest_ears_joelhos') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xFFF9D8,
            metalness: 0.8,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}		

		// 18 - Default
            if (child.material.name === 'purple_cable') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xBBBEFF,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'red_dots') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            metalness: 1,
            roughness: 0, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'bracos_maos_quadril') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'ante_braco') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xBBBbbb,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'detalhes_coxa') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x777777,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'blue_cable') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x00C6FF,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'red_cable') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xFF7777,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'green_cable') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x5DC788,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'torax') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x797b74,
            metalness: 0.6,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'quadril') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x666677,
            metalness: 1,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'tronco') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 0.85,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'pes') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xa7a8a7,
            metalness: 0.75,
            roughness: 0.2, // Ajuste conforme necessário
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


// =========================================================
// BACKGROUND HDR — LOW → HIGH → ULTRAHIGH
// =========================================================

new RGBELoader()
    .setPath('bg_hdr/')
    .load(`hdr_${nomeExclu}_low4.hdr`, function (lowResTexture) {

        lowResTexture.mapping = THREE.EquirectangularReflectionMapping;

        // Primeiro HDR
        scene.background = lowResTexture;
        scene.environment = lowResTexture;

        console.log('HDR LOW carregado.');

        // -------------------------------------------------
        // HIGH
        // -------------------------------------------------

        new RGBELoader()
            .setPath('bg_hdr/')
            .load(`hdr_${nomeExclu}_high4.hdr`, function (highResTexture) {

                highResTexture.mapping = THREE.EquirectangularReflectionMapping;

                // Substitui o LOW
                scene.background = highResTexture;
                scene.environment = highResTexture;

                console.log('HDR HIGH carregado.');

                // ---------------------------------------------
                // ULTRAHIGH
                // ---------------------------------------------

                new RGBELoader()
                    .setPath('bg_hdr/')
                    .load(`hdr_${nomeExclu}_ultra_high_4k_down_size.hdr`, function (ultraHighResTexture) {

                        ultraHighResTexture.mapping =
                            THREE.EquirectangularReflectionMapping;

                        // Substitui o HIGH
                        scene.background = ultraHighResTexture;

                        console.log('HDR ULTRAHIGH carregado.');

                    });

            });

    });