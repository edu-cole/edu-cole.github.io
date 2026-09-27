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
const nomeExclu = 'steamhouse';

// =========================================================
// CONFIGURAÇÕES DA CÂMERA
// =========================================================
const camPos = [0, 100, 279];
const targetPos = [0, 87, 0];
const camFov = 50;
const camNear = 1;
const camFar = 500;

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

			//VIDRO
			if (child.material.name === 'sh_vidros') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.05,
        transmission: 1,
        thickness: 0.1,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}			
    //VIDRO Azul
      if (child.material.name === 'sh_vidros_azuis') {
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
//VIDRO escuro
      if (child.material.name === 'sh_vidro_escuro') {
    child.material = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        metalness: 0,
        roughness: 0.05,
        transmission: 1,
        thickness: 0.1,
        ior: 1.5,
        transparent: true,
        opacity: 1,
        envMap: scene.environment
    });

    child.material.side = THREE.DoubleSide;
}    
            // crome
            if (child.material.name === 'sh_frame') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xF6F9FB,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// red
            if (child.material.name === 'sh_aluminium_brushed') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xE1E1E1,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// copper
            if (child.material.name === 'sh_juntas_pernas') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x999999,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}	
		// luz_traseira
            if (child.material.name === 'sh_rodas') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x908F85,
            metalness: 0.8,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}		

		// 18 - Default
            if (child.material.name === 'sh_rodas2') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFB,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_rodas3') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xDAA7A7,
            metalness: 1,
            roughness: 0, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_rubber_trilho') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xBCBFB6,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_eixo_principal') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xCACACA,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_croma') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            metalness: 1,
            roughness: 1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_quadrados_laterais') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xBABABA,
            metalness: 1,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_plataformas_guarda_corpos') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF0F0F0,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_parede_marrom') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x4B4544,
            metalness: 0.5,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_frame2') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x686C77,
            metalness: 0.6,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_paredes_telhados1') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xC8C8C8,
            metalness: 1,
            roughness: 0.4, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_frame3') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0x818181,
            metalness: 0.85,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_copper') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF6A564,
            metalness: 0.75,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}

if (child.material.name === 'sh_plastico_branco') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xDADADA,
            metalness: 0.75,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'sh_cordas') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xE6BD99,
            metalness: 0.75,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'sh_canos_brancos') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xEEEEEE,
            metalness: 0.75,
            roughness: 0.2, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
      child.material.side = THREE.DoubleSide;
}
if (child.material.name === 'sh_madeira') {
      child.material = new THREE.MeshStandardMaterial({
            color: 0xF6A564,
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