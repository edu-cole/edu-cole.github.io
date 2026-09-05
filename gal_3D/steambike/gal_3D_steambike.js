import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

import {
    scene,
    camera,
    controls,
    loadedMeshes
} from '../js/gal_3D.js';

camera.position.set(0, 0.5, 7);
controls.target.set(0, 1, 0);

document.querySelector('#reset_but').addEventListener('click', () => {camera.position.set(0, 0.5, 7); controls.target.set(0, 1, 0); controls.update();});

// Carregar o OBJ com materiais
				const mtlLoader = new MTLLoader();
				mtlLoader.load( 'imgs/steambike.mtl', ( mtl ) => {
					mtl.preload();
					const objLoader = new OBJLoader();
					objLoader.setMaterials( mtl );
					objLoader.load( 'steambike.obj', ( root ) => {
						root.traverse((child) => {
							if (child.isMesh) {
								loadedMeshes.push(child);
								child.material.side = THREE.DoubleSide;
								root.position.set(0, -0.5, 0);
								envMap: scene.environment;

			//alum_geral
			if (child.material.name === 'alum_geral') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xbbbbbb,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}					

            // crome
            if (child.material.name === 'crome') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x5b5b5b,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// red
            if (child.material.name === 'red_metal') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xc00000,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}
		// copper
            if (child.material.name === 'copper') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x9b5400,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}	

		// pneu

	    if (child.material.name === 'pneu2') {
  		const tLoad = new THREE.TextureLoader();

  		const albt = tLoad.load('imgs/tiremot_edit_1K_albedo_s2.jpg');
  		albt.repeat.set(0.1, 1); // Reescalona a textura
  		albt.offset.set(0, 0); // Reposiciona a textura

  		const bumpt = tLoad.load('imgs/tiremot_1K_roughness.jpg');
  		bumpt.repeat.set(0.1, 1); // Reescalona o bump map
  		bumpt.offset.set(0, 0); // Reposiciona o bump map

  		child.material = new THREE.MeshStandardMaterial({
    	map: albt,
    	roughness: 0.75, 
    	bumpMap: bumpt,
    	envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
  });
  
  child.material.side = THREE.DoubleSide; // Se necessário
}	
		// luz_traseira
            if (child.material.name === 'luz_traseira') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 0.5,
            metalness: 0.1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}		

		// luz_pisca
            if (child.material.name === 'luz_pisca') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xff9500,
            emissive: 0xff9500,
            emissiveIntensity: 0.5,
            metalness: 0.1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}

		// 18 - Default
            if (child.material.name === '18___Default') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xffc680,
            metalness: 0.9,
            roughness: 0.1, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}

			// luz_pisca
            if (child.material.name === 'stand_plataforma') {
			const tLoad2 = new THREE.TextureLoader();

  		const albt2 = tLoad2.load('../imgs/10eb4f3be7b1.jpg');
  		albt2.repeat.set(0.2, 0.2); // Reescalona a textura
  		albt2.offset.set(0, 0); // Reposiciona a textura

  		child.material = new THREE.MeshStandardMaterial({
    	map: albt2,
    	roughness: 0.25,
    	metalness: 0.1,
    	envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
  });
  
  child.material.side = THREE.DoubleSide; // Se necessário
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
    .load('hdr_steambike_low.hdr', function (lowResTexture) {
        lowResTexture.mapping = THREE.EquirectangularReflectionMapping;

        // Aplicar a versão de baixa resolução como background e environment
        scene.background = lowResTexture;
        scene.environment = lowResTexture;

        // Carregar a imagem HDR em alta resolução em segundo plano
        new RGBELoader()
            .setPath('bg_hdr/')
            .load('hdr_steambike_high.hdr', function (highResTexture) {
                highResTexture.mapping = THREE.EquirectangularReflectionMapping;

                // Substituir a imagem de baixa resolução pela de alta qualidade
                scene.background = highResTexture;
                scene.environment = highResTexture;

                console.log('HDR de alta qualidade carregada e aplicada.');
            });
    });

    document.querySelector('#prev_but').addEventListener('click', () => {window.location.href = '../steamship/index_steamship.html';});
    document.querySelector('#next_but').addEventListener('click', () => {window.location.href = '../steamship/index_steamship.html';});