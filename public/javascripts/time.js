var fromap = 0;
var toap = 0;
var plustime = 0;
var dat = new Date();
var dat2 = new Date();
var flug = 0;
var text;

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

    var anchor = document.createElement('h2');
    anchor.className = 'anc';
    if(flug==0){
        text = document.createTextNode('予定時刻は'+dat.getMonth()+'月'+dat.getDate()+'日'+dat.getHours()+'時'+dat.getMinutes()+'分です（数分の誤差は許せ）');
    }
    else{
        text = document.createTextNode('flugは'+ flug + 'だしそれ調べる意味なくない？');
    }
    anchor.appendChild(text);
    var result = document.getElementById('result');
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