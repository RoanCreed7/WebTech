const continueBtn = document.getElementById('continue-button');
const storyElement = document.getElementById('story');

var game = false;
var storyReturn;

var index = 1;

var time;
var t;
var difficulty;

function gameStart(){
    let state = {}
    showStory(1);
}

function continueStory(){
    console.log("Continue story")
    game = false;
    storyContent.hidden = false;
    buts.hidden = false;
    area.hidden = true;
    showStory(index)
}

function showStory(textIndex){
    while(continueBtn.firstChild){
        continueBtn.removeChild(continueBtn.firstChild)
    }

    console.log(textIndex)

    if (!game){
    const storyText = storyScript.find(storyText => storyText.id === textIndex)
    storyElement.innerText = storyText.text

    index = index + 1;

        if(game){
            game = false
            console.log("tre")
        }else{
            game = true
            console.log("fas")
        }
    
        storyText.options.forEach(option => {           
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        
        button.addEventListener('click', () => selection(option)) //This is the "continue" button event
        continueBtn.appendChild(button)
                   
        })
    }else{
        //Start game mode
        storyReturn = false;
        console.log("game")
        wordScramPlay()

    }
}

function showOption(option)
{
    return option.requiredState == null || option.requiredState(state);
}

function selection(option){
    let next = option.nextText;
    while(continueBtn.firstChild){
        continueBtn.removeChild(continueBtn.firstChild)
    }
    
    console.log(option)

    if (next <= 0){
        document.location.reload();
    }

    if (option.correct){
        next = 11;
        const storyText = storyScript.find(storyText => storyText.id === next)
        storyElement.innerText = storyText.text


        const button = document.createElement('button')
        button.innerText = "Continue"
        button.classList.add('btn')
        time = 10;
        time += 7;
        button.addEventListener('click', () => selectNext(option)) //This is the "continue" button event
        continueBtn.appendChild(button)
        
        console.log("Answer is correct")
        
    }
    else{
        next = 12;
        const storyText = storyScript.find(storyText => storyText.id === next)
        storyElement.innerText = storyText.text


    const button = document.createElement('button')
        button.innerText = "Continue"
        button.classList.add('btn')
        time = 10;
        button.addEventListener('click', () => selectNext(option))
        continueBtn.appendChild(button)
        console.log("Answer is incorrect")
    }

}

function selectNext(option){
    const next = option.nextText;
    
   //state = Object.assign(state, option.setState)

    showStory(next)
}

var difficultyCookieExists;
if (window.location.href.match('MainPage.html') != null){
    difficultyCookieExists = getCookie('setDifficulty');
    if (difficultyCookieExists == ""){ 
        console.log('No cookie found');
    }
    else{
        difficulty = difficultyCookieExists;
        console.log("game diffy to " + difficulty);
    }
}

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

const storyContent = document.querySelector(".content")
const buts = document.querySelector(".buttons")
const area = document.querySelector('.gameArea');

const inital = document.querySelector('.start');
const guess = document.querySelector('input');
const gameBut = document.querySelector('.but');
var score = document.querySelector('.score-1');

score.innerHTML = 0;
var sc = 0;
var game1 = false;
var newW = "";
var randomV = "";

//Easy words
const words1 = ['Test','Bit','Bug','Code','File','Load','Loop','Node','Wifi','LED'];
//Medium words
const words2 = ['Input','Array','ASCII','Binary','Clock','Cookie','Queue','Stack','Virus','Mouse'];
//Hard words
const words3 = ['Address','Download','Databus','Internet','Wireless','Spyware','Software','Program'];

 const createWords = () => {
    if (difficulty == 1){
        let number = Math.floor(Math.random() * words1.length);
        let random = words1[number];
        return random;
    }else if (difficulty == 2){
        let number = Math.floor(Math.random() * words2.length);
        let random = words2[number];
        return random;
    }else{
        let number = Math.floor(Math.random() * words3.length);
        let random = words3[number];
        return random;
    }

     
 }

 const jumbleWord = (jWord) => {
     for (let i = jWord.length - 1; i >= 0; i--) {
         let temp = jWord[i];
         let j = Math.floor(Math.random() * (i + 1));
         jWord[i] = jWord[j];
         jWord[j] = temp;

     }
     return jWord.join("");
 } 
  
function choice(){
    if (!storyReturn){
        wordScramPlay();
        console.log("Starting game")
    }
    else{
        clearTimeout(t);
        continueStory();
    }
}
 
function timer(){
    score.innerText = time.toString();
    time--;
    t = setTimeout("timer()",1000);

        if (time === -1){
            clearInterval(t);
            console.log("Fail")
            gameFailed();
        }
    
}

function gameFailed(){

    story.innerText = "You have taken too long to unscramble the word. The guards find you and you are caught.";
    story.hidden = false;
    game = false;
    buts.hidden = false;
    area.hidden = true;

    const button = document.createElement('button')
    button.innerText = "Restart game"
    button.classList.add('btn')
    
    button.addEventListener('click', () => document.location.reload())
    continueBtn.appendChild(button)
}

const log = document.getElementById('log');
        document.addEventListener('keypress', key);
        function key(e) {
          if (`${e.code}` == "Enter"){
              if(game1){
                console.log("eeeee word");
                choice();
              }
          }
        }



 function wordScramPlay() {

    //Showing game
    storyContent.hidden = true;
    buts.hidden = false;
    area.hidden = false;
    guess.hidden = false;
    guess.focus();

     if (!game1) {

        game1 = true;
        inital.style.color = 'black';
        gameBut.textContent = 'Guess';
        guess.classList.toggle('hidden');
        
        newW = createWords();
        randomV = jumbleWord(newW.split(""));
        console.log(randomV);
        inital.innerHTML = "Unscramble the word: " + randomV;
        timer();
        storyReturn = false;

     } else {

        

        let inputWord = guess.value.toLowerCase();
         if (inputWord == newW.toLowerCase()) {
            console.log("Input: " + guess.value);
            console.log("Scram: " + newW);
            console.log("correct word");

            guess.hidden = true;
            clearTimeout(t);
            console.log('correct');
            game1 = false;
            inital.innerHTML = `Well done! That's correct.\n
            The word was ${newW}`;
            inital.style.color = 'black';
            guess.classList.toggle('hidden');
            gameBut.innerHTML = 'Continue story';
            guess.value = "";
            storyReturn = true;

         } else {
            console.log('incorrect');
            inital.innerHTML = `Incorrect guess.Try Again before time runs out! '${randomV}'`;
            inital.style.color = 'red';
            gameBut.innerHTML = 'Guess';
            guess.value = "";
            guess.classList.toggle('hidden');
            storyReturn = false;
         }
     }
 }

const storyScript = [
    {
        id: 1, 
        text: 'Crossing the border with your backpack is easy and you are able to'+
        ' hitchhike your way to the nearby town at the bottom of the mountain. '+
        'From there you steal a car and start to drive up to the first, yet weak, '+
        'checkpoint at the base on the mountain where you choose between your laptop or your '
        +'phone to hack into the registration plate recognition cameras to allow your car through.', 
        options:[
            { text: "Laptop",
            correct: true,
            nextText: 2
            },
            { text: "Phone", 
            correct: false,
            nextText: 2  
            }
        ]
    },
    {
        id: 2,
        
        text: 'Once you are through you ditch the car halfway up and continue on foot where you are met with the main gate to the compound with guards checking papers outside. You decide the best idea is to distract the guards by hijacking the flood lights and choose between a pair of plyers or some extra wires. ',
        options: [
            { 
                text: "Plyers",
                correct: false,
                nextText: 3
            },
            { 
                text: "Spare wires",
                correct: true,
                nextText: 3
            }
        ]
    },
    
    {
        id: 3, 
        text: 'You make your way to the gate controls and decide whether to use the plyers again or a screwdriver. ',
        options: [
            { 
                text: "Plyers",
                correct: true,
                nextText: 4
            },
            { 
                text: "Screw driver",
                correct: false,
                nextText: 4
            }
        ]
    },

    {
        id: 4, 
        text: 'As you move through the car park you decide to set off some car alarms to distract the guards from the building, you choose between a rock and your phone.',
        options: [
            { 
                text: "Rock",
                correct: false,
                nextText: 5
            },
            { 
                text: "Phone",
                correct: true,
                nextText: 5
            }
        ]
    },
    {
        id: 5, 
        text: 'You get to the back entrance where there is a pattern recognition panel. You decide to use either yesterday’s newspaper and your phone or a screwdriver.',
        options: [
            { 
                text: "Newspaper and phone",
                correct: true,
                nextText: 5
            },
            { 
                text: "Screw driver",
                correct: false,
                nextText: 5
            }
        ]
    },
    {
        id: 6, 
        text: 'After you make it inside you need to get past the guards from the server room door. You decide to make a fake radio call using either your phone or laptop.',
        options: [
            { 
                text: "Phone",
                correct: true,
                nextText: 5
            },
            { 
                text: "Laptop",
                correct: false,
                nextText: 5
            }
        ]
    },
    {
        id: 7, 
        text: 'Now you need to get through the server room door fingerprint scanner choosing between a special silicon glove with 5 options or try all 10 of your own fingers.',
        options: [
            { 
                text: "Glove",
                correct: true,
                nextText: 5
            },
            { 
                text: "Fingers",
                correct: false,
                nextText: 5
            }
        ]
    },
    {
        id: 8, 
        text: 'Once inside you need to get through the main server. You must break through every layer of defence you have come across so far. Choose between the computer that is already inside the room or the laptop from your bag.',
        options: [
            { 
                text: "Computer",
                correct: true,
                nextText: 5
            },
            { 
                text: "Your laptop",
                correct: false,
                nextText: 5
            }
        ]
    },
    {
        id: 9, 
        text: 'Now that you have successfully deleted your data file you must escape. Setting off the fire alarm system to cause panic inside the building is the safest way to escape, will you start a real fire or manually access the system through the computer in the server room?',
        options: [
            { 
                text: "Start fire",
                correct: false,
                nextText: 5
            },
            { 
                text: "Manually trigger alarm",
                correct: true,
                nextText: 5
            }
        ]
    },
    {
        id: 10, 
        text: 'MISSION COMPLETE: You sneak your way out the back entrance as panic ensues leaving no trail behind you. After blending into the group of people outside you are able to leave the compound in hidden in the back of an employee’s car. Deleting your file was the first major step in being able to live in this new nation and complete the rest of your mission.',
        options: [
            { 
                text: "Complete Mission",
                
                nextText: -1
            }
        ]
    },
    {
        id: 11, 
        text: 'Well done, you chose the correct option. You have an additional 8 seconds to complete the game.',
    },
    {
        id: 12, 
        text: 'You did not choose the best option for speed and effectivness. Your time limit will remain the same.',
    }
]
