// import THREE from "THREE";
declare var THREE: any;

const torusKnot = () => {
    const geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    return {mesh, geometry};
}

const cube = () => {
    const geometry = new THREE.CubeGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    return {mesh, geometry, material}
}


export const simpleMeshes = {
    torusKnot: torusKnot,
    cube: cube
}