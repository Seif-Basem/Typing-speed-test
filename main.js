//steps to creat the project
/*
--[01] Creat HTML
--[02] Add CSS
--[03] Creat The App Logic
-------[01] Add levels
-------[02] Show level and seconds
-------[03] Add array of words
-------[04] Add start game button
-------[05] Generate upcoming words
-------[06] Display copy word and paste event + focus on input
-------[07] start play function
-------[08] start the time and count score
-------[09] add the error and success messages
--[04] Your Trainings To Add Features
-------[01] Save score to local storage with date
-------[02] Choose levels from select box
-------[03] Break the logic to more functions
-------[04] Choose array of words for every level
-------[05] Write game instruction with dynamic values
-------[06] Add 3 seconds for the first word
*/

// Array of words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// setting levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

//Default level
let defaultLevelName = "Normal"; // change level from here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

//setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

//Disable Paste Event
input.onpaste = function () {
    return false;
}

//Start game
startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate word Function
    genWords()
}

function genWords() {
    // Get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get word index
    let wordIndex = words.indexOf(randomWord);
    // Remove word from array by index
    words.splice(wordIndex, 1);
    // Show the Random word
    theWord.innerHTML = randomWord;
    // Empty upcoming words
    upcomingWords.innerHTML = "";
    // Generate words
    for(let i = 0; i < words.length; i++){
        // Create dive element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Call start play function
    startPlay()
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds; // To reset the value into 3 again
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--
        if(timeLeftSpan.innerHTML === "0") {
            // Stop timer
            clearInterval(start);
            // Compare words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = "";
                // Increase Score
                scoreGot.innerHTML++;
                // to get the next word to write
                if (words.length > 0) {
                    // Call generate word function
                    genWords();
                } else{
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("congratulations");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove upcoming words box
                    upcomingWords.remove();
                }
            }else{
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000)
}