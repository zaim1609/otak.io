var axisCoords=[],
    rotating=false,
    rotate=0,
    lastAng=0,
    volume=0,
    acc=0,
    error=false;

var nub=document.getElementById("nub"),
    axis=document.getElementById("axis"),
    audio=document.getElementById("audio"),
    needle=document.getElementById("needle"),
    light=document.getElementById("light"),
    arrow=document.getElementById("arrow");

nub.addEventListener("mousedown",grabNub);
nub.addEventListener("touchstart",grabNub);
document.body.addEventListener("mousemove",move);
document.body.addEventListener("touchmove",move);
document.body.addEventListener("mouseup",release);
document.body.addEventListener("touchend",release);


var tangan = document.getElementById("tangan")
var posisi = 700

var petunjuk = document.querySelector('.petunjuk')

var hadiah2 = document.querySelector("#hadiah")

function grabNub(){
  rotating=true;
  var axisBCR=document.getElementById("axis").getBoundingClientRect();
  axisCoords=[axisBCR.left+axisBCR.width/2,axisBCR.top+axisBCR.width/2];
}

function move(evt){
  if (rotating){
    evt.preventDefault();
    evt=evt.touches?evt.touches[0]:evt;
    var ang=Math.atan2(axisCoords[0]-evt.clientX,evt.clientY-axisCoords[1])/Math.PI*180;
    if (ang<0) ang+=360;
    var nextAng=ang-lastAng;
    if (nextAng<0) nextAng+=360;
    if (nextAng>180) nextAng=0;
    axis.style.transform="rotate("+ang+"deg)";
    
    lastAng=ang;
    acc=nextAng?Math.min(nextAng/30,1):0;

    if (acc<0) acc=0;
    console.log(acc)
    if(posisi > 100){
        posisi = posisi - 1
    tangan.style.top = `${posisi}px`

    console.log("keteken")
    }else if(posisi === 100){
        console.log("stop")
        
    }


  }
}

tangan.addEventListener("click",ganti)

function ganti() {
    if(posisi === 100){
        console.log("teken")
        document.querySelector(".tangan1").src="img/tangan2.png"
        document.querySelector(".hadiah").style.display="block"
    }
    
}

//teken hadiah
var hadiah = document.querySelector(".hadiah")
var o = 0

function berhadiah(){
    o = o+1
    if(o ===4 ){
    hadiah.src="img/otak.png"
    hadiah.style.width="200px"
    hadiah2.style.left= "43%"
    petunjuk.style.color="black"
    }else if(o ===3){
        hadiah.src="img/bag3.png"
    hadiah.style.width="400px"
    hadiah2.style.left= "35%"
    
    }else if(o===2){
        hadiah.src="img/bag2.png"
        hadiah.style.width="130px"
        hadiah2.style.left= "45%"
    }else if(o===1){
        hadiah.src="img/lol.png"
        hadiah.style.width="130px" 
        hadiah2.style.left= "45%"
        }else if(o===1){
            hadiah.src="img/bag2.png"
            hadiah.style.width="130px"
            hadiah2.style.left= "45%"
            hadiah2.style.top= "30%"
            }
}


hadiah.addEventListener("click",berhadiah)





function release(){
  rotating=false;
}





// setInterval(function(){
//   if (error){
//     audio.volume=Math.random();
//     return;
//   }
//   volume*=0.9;
//   if (volume>115){
//     document.body.setAttribute("error",true);
//     error=true;
//   }
//   var volMap=1.5*volume-75;
//   needle.style.transform="rotate("+volMap+"deg)";
//   audio.volume=Math.min(volume,100)/100;
//   acc-=0.05;
//   if (acc<0) acc=0;
//   light.style.opacity=acc;
//   arrow.style.left=(acc*90+5)+"%";
//   if (!rotating){
//     axis.style.transform="rotate("+(lastAng+=acc*100)+"deg)";
//   }
// },50);