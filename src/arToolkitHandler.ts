declare var THREEx: any;
THREEx.ArToolkitContext.baseURL = '../'

export const arToolKitHanlder = (rendererHandlerRef: any, camera: any, scene: any) => {
    const arToolkitSource = new THREEx.ArToolkitSource({
        // to read from the webcam 
        sourceType: 'webcam',

        // // to read from an image
        // sourceType : 'image',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',		
        // to read from a video
        // sourceType : 'video',
        // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',		
    });
    arToolkitSource.init(function onReady() {
        onResize()
    });

    const arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/camera_para.dat',
        detectionMode: 'mono',
    });

    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////
    arToolkitContext.init(function onCompleted() {
        // copy projection matrix to camera
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });
    // update artoolkit on every frame
    rendererHandlerRef.onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return
        arToolkitContext.update(arToolkitSource.domElement)

        // update scene.visible if the marker is seen
        scene.visible = camera.visible
    });

    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////
    const markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
        type: 'pattern',
        patternUrl: THREEx.ArToolkitContext.baseURL + '../data/patt.hiro',
        // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
        // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
        changeMatrixMode: 'cameraTransformMatrix'
    });

    const onResize = () => {
        arToolkitSource.onResize()
        arToolkitSource.copySizeTo(rendererHandlerRef.renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
        }
    }

    return {
        arToolkitSource: arToolkitSource,
        onResize: onResize
    }

}