var hour = 0;
var minute = 0;
var plustime = 0;
var dat = new Date();
var dat2 = new Date();
var flug = 0;
var text;
var text2;


function getnowtm(dat, dat2) {
    dat.setMonth(dat2.getUTCMonth());
    dat.setDate(dat2.getUTCDate());
    dat.setHours(dat2.getUTCHours());
    dat.setMinutes(dat2.getUTCMinutes());
    console.log(dat.getMonth(), dat.getDate(), dat.getHours(), dat.getMinutes());
    dat.setMonth(dat.getMonth()+1);
    dat.setHours(dat.getHours()+9);
    console.log(dat.getMonth(), dat.getDate(), dat.getHours(), dat.getMinutes());
}

function viewing(dat) {
    hour = document.getElementById('hour');
    minute = document.getElementById('minute');
    toap = document.getElementById('toap');
    console.log('to ap is', toap.value);

    /*dat.setMinutes(dat.getMinutes()+5*(toap.value-fromap.value));
    console.log(dat.getMonth(), dat.getDate(), dat.getHours(), dat.getMinutes());*/
    if(hour.value<dat.getHours()) {
        var hv = Number(hour.value) + 24;
    }
    else {
        var hv = Number(hour.value);
    }
    console.log(hour.value);
    console.log(minute.value);
    var points = ((hv-dat.getHours())*12 + (minute.value-dat.getMinutes()) / 5);
    console.log(points);
    var re_points = toap.value - points;
    console.log(re_points);

    var anchor = document.createElement('h2');
    var br1 = document.createElement('br');
    var img = document.createElement('img');
    var img2 = document.createElement('img');
    img.className = 'saber2';
    img2.className = 'hukidashi2';
    img.src = '/images/saber.PNG';
    img2.src = '/images/hukidashi.png';
    anchor.className = 'anc2';
    if(re_points>0) {   
        text = document.createTextNode('現時点でAPを'+parseInt(String(re_points)));
        text2 = document.createTextNode('にしておきましょう');
        anchor.appendChild(text);
        anchor.appendChild(br1);
        anchor.appendChild(text2);
    }
    else {
        text = document.createTextNode('使い切ってしまって');
        text2 = document.createTextNode('問題ないです！');
        anchor.appendChild(text);
        anchor.appendChild(br1);
        anchor.appendChild(text2);
    }
    var result = document.getElementById('result');
    console.log(result.firstChild);
    if(result.firstChild!=null){
        while(result.firstChild!=null) {
            result.removeChild(result.firstChild);
        }
    }
    result.appendChild(img2);
    result.appendChild(img);
    result.appendChild(anchor);
}

function reset(){
    var fromap = 0;
    var toap = 0;
    var plustime = 0;
    var dat = new Date();
    var dat2 = new Date();
    var flug = 0;
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', function() {
        getnowtm(dat, dat2);
        viewing(dat);        
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn2').addEventListener('click', function() {
             reset();
    }, false);
}, false);