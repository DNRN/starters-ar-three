// import { torusKnot } from "./meshes/torusknot";
import { arToolKitHanlder } from "./arToolkitHandler";
import { simpleMeshes } from "./meshes/torusknot";
import  { rendererHandler } from './rendererHandler';

declare var THREE: any;

const rendererHandlerRef = rendererHandler();



// init scene and camera
var scene = new THREE.Scene();

//////////////////////////////////////////////////////////////////////////////////
//		Initialize a basic camera
//////////////////////////////////////////////////////////////////////////////////
// Create a camera
var camera = new THREE.Camera();
scene.add(camera);

////////////////////////////////////////////////////////////////////////////////
//          handle arToolkitSource
////////////////////////////////////////////////////////////////////////////////
const artoolKitHandler = arToolKitHanlder(rendererHandlerRef, camera, scene);

// handle resize
window.addEventListener('resize', artoolKitHandler.onResize);

scene.visible = false;


//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////
const cube = simpleMeshes.cube();
cube.mesh.position.y = cube.geometry.parameters.height / 2
scene.add(cube.mesh);

let torusKnot = simpleMeshes.torusKnot();
torusKnot.mesh.position.y = 0.5
scene.add(torusKnot.mesh);

rendererHandlerRef.onRenderFcts.push( (delta: any) => {
    torusKnot.mesh.rotation.x += Math.PI * delta
});


//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////
// render the scene
rendererHandlerRef.onRenderFcts.push(function () {
    rendererHandlerRef.renderer.render(scene, camera);
})
// run the rendering loop
var lastTimeMsec: any = null
requestAnimationFrame(function animate(nowMsec) {
    // keep looping
    requestAnimationFrame(animate);
    // measure time
    lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec = nowMsec
    // call each update function
    rendererHandlerRef.onRenderFcts.forEach(onRenderFct => {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
    })
})