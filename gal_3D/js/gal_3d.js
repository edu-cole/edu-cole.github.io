import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, controls;
let cubeCamera;

//set java buttons

let currentViewMode = 'beauty';
const loadedMeshes = [];
const edgeObjects = [];
let edgesEnabled = false;

init();
animate();

function init() {

				const canvas = document.querySelector( '#c' );
				renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );

				scene = new THREE.Scene();

				
				// Luzes
				const ambientLight = new THREE.AmbientLight(0xB1E1FF);
				scene.add(ambientLight);

				const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
				directionalLight.position.set(0, 100, 0).normalize();
				scene.add(directionalLight);

// OrbitControls
				controls = new OrbitControls( camera, renderer.domElement );
				controls.autoRotate = true;
				controls.autoRotateSpeed = 1.5;

				window.addEventListener( 'resize', onWindowResized );

				// Cube Camera para reflexões
				cubeCamera = new THREE.CubeCamera( 1, 1000, new THREE.WebGLCubeRenderTarget( 256, { type: THREE.HalfFloatType } ) );
			}

			document.querySelector('#home_but').addEventListener('click', () => {window.location.href = '../../index.html';});
			document.querySelector('#back_but').addEventListener('click', () => {window.location.href = '../../index_rgb.html';});
			document.querySelector('#gal_list_but').addEventListener('click', () => {window.location.href = '../gal_3d_mosaico.html';});

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
    		{speed: 0, act: 'vel0_act.png', hover: 'vel0_hover.png'}
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

		export {
  		scene,
    	camera,
    	controls,
    	loadedMeshes
		};