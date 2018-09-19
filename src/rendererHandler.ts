declare var THREE: any;

export const rendererHandler = () => {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild(renderer.domElement);
    // array of functions for the rendering loop
    var onRenderFcts: any[] = [];

    return {
        renderer,
        onRenderFcts
    }
}