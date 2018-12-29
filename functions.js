
///////////////////////////////////////
/// Functions to be used for Hajime ///
///////////////////////////////////////

// dependency: p5.js
// add this to your HTML:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.4/p5.min.js"></script>

var p5 = new p5();



// a function to generate a list of unique random 3-char string codes
function randomLabelList(stringLength=3,listLength=100, protection = 10000){
    const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    rawList=[];
    for(let i=0;i<listLength+protection;i++){
        let str="";
        for(let j=0;j<stringLength;j++){
            str+=charList[Math.floor(Math.random()*charList.length)]
        }
        rawList.push(str)
    }
    let unique = [...new Set(rawList)];
    return unique.slice(0,listLength);
}


// a function that generates a random set of positions for houses with appropriate labels for switches and a key

function generateMap(mapSize=200,houseSize=15,houseCount=30,switchCount=20,protection = 10000){
    let overlapping = false,
        counter = 0,
        width = mapSize,
        height = mapSize,
        circleSize = houseSize,
        labelLength = 3;

    let labels=randomLabelList(labelLength,switchCount,protection);
    let labelKey = labels[Math.floor(Math.random()*labels.length)];

    // populate circles array
    // brute force method continues until # of circles target is reached
    // or until the protection value is reached

    let circles =[];
    while (circles.length < houseCount &&
    counter < protection) {
        circle = {
            // random is a p5.js function, you can replace it with a simple Math.random if you adapt the syntax
            x: p5.random(1.5*circleSize,width-1.5*circleSize),
            y: p5.random(1.5*circleSize,height-1.5*circleSize),
            r: circleSize
        };
        overlapping = false;

        // check that it is not overlapping with any existing circle
        // another brute force approach
        for (let i = 0; i < circles.length; i++) {
            let existing = circles[i];
            // dist is a p5.js function, you can replace it with a simple euclidean distance if you want
            let d = p5.dist(circle.x, circle.y, existing.x, existing.y);
            if (d < circle.r + existing.r) {
                // They are overlapping
                overlapping = true;
                // do not add to array
                break;
            }
        }

        // add valid circles to array
        if (!overlapping) {
            circles.push(circle);
        }

        counter++;
    }
    for (let i = 0; i < houseCount; i++) {
        if(i<switchCount){
            circles[i]['label'] = labels[i];
            circles[i]['type'] = 'switch';
        }
        else if(i == switchCount){
            circles[i]['label'] = labelKey;
            circles[i]['type'] = 'key';
        }
        else {
            circles[i]['label'] = "";
            circles[i]['type'] = 'empty';
        }
    }
    return circles
}

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// console.log(generateMap(300,15,30,20));