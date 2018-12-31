AFRAME.registerComponent('setup', {
        schema: {
            mapSize: {type: 'int', default: 25},
            boxCount: {type: 'int', default: 15},
            switchCount: {type: 'int', default: 8},
            score: {type: 'int', default: 0},
            defaultHeight: {type:'float', default: 1.85},
            defaultRadius: {type:'float', default: 0.8}
        },
        init: function () {

        },

        update: function () {
            console.log("update happened!");

            //Delete everything
            this.el.querySelector('a-camera').setAttribute('position','0 1.6 0');

            let boxesAndShit = this.el.querySelectorAll('[chamberComp]');
            // console.log(boxesAndShit);
            for(elem of boxesAndShit){
                elem.parentNode.removeChild(elem);
            }

            let data = this.data;  // Component property values.
            let el = this.el;
            let mapSize = data.mapSize;
            let boxCount = data.boxCount;
            let switchCount = data.switchCount;
            let defaultHeight = data.defaultHeight;
            let defaultRadius = data.defaultRadius;
            let score = data.score;

            let scoreBoard = document.querySelector('#score');
            scoreBoard.setAttribute('text-geometry',{'value':score});

            this.setup(mapSize,boxCount,switchCount,defaultHeight,defaultRadius);
            // console.log(`your score is ${score}`);


            //
            // let data = this.data;  // Component property values.
            // let el = this.el;
            // let mapSize = data.mapSize;
            // let boxCount = data.boxCount;
            // let switchCount = data.switchCount;
            // let defaultHeight = data.defaultHeight;
            // let defaultRadius = data.defaultRadius;
            // let score = data.score;
            //
            // this.setup(mapSize,boxCount,switchCount,defaultHeight,defaultRadius);
            // console.log(`your score is ${score}`)


            // Reference to the component's entity.


            // if (data.event) {
            //     // This will log the `message` when the entity emits the `event`.
            //     el.addEventListener(data.event, function () {
            //         console.log(data.message);
            //     });
            // } else {
            //     // `event` not specified, just log the message.
            //     console.log(data.message);
            // }
        },

        setup: function (mapSize, boxCount, switchCount, defaultHeight, defaultRadius) {
            let sceneEl = this.el;

            // let room = document.createElement('a-box');
            // room.setAttribute('opacity',1);
            // room.setAttribute('scale',"200 200 200");

            let circles = generateMap(mapSize, defaultRadius, boxCount, switchCount);
            // localStorage.setItem('circles', JSON.stringify(circles));
            
            for (let i = 0; i < circles.length; i++) {
                var circle = circles[i];
                //{x:circle.x, y:defaultHeight/2.,z:circle.y}
                let position = -circle.x + " " + defaultHeight / 2. + " " + -circle.y;
                // console.log("position:", position)
                let chamberEl = document.createElement('a-cylinder');
                chamberEl.setAttribute("color", "#494949");
                // chamberEl.setAttribute("segmentsRadial","3");
                chamberEl.setAttribute("opacity", "0");
                chamberEl.setAttribute("height", defaultHeight);
                chamberEl.setAttribute("radius", defaultRadius);
                // chamberEl.object3D.position.set(circle.x, defaultHeight/2, circle.y);
                chamberEl.setAttribute("position", position);
                chamberEl.setAttribute("material", {'side': 'double'});

                // console.log("chamberEl.position",chamberEl.position);
                chamberEl.setAttribute("class", circle.type);
                chamberEl.setAttribute("label", circle.label);
                // console.log(chamberEl);
                chamberEl.setAttribute('chamberComp',{});
                sceneEl.appendChild(chamberEl);
            }


            let cyls = document.querySelectorAll('a-cylinder');

            function cyl2panels(sides=5,cyl){
                for(let i=0;i<sides;i++){
                    let theta = Math.PI*2*i/sides;
                    let thetaDeg = theta*180/Math.PI;
                    let xShift = defaultRadius*Math.cos(theta);
                    let yShift = defaultRadius*Math.sin(theta);
                    let pose = xShift + " " + "0" + " " + yShift;

                    let plane = document.createElement("a-plane");
                    plane.setAttribute('class','shadable');
                    plane.setAttribute('height',defaultHeight);
                    plane.setAttribute('position',pose);
                    plane.setAttribute('rotation','y',(90-thetaDeg));

                    plane.setAttribute('width',2.01*Math.PI*defaultRadius/sides);
                    plane.setAttribute('color',"#f5f7eb");
                    plane.setAttribute("material", {'side':'double'});
                    plane.addEventListener('mouseenter', function () {
                        //TODO btn hover animation

                        let col = plane.getAttribute('color');
                        // console.log(col);
                        let hclColor = chroma(col).hcl();
                        let updatedColor = chroma({"h":hclColor[0]*Math.sqrt(2) ,"c":hclColor[1],"l": hclColor[2]*0.95});

                        plane.setAttribute('color',updatedColor.hex());

                    });
                    cyl.appendChild(plane);

                }
            }

            for (const cyl of cyls) {
                // console.log(cyl);
                let table = document.createElement('a-cylinder');
                table.setAttribute("color", "#9a815a");
                table.setAttribute("height", defaultHeight / 3);
                table.setAttribute("radius", defaultRadius / 2);
                table.setAttribute("position", "y", -defaultHeight / 6);
                cyl.appendChild(table);
                cyl2panels(5, cyl);


                if (!cyl.classList.contains("empty")) {
                    let label = cyl.getAttribute("label");
                    let text = document.createElement('a-entity');
                    text.setAttribute("text-geometry", `value: ${label};size: 0.13`);
                    text.object3D.position.set(-defaultRadius / 3, defaultHeight / 3, 0);
                    text.setAttribute('billboard',{});
                    if (cyl.classList.contains('key')) {
                        text.setAttribute('material', {'color': '#005dff'});
                        sceneEl.setAttribute("key", label);
                    } else {
                        //  <a-animation attribute="scale" begin="mouseenter" dur="300" to="2.3 2.3 2.3"></a-animation>
                        //   <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
                        text.setAttribute('material', {'color': '#F00'});
                        text.setAttribute('animation', `property: position; dir: alternate; dur: 1000;easing: easeInSine; loop: true; to: ${text.object3D.position.x} ${text.object3D.position.y - 0.08} ${text.object3D.position.z}`);
                        let btn = document.createElement('a-cylinder');
                        btn.setAttribute("color", "#9a1500");
                        btn.setAttribute('class','shadable');
                        btn.setAttribute("height", defaultHeight / 4.7);
                        btn.setAttribute("radius", defaultRadius / 5);
                        btn.setAttribute('switch-btn', {});

                        //TODO set up the mouse hover animation for the btn
                        //btn.setAttribute("animation","property: material.color; dir: alternate; dur: 1000;easing: easeInSine; loop: true; to: #FFF; startEvents:mouseenter; stopEvents:mouseleave");

                        cyl.appendChild(btn);
                    }
                    cyl.appendChild(text);
                }
            }
        },
        tick: function (t,timedelta){
            // Run on an interval.
            let interval = 300
            if (t - this.time < interval) { return; } 
            this.time = t;
            // distance check
            let camera_position = this.el.querySelector("a-camera").getAttribute("position")
            let chambers = this.el.querySelectorAll("[chamberComp]")
            for (i = 0; i < chambers.length; i++) {
                chambers[i].distance = distanceVector(chambers[i].object3D.position,camera_position)
                if (chambers[i].distance < 1){
                    alert(chambers[i].getAttribute("label"))
                // store data
                }
            }
        }
    }
);