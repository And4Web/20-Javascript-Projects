const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

// let ms = 25000 => day=25000/(1000*60*60*24);
const second = 1000;          //1000
const minute = second * 60;   //1000*60
const hour = minute * 60;     //1000*60*60
const day = hour * 24;        //1000*60*60*24

// Set Date Input Min with today's date
const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute('min', today);

// Populate Countdown/Complete UI
function updateDOM(){
  countdownActive = setInterval(()=>{
    const now = new Date().getTime();
  const distance = countdownValue - now;

  const days = Math.floor(distance/day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  
  // Hide Input
  inputContainer.hidden = true;

  // If the countdown has ended, show complete
  if(distance < 0){
    countdownEl.hidden = true;
    clearInterval(countdownActive);
    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
    
    completeEl.hidden = false;
  }else{
    // else, show the countdown in progress
    // Populating Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
  timeElements[0].textContent = days < 10 ? `0${days}` : `${days}`;
  timeElements[1].textContent = hours < 10 ?`0${hours}` : `${hours}`;
  timeElements[2].textContent = minutes < 10 ? `0${minutes}` : `${minutes}`;
  timeElements[3].textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;

  completeEl.hidden = true;
  countdownEl.hidden = false;

  }

  }, second);
}

// Take values from form input
function updateCountdown(e){
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  // Check for valid date
  if(countdownDate === ""){
    alert("Please select a date for the countdown")
  }else{
    // Get number version of current date
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
  }
}

// Reset All values
function reset(){
  // Hide coutdowns and show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown;
  clearInterval(countdownActive);

  // Reset values
  countdownTitle = "";
  countdownDate = "";

  localStorage.removeItem('countdown');
}

// Restore previous countdown if available
function restorePreviousCountdown(){
  if(localStorage.getItem("countdown")){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate  = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check local storage
restorePreviousCountdown();