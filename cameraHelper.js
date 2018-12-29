AFRAME.registerComponent('helper', {
    init: function () {
        let cam = document.querySelector('[camera]');
        cam.object3D.position.set(0,1.6,0);
        console.log(cam.object3D.position);
    }
});
