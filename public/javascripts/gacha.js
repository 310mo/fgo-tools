var servant = 0;
var time = 0;
var prob = 0;
var n_prob = 1;

function prob_calc(servant, time) {
    prob = 100;
    n_prob = 1;
    for(var i=0; i<time.value; i++) {
        n_prob = n_prob * (1 - 0.01*servant.value);
        console.log('n_prob = '+n_prob);
    }
    return (1 - n_prob) * 100;
}

function viewing() {
    servant = document.getElementById('servant');
    time = document.getElementById('time');
    console.log('servant is ',servant.value);
    console.log('time is ', time.value);
    console.log('prob = '+prob);
    prob = prob_calc(servant, time);
    console.log('prob = '+prob);


    var anchor = document.createElement('h1');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    //var img = document.createElement('img');
    //var img2 = document.createElement('img');
    anchor.className = 'anc';
    //img.className = 'saber';
    //img2.className = 'hukidashi';
    //img.src = '/images/saber.PNG';
    //img2.src = '/images/hukidashi.png';
    text = document.createTextNode('引ける確率は');
    text1 = document.createTextNode(prob.toFixed(1)+"%です");
    text2 = document.createTextNode("ご武運を！");
    anchor.appendChild(text);
    anchor.appendChild(br1);
    anchor.appendChild(text1);
    anchor.appendChild(br2);
    anchor.appendChild(text2);


    var result = document.getElementById('result');
    //var result2 = document.getElementById('result2');
    console.log(result.firstChild);
    if(result.firstChild!=null){
        while(result.firstChild!=null) {
            result.removeChild(result.firstChild);
        }
    }
    /*if(result2.firstChild!=null){
        while(result2.firstChild!=null) {
            result2.removeChild(result2.firstChild);
        }
    }*/
    //result2.appendChild(img2);
    //result2.appendChild(img);
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
        viewing();        
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn2').addEventListener('click', function() {
             reset();
    }, false);
}, false);