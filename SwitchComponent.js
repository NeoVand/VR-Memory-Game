AFRAME.registerComponent('switch-btn', {
    init: function () {
        let scene = this.el.sceneEl;
        let el = this.el;
        el.setAttribute('gamepad-controls',{});

        // console.log('switch btn component attached!');
        var data = this.data;
        let selected = false;
        function clickHandler(){
            let switch_label= el.parentElement.getAttribute('label');
            let sceneKey = el.sceneEl.getAttribute('key');
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
        }
        this.el.addEventListener('mouseenter', function () {
            //TODO btn hover animation
            this.setAttribute('color', "#FFF");
        });
        this.el.addEventListener('gamepadbuttondown:1', function () {
            if(selected){
                clickHandler();
            }
        });

        this.el.addEventListener('mouseleave', function () {
            //TODO btn hover animation
            this.setAttribute('color', "#9a1500");
            selected= false;
            this.setAttribute('hoverstate',selected);
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
               m = Object.keys(obj[n]["game"]).length-1  //game number
               k = Object.keys(obj[n]["game"][m]).length //data number
               obj[n]["game"][m][k+1] = {"score":myScore+1}
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
               m = Object.keys(obj[n]["game"]).length-1  //game number
               k = Object.keys(obj[n]["game"][m]).length //data count
               obj[n]["game"][m][k] = {"score":myScore-1}
               // obj[n][n]["game"][Object.keys(obj[n][n]["game"]).length] = chambers[i].getAttribute("label")
               localStorage.setItem('VR',JSON.stringify(obj))

               scene.setAttribute('setup',{'score':myScore-1});
           }
            clickHandler();
        });

    }
});
