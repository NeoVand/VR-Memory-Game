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

               let obj = JSON.parse(localStorage.getItem('VR'));
               n = Object.keys(obj).length-1 //user number
               m = Object.keys(obj[n][n]["game"]).length-1  //game number
               k = Object.keys(obj[n][n]["game"][m][m]).length-1 //data number
               obj[n][n]["game"][m][m][k+1] = {"score":myScore+1}
               // obj[n][n]["game"][Object.keys(obj[n][n]["game"]).length] = chambers[i].getAttribute("label")
               localStorage.setItem('VR',JSON.stringify(obj))

               scene.setAttribute('setup',{'score':myScore+1});

           }
           else{
               console.log("you have alz :( ");
               let myScore = scene.getAttribute('setup')['score'];
               // console.log("score report:", myScore);

               let obj = JSON.parse(localStorage.getItem('VR'));
               n = Object.keys(obj).length-1 //user number
               m = Object.keys(obj[n][n]["game"]).length-1  //game number
               k = Object.keys(obj[n][n]["game"][m][m]).length-1 //data number
               obj[n][n]["game"][m][m][k+1] = {"score":myScore-1}
               // obj[n][n]["game"][Object.keys(obj[n][n]["game"]).length] = chambers[i].getAttribute("label")
               localStorage.setItem('VR',JSON.stringify(obj))

               scene.setAttribute('setup',{'score':myScore-1});
           }
        });

    }
});