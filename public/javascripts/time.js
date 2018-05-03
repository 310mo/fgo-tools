var fromap = 0;
var toap = 0;
var plustime = 0;
var dat = new Date();
var dat2 = new Date();
var flug = 0;
var text;
var text2;
var text3;

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
    fromap = document.getElementById('fromap');
    toap = document.getElementById('toap');
    console.log('now ap is',fromap.value);
    console.log('to ap is', toap.value);

    if((toap.value-fromap.value)<0) {
        flug = 1;
    }
    else {
        dat.setMinutes(dat.getMinutes()+5*(toap.value-fromap.value));
        console.log(dat.getMonth(), dat.getDate(), dat.getHours(), dat.getMinutes());
    }

    var anchor = document.createElement('b');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    var br3 = document.createElement('br');
    var img = document.createElement('img');
    var img2 = document.createElement('img');
    anchor.className = 'anc';
    img.className = 'saber';
    img2.className = 'hukidashi';
    img.src = '/images/saber.PNG';
    img2.src = '/images/hukidashi.png';
    if(flug==0){
        texta = document.createTextNode('予定時刻は');
        text = document.createTextNode(dat.getMonth()+'月'+dat.getDate()+'日');
        text2 = document.createTextNode(dat.getHours()+'時'+dat.getMinutes() + '分');
        text3 = document.createTextNode('です');

    }
    else{
        text = document.createTextNode('それ調べる意味なくない？');
    }
    anchor.appendChild(texta);
    anchor.appendChild(br1);
    anchor.appendChild(text);
    anchor.appendChild(text2);
    anchor.appendChild(br3);
    anchor.appendChild(text3);

    var result = document.getElementById('result');
    var result2 = document.getElementById('result2');
    console.log(result.firstChild);
    if(result.firstChild!=null){
        while(result.firstChild!=null) {
            result.removeChild(result.firstChild);
        }
    }
    if(result2.firstChild!=null){
        while(result2.firstChild!=null) {
            result2.removeChild(result2.firstChild);
        }
    }
    result2.appendChild(img2);
    result2.appendChild(img);
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