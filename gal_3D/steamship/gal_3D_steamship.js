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

camera.position.set(0, 50, 160);
controls.target.set(0, 0, 0);

document.querySelector('#reset_but').addEventListener('click', () => {camera.position.set(0, 50, 160); controls.target.set(0, 0, 0); controls.update();});

// Carregar o OBJ com materiais
				const mtlLoader = new MTLLoader();
				mtlLoader.load( 'imgs/steamship.mtl', ( mtl ) => {
					mtl.preload();
					const objLoader = new OBJLoader();
					objLoader.setMaterials( mtl );
					objLoader.load( 'steamship.obj', ( root ) => {
						root.traverse((child) => {
							if (child.isMesh) {
								loadedMeshes.push(child);
								child.material.side = THREE.DoubleSide;
								root.position.set(0, -60, 0);
								envMap: scene.environment;

			//alum_geral
			if (child.material.name === 'alum_geral') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 1,
            roughness: 0.01, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}					

            // crome_brushed
            if (child.material.name === 'crome') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            metalness: 1,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
			child.material.side = THREE.DoubleSide;
}

            // metal_cromado
            if (child.material.name === 'metal_preto') {
            child.material = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
            child.material.side = THREE.DoubleSide;
}

		// metal_barbatanas
            if (child.material.name === 'metal_barbatanas') {
			child.material = new THREE.MeshStandardMaterial({
            color: 0xea7915,
            metalness: 0.5,
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

            // metal_azul
            if (child.material.name === 'metal_azul') {
            child.material = new THREE.MeshStandardMaterial({
            color: 0x548798,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
            child.material.side = THREE.DoubleSide;
}  

            // tecido
            if (child.material.name === 'tecido') {
            child.material = new THREE.MeshStandardMaterial({
            color: 0xe2b171,
            metalness: 0,
            roughness: 0.5, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
            child.material.side = THREE.DoubleSide;
}

            // frosted_glass
            if (child.material.name === 'frosted_glass') {
            child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.65, // Ajuste conforme necessário
            transparent: true,
            opacity: 0.65,
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
            child.material.side = THREE.DoubleSide;
}   

            // metal_base
            if (child.material.name === 'metal_base') {
            child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.3, // Ajuste conforme necessário
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
            child.material.side = THREE.DoubleSide;
}   

		// casco_t
        if (child.material.name === 'casco_baked') {
        const tLoad = new THREE.TextureLoader();
        const albt2_26 = tLoad.load('imgs/casco_baked_diffuse_map.png');
        child.material = new THREE.MeshStandardMaterial({
        map: albt2_26,
        roughness: 0.75,
        envMap: scene.environment
        });
        child.material.side = THREE.DoubleSide;
}	

            // vidro
            if (child.material.name === 'vidro') {
            child.material = new THREE.MeshStandardMaterial({
            color: 0x00AAFF,
            metalness: 1,
            roughness: 0.02, // Ajuste conforme necessário
            transparent: true,
            opacity: 0.35,
            envMap: scene.environment, // Use o mesmo ambiente HDR para reflexões
          });
            child.material.side = THREE.DoubleSide;
}   

			// madeira
            if (child.material.name === 'madeira') {
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
    .load('hdr_steamship_low.hdr', function (lowResTexture) {
        lowResTexture.mapping = THREE.EquirectangularReflectionMapping;

        // Aplicar a versão de baixa resolução como background e environment
        scene.background = lowResTexture;
        scene.environment = lowResTexture;

        // Carregar a imagem HDR em alta resolução em segundo plano
        new RGBELoader()
            .setPath('bg_hdr/')
            .load('hdr_steamship_high.hdr', function (highResTexture) {
                highResTexture.mapping = THREE.EquirectangularReflectionMapping;

                // Substituir a imagem de baixa resolução pela de alta qualidade
                scene.background = highResTexture;
                scene.environment = highResTexture;

                console.log('HDR de alta qualidade carregada e aplicada.');
            });
    });

    document.querySelector('#prev_but').addEventListener('click', () => {window.location.href = '../steambike/index_steambike.html';});
    document.querySelector('#next_but').addEventListener('click', () => {window.location.href = '../steambike/index_steambike.html';});