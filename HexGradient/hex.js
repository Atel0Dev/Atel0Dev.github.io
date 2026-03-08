var text = document.getElementById("colorText");
var inputField1 = document.getElementById("input1");
var inputField2 = document.getElementById("input2");

var slider = document.getElementById("slider");
var sliderNum = document.getElementById("sliderNum");
var sliderCurrentVal = Number(sliderNum.innerHTML);

var rgbBoxParent = document.getElementById("rgbBoxParent");
var hsvBoxParent = document.getElementById("hsvBoxParent");
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");

//let hex1 = "#000000";
//let hex2 = "#f700ff";

slider.oninput = function(){
    sliderNum.innerHTML = Number(this.value);
    sliderCurrentVal = Number(this.value);
}

function hexToRGB(hex)
{
    if(hex.includes('#'))
        {
            hex = hex.replace("#",'');
        }

    //Verifying Accurate String Length
    if(hex.length == 6){
        //console.log("Success"); // input success (correct length)

        hexa = hex.substring(0,2);
        hexb = hex.substring(2,4);
        hexc = hex.substring(4,6);
        
        r = parseInt(hexa,16);
        g = parseInt(hexb,16);
        b = parseInt(hexc,16);

        var RGB = {
            r,
            g,
            b,
        };
        //console.log(`RGB Object R: ${RGB.r} | R: ${r}\nRGB Object G: ${RGB.g} | G: ${g}\nRGB Object B: ${RGB.b} | B: ${b}`);

        
        return RGB;
    } else {
        console.log("Failure"); // input failure
    }
};


function RGBtoHex(RGB){
    let r = RGB.r;
    let g = RGB.g;
    let b = RGB.b;

    let rToHex = r.toString(16);
    let gToHex = g.toString(16);
    let bToHex = b.toString(16);

    let h = rToHex.length == 1 ? '0' + rToHex : rToHex;
    let e = gToHex.length == 1 ? '0' + gToHex : gToHex;
    let x = bToHex.length == 1 ? '0' + bToHex : bToHex;

    let hex = `#${h}${e}${x}`;
    return hex;
}

//Make the RGB into HSV
function RGBtoHSV(RGB){
    let r = RGB.r;
    let g = RGB.g;
    let b = RGB.b;

    //here transform RGB to HSV
    r /=255 , g /= 255, b /= 255;

    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    const delta = max - min;
    const value = max;
    const saturation = max === 0 ? 0 : delta / max;
    let hue = 0;
    if(max !== min){
        switch (max){
            case r: hue = (g-b) / delta + (g < b ? 6 : 0); break;
            case g: hue = (b-r) / delta + 2; break;
            case b: hue = (r-g) / delta + 4; break;
        }
        hue /= 6;
    }

    let hsv = [hue * 360, saturation * 100, value * 100];
    return hsv;
}

function HSVtoRGB(HSV) {
    let hue = HSV[0]; // 0-360
    let saturation = HSV[1] / 100; // 0-1
    let value = HSV[2] / 100; // 0-1

    let r = 0, g = 0, b = 0;

    let i = Math.floor(hue / 60) % 6;
    let f = hue / 60 - i;
    let p = value * (1 - saturation);
    let q = value * (1 - f * saturation);
    let t = value * (1 - (1 - f) * saturation);

    switch (i) {
        case 0: r = value; g = t; b = p; break;
        case 1: r = q; g = value; b = p; break;
        case 2: r = p; g = value; b = t; break;
        case 3: r = p; g = q; b = value; break;
        case 4: r = t; g = p; b = value; break;
        case 5: r = value; g = p; b = q; break;
    }

    // Convert back to 0-255
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

//Make the RGB into LCH
function RGBtoLCH(RGB){
    let r = RGB.r;
    let g = RGB.g;
    let b = RGB.b;

    //here transform RGB to LCH

    let lch = null;
    return lch;
}

function createLinearArray(lowNum,highNum,steps){
    var increment = Math.floor((highNum - lowNum)/(steps - 1));
    var res = [lowNum];

    for(let i = 1; i < steps - 1; i++){
        res.push(i * increment + lowNum);
    }
    res.push(highNum);
    return res;
}

function rbgGradientHelper(rgb1,rgb2){

    res = [];
    
    //console.log(`1 rgb(R:${rgb1.r} G:${rgb1.g} B:${rgb1.b})\n2 rgb(R:${rgb2.r} G:${rgb2.g} B:${rgb2.b})`);

    createdArrayR = createLinearArray(rgb1.r,rgb2.r,sliderCurrentVal);
    console.log(`Created R Array:\n ${createdArrayR}`);

    createdArrayG = createLinearArray(rgb1.g,rgb2.g,sliderCurrentVal);
    console.log(`Created G Array:\n ${createdArrayG}`);

    createdArrayB = createLinearArray(rgb1.b,rgb2.b,sliderCurrentVal);
    console.log(`Created B Array:\n ${createdArrayB}`);

    for(let i = 0; i < createdArrayR.length; i++){
        
        rgb3r = createdArrayR[i];
        rgb3g = createdArrayG[i];
        rgb3b = createdArrayB[i];
        
        var RGB = new Object();
        RGB.r = rgb3r;
        RGB.g = rgb3g;
        RGB.b = rgb3b;
        
        res.push(RGB);
    }

    return res;
    //return middle color
}

function hsvGradientHelper(hsv1,hsv2){
    res = [];

    createdArrayH = createLinearArray(hsv1[0],hsv2[0],sliderCurrentVal);
    console.log(`Created H Array:\n ${createdArrayH}`);

    createdArrayS = createLinearArray(hsv1[1],hsv2[1],sliderCurrentVal);
    console.log(`Created S Array:\n ${createdArrayH}`);

    createdArrayV = createLinearArray(hsv1[2],hsv2[2],sliderCurrentVal);
    console.log(`Created V Array:\n ${createdArrayH}`);

    for (let i = 0; i < createdArrayH.length; i++) {
        res.push({
            h: createdArrayH[i],
            s: createdArrayS[i],
            v: createdArrayV[i]
        });
    }

    return res;
}

function setupScreen(){
    
    startingHex = inputField1.value;
    endingHex = inputField2.value;

    text.innerHTML = `#${startingHex} -> #${endingHex}`;

    gradientColors = [];
    
    //gradientHelper(hexToRGB(startingHex),hexToRGB(endingHex));
    currentRGB = rbgGradientHelper(hexToRGB(startingHex),hexToRGB(endingHex));
    currentHSV = hsvGradientHelper(RGBtoHSV(hexToRGB(startingHex)),RGBtoHSV(hexToRGB(endingHex)));
    let firstRGB = currentRGB[0];

    rgb = {
        r: firstRGB.r,
        g: firstRGB.g,
        b: firstRGB.b
    }
    let firstHSV = currentHSV[0]

    hsv = {
        h : firstHSV[0],
        s : firstHSV[1],
        v : firstHSV[2]
    }
    console.log(RGBtoHex(rgb));

    rgbBoxParent.style.borderStyle = "solid";
    console.log(currentRGB);
    
    while(rgbBoxParent.firstChild){
        rgbBoxParent.removeChild(rgbBoxParent.lastChild);
    }
    while(hsvBoxParent.firstChild){
        hsvBoxParent.removeChild(hsvBoxParent.lastChild);
    }
    //RGB
    for(let i = 0; i < currentRGB.length; i++){
        currentDiv = document.createElement("div");

        currentDiv.className = "colorBox";

        let firstRGB = currentRGB[i];

        rgb = {
            r: firstRGB.r,
            g: firstRGB.g,
            b: firstRGB.b
        }

        currentDiv.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;

        rgbBoxParent.appendChild(currentDiv);
    }

    //HSV
    for(let i = 0; i < currentHSV.length; i++){
        currentDiv = document.createElement("div");
        currentDiv.className = "colorBox";

        let rgb = HSVtoRGB([currentHSV[i].h,currentHSV[i].s,currentHSV[i].v]);

        currentDiv.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        hsvBoxParent.appendChild(currentDiv);
    }
    //LHC

    text.style.color = "white";

    text.style.opacity = "0";

    setTimeout(() => {
        text.style.opacity = "1";
    }, 100);
}


//hex (#ffffff) merge with hex (#000000) should come out as (#808080)
//ff = 255, 00 = 0, 80 = 128
//f = 15
//ff = 15 * 16 + 15 (255)
//looks normally like (15*16^1) + (15 * 16^0)
//fff = (15 * 16^2) + (15 * 16) + 15 (4095)

//#80 = 8 * 16 + 0 (128)





/*

Lets say I have a list of 10 items in an ordered from least to most digits
[0,1,2,3,4,5,6,7,8,9]


Using 0 and 9 (index[0] and index[9])
How would I get to 8 (index[8])?

In this instance, just minus 9 by 1, but that wont work if the list is slightly different

So for further security, Im adding more lists

[0,1,2,3,4,5,6,7,8,9]
[0,3,14,23,25,36,49,68,90,151]
[0,2,5,13,15,17,20,26,37,50]

Im not sure its actually possible to determine index[8] from index[0] and index[9]
But, can I generate a list between 2 numbers that fits between those 2 numbers min and max?

Filling in from the 9th index?

I know its going to take 10 steps, to fill the list, Minus the 2 digits preset (index[0] and index[9])

Lets start with the first list

0 -> 9
Fill an array with size of 10 filling from greatest to least (I guess it doesnt *need* to fill from greatest to least)

((0 + 9) / 10) - 1 = 8
((0 + 8)) / 10) - 1 = 7
((0 + 7)) / 10) - 1 = 6

This does seem to work for that list, but lets go with an even larger one.

0 -> 90
Same rules apply, using past ideas to get:

((0 + 90)) / 10) - 1 = 8
((0 + 8)) / 10) - 1 = 7

Well, it breaks here.

So I cant use the array size minus the designated slot to find my answer

For 0->90 array size 10 each number should be 10 apart I assume so like,
[0,10,20,30,40,50,60,70,80,90]

90 - ((90) / 10) = 81
81 - (81/10) = 73.9 

increment = (highNumber - lowNumber)/(arraySize - 1);




*/