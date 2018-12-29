AFRAME.registerComponent('switch-btn', {
    init: function () {
        let scene = this.el.sceneEl;
        // console.log('switch btn component attached!');
        var data = this.data;
        this.el.addEventListener('mouseenter', function () {
            //TODO btn hover animation
            this.setAttribute('color', "#FFF");
        });
        this.el.addEventListener('mouseleave', function () {
            //TODO btn hover animation
            this.setAttribute('color', "#9a1500");
        });
        this.el.addEventListener('click', function () {
           let switch_label= this.parentElement.getAttribute('label');
           let sceneKey = this.sceneEl.getAttribute('key');
           if(switch_label===sceneKey){
               console.log("you won!");
               let myScore = scene.getAttribute('setup')['score'];
               // console.log("score report:", myScore);
               scene.setAttribute('setup',{'score':myScore+1});
           }
           else{
               console.log("you have alz :( ");
               let myScore = scene.getAttribute('setup')['score'];
               // console.log("score report:", myScore);
               scene.setAttribute('setup',{'score':myScore-1});
           }
        });

    }
});