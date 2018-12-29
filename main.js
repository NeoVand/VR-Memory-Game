



//function generateMap(mapSize=200,houseSize=15,houseCount=30,switchCount=20,protection = 10000){
let defaultHeight = 1.85;
let defaultRadius = 0.8;
let circles = generateMap(20,defaultRadius,30,20);
let sceneEl = document.querySelector('a-scene');
let currentScore = 0;
// console.log(sceneEl);






for (let i =0; i<circles.length; i++){
    var circle = circles[i];
    //{x:circle.x, y:defaultHeight/2.,z:circle.y}
    var position = "";
    position= -circle.x + " " + defaultHeight/2. + " " + -circle.y;
    // console.log("position:", position)
    let chamberEl = document.createElement('a-cylinder');
    chamberEl.setAttribute("color","#494949");
    // chamberEl.setAttribute("segmentsRadial","3");
    chamberEl.setAttribute("opacity","0");
    chamberEl.setAttribute("height",defaultHeight);
    chamberEl.setAttribute("radius",defaultRadius);
    // chamberEl.object3D.position.set(circle.x, defaultHeight/2, circle.y);
    chamberEl.setAttribute("position", position);
    chamberEl.setAttribute("material", {'side':'double'});

    // console.log("chamberEl.position",chamberEl.position);
    chamberEl.setAttribute("class",circle.type);
    chamberEl.setAttribute("label",circle.label);
    // console.log(chamberEl);
    sceneEl.appendChild(chamberEl);
}

let cyls = document.querySelectorAll('a-cylinder');
// for (let cyl in cyls){
//     console.log(cyl);
//     let table = document.createElement('a-cylinder');
//     table.setAttribute("color","#9a815a");
//     table.setAttribute("height",defaultHeight/3);
//     table.setAttribute("radius",defaultRadius/2);
//     table.setAttribute("position","y",defaultHeight/6);
//
//     // chamberEl.object3D.position.set(circle.x, defaultHeight/2, circle.y);
//
// }

for (const cyl of cyls) {
    // console.log(cyl);
    let table = document.createElement('a-cylinder');
    table.setAttribute("color","#9a815a");
    table.setAttribute("height",defaultHeight/3);
    table.setAttribute("radius",defaultRadius/2);
    table.setAttribute("position","y",-defaultHeight/6);
    cyl.appendChild(table);
    cyl2panels(60,cyl);


    if(!cyl.classList.contains("empty")){
        let label = cyl.getAttribute("label");
        let text = document.createElement('a-entity');
        text.setAttribute("text-geometry",`value: ${label};size: 0.2`);
        text.object3D.position.set(-defaultRadius/3,defaultHeight/3,0);
        if(cyl.classList.contains('key')){
            text.setAttribute('material',{'color':'#005dff'});
            sceneEl.setAttribute("key",label);
        }
        else{
            //  <a-animation attribute="scale" begin="mouseenter" dur="300" to="2.3 2.3 2.3"></a-animation>
            //   <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
            text.setAttribute('material',{'color':'#F00'});
            text.setAttribute('animation',`property: position; dir: alternate; dur: 1000;easing: easeInSine; loop: true; to: ${text.object3D.position.x} ${text.object3D.position.y-0.08} ${text.object3D.position.z}`);
            let btn = document.createElement('a-cylinder');
            btn.setAttribute("color","#9a1500");
            btn.setAttribute("height",defaultHeight/4.7);
            btn.setAttribute("radius",defaultRadius/5);
            btn.setAttribute('switch-btn',{});

            //TODO set up the mouse hover animation for the btn
            //btn.setAttribute("animation","property: material.color; dir: alternate; dur: 1000;easing: easeInSine; loop: true; to: #FFF; startEvents:mouseenter; stopEvents:mouseleave");

            cyl.appendChild(btn);

        }
        cyl.appendChild(text);

    }


    // chamberEl.object3D.position.set(circle.x, defaultHeight/2, circle.y);
}

// var entityEl = document.createElement('a-entity');
// // Do `.setAttribute()`s to initialize the entity.
// sceneEl.appendChild(entityEl);

function cyl2panels(sides=10,cyl){
    for(let i=0;i<sides;i++){
        let theta = Math.PI*2*i/sides;
        let thetaDeg = theta*180/Math.PI;
        let xShift = defaultRadius*Math.cos(theta);
        let yShift = defaultRadius*Math.sin(theta);
        let pose = xShift + " " + "0" + " " + yShift;



        let plane = document.createElement("a-plane");
        plane.setAttribute('height',defaultHeight);
        plane.setAttribute('position',pose);
        plane.setAttribute('rotation','y',(90-thetaDeg));

        plane.setAttribute('width',2.01*Math.PI*defaultRadius/sides);
        plane.setAttribute('color',"#528282");
        plane.setAttribute("material", {'side':'double'});

        cyl.appendChild(plane);

    }
}