import { Object3D } from 'three'
export default class Coffee {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Coffee'

    this.createCoffee()
  }
  createCoffee() {
    this.coffee = this.assets.models.coffee.scene
    this.container.add(this.coffee)
    this.coffee.scale.set(5, 5, 5)
    this.coffee.position.x = 37
    this.coffee.position.y = 5
    this.coffee.position.z = 0
    this.coffee.visible = false
  }
}
// }

// function init() {
//   clock = new THREE.Clock();

//   //

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.gammaOutput = true;
//   document.body.appendChild(renderer.domElement);

//   var supportsDepthTextureExtension = !!renderer.extensions.get(
//     "WEBGL_depth_texture"
//   );

//   //

//   var pixelRatio = renderer.getPixelRatio();

//   renderTarget = new THREE.WebGLRenderTarget(
//     window.innerWidth * pixelRatio,
//     window.innerHeight * pixelRatio
//   );
//   renderTarget.texture.minFilter = THREE.NearestFilter;
//   renderTarget.texture.magFilter = THREE.NearestFilter;
//   renderTarget.texture.generateMipmaps = false;
//   renderTarget.stencilBuffer = false;

//   if (supportsDepthTextureExtension === true) {
//     renderTarget.depthTexture = new THREE.DepthTexture();
//     renderTarget.depthTexture.type = THREE.UnsignedShortType;
//     renderTarget.depthTexture.minFilter = THREE.NearestFilter;
//     renderTarget.depthTexture.maxFilter = THREE.NearestFilter;
//   }

//   depthMaterial = new THREE.MeshDepthMaterial();
//   depthMaterial.depthPacking = THREE.RGBADepthPacking;
//   depthMaterial.blending = THREE.NoBlending;

//   // textures

//   var loader = new THREE.TextureLoader();

//   var noiseMap = loader.load("https://i.imgur.com/gPz7iPX.jpg");
//   var dudvMap = loader.load("https://i.imgur.com/hOIsXiZ.png");

//   noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
//   noiseMap.minFilter = THREE.NearestFilter;
//   noiseMap.magFilter = THREE.NearestFilter;
//   dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

//   // waterfall

//   var waterfallUniforms = {
//     time: {
//       value: 0
//     },
//     tNoise: {
//       value: null
//     },
//     tDudv: {
//       value: null
//     },
//     topDarkColor: {
//       value: new THREE.Color(0x4e7a71)
//     },
//     bottomDarkColor: {
//       value: new THREE.Color(0x0e7562)
//     },
//     topLightColor: {
//       value: new THREE.Color(0xb0f7e9)
//     },
//     bottomLightColor: {
//       value: new THREE.Color(0x14c6a5)
//     },
//     foamColor: {
//       value: new THREE.Color(0xffffff)
//     }
//   };

//   var waterfallMaterial = new THREE.ShaderMaterial({
//     uniforms: THREE.UniformsUtils.merge([
//       THREE.UniformsLib["fog"],
//       waterfallUniforms
//     ]),
//     vertexShader: document.getElementById("vertexShaderWaterfall").textContent,
//     fragmentShader: document.getElementById("fragmentShaderWaterfall")
//       .textContent,
//     fog: true
//   });

//   waterfall = new THREE.Mesh(
//     new THREE.CylinderBufferGeometry(1, 1, 8, 16, 1, true),
//     waterfallMaterial
//   );
//   waterfall.position.y = 3;
//   scene.add(waterfall);

//   waterfallMaterial.uniforms.tNoise.value = noiseMap;
//   waterfallMaterial.uniforms.tDudv.value = dudvMap;

// }

// function animate() {
//   requestAnimationFrame(animate);

//   // depth pass

//   water.visible = false; // we don't want the depth of the water
//   scene.overrideMaterial = depthMaterial;

//   renderer.setRenderTarget(renderTarget);
//   renderer.render(scene, camera);
//   renderer.setRenderTarget(null);

//   scene.overrideMaterial = null;
//   water.visible = true;

//   // beauty pass

//   var time = clock.getElapsedTime();

//   waterfall.material.uniforms.time.value = time;

//   renderer.render(scene, camera);
// }
