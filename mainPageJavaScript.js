const menuButton = document.querySelector('.menu');
const show = document.querySelector('.select');
let menuOpen = false;


menuButton.addEventListener('click',() =>{
    if(!menuOpen){
        menuButton.classList.add('open');
        show.classList.add('fade');
        menuOpen = true;
        
    }
    else{
        menuButton.classList.remove('open');
        show.classList.remove('fade');
        menuOpen = false;
        
    }
});


var playTypewriter;
var soundCookieExists;
var difficultyCookieExists;

if (window.location.href.match('SettingsPage.html') != null){
    //Checks the cookie for the sounds setting
    soundCookieExists = getCookie('playTypewriter');
    difficultyCookieExists = getCookie('setDifficulty');

    if (soundCookieExists == ""){ 
        console.log('No cookie found');

        playTypewriter = "0";
    }
    else{
        if(soundCookieExists == "1"){
            document.getElementById('soundCheckbox').checked = true;
            playTypewriter = soundCookieExists;
            console.log("Setting to checked");
        }
        else{
            document.getElementById('soundCheckbox').checked = false;
            playTypewriter = "0";
            console.log("Setting to unchecked");
        }
    }


    if (difficultyCookieExists == ""){ 
        console.log('No cookie found');
    }
    else{
        document.getElementById('difficulty').value = difficultyCookieExists;
        console.log("sa difficulty to " + difficultyCookieExists);
    }
}


function setTypewriter(){
    const soundCheck = document.getElementById("soundCheckbox");
    if(soundCheck.checked){
        playTypewriter = "1"
        console.log("Setting cookie to checked");
        document.cookie = "playTypewriter=" + playTypewriter + "; expires=Thu, 18 Dec 2060 12:00:00 UTC; path=A:\Uni Projects 2020\Web Developement\JavaScriptCoursework\REAL\Cookies";
    }else{
        playTypewriter = "0";
        console.log("Setting cookie to unchecked");
        document.cookie = "playTypewriter=" + playTypewriter + "; expires=Thu, 18 Dec 2060 12:00:00 UTC; path=A:\Uni Projects 2020\Web Developement\JavaScriptCoursework\REAL\Cookies";

    }
    
}

var setDifficulty;
function setDifficulty(){
    const difficulty = document.getElementById("difficulty");

    console.log("setDifficulty " + difficulty.value);
    document.cookie = "setDifficulty=" + difficulty.value + "; expires=Thu, 18 Dec 2060 12:00:00 UTC; path=A:\Uni Projects 2020\Web Developement\JavaScriptCoursework\REAL\Cookies";

}
var typewriter = document.getElementById('typewriter');

function playType(){
    
    var soundCookie = getCookie('playTypewriter');
        if(soundCookie == "1"){
            console.log("Play typewriter")
            typewriter.play();
        }
}

var play = 0;
var music = document.getElementById('audio');
var muteUnmuteBtn = document.getElementById('audioMUMBtn')
function playMusic(){

    if (play === "1"){
        music.pause();
        console.log("Not playing");
        play = "0";
        muteUnmuteBtn.src = "Images/volume-mute-solid.svg";
    }
    else{
        music.play();
        console.log("Playing");
        play = "1";
        muteUnmuteBtn.src = "Images/volume-up-solid.svg";
    }
}

//Gets any cookie from the given name
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /*getCookie function taken from W3 Schools as it is a very 
  clear way to get data from any cookie*/