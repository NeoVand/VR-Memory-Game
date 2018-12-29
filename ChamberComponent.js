AFRAME.registerComponent('chamberComp', {
    init: function () {
    },
    remove: function () {
        this.el.removeObject3D('mesh');
    }
});