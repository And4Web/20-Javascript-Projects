const image = document.querySelector("img");
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const audio = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "and-1",
    display: "Electric Chill Machine",
    artist: "and-1"
  },
  {
    name: "and-2",
    display: "Sevent Nation Army (Remix)",
    artist: "and-2"
  },
  {
    name: "and-3",
    display: "Goodnight, Disco Queen",
    artist: "and-3"
  },
  {
    name: "metric-1",
    display: "Front Row (Remix)",
    artist: "Metric/and Design"
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  audio.play();
}

// Pause
function pauseSong(){
  isPlaying = false
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  audio.pause();
}

// Play or pause event listeners
playBtn.addEventListener('click', ()=>{
  return isPlaying ? pauseSong() : playSong()
})

// Update the DOM
function loadSong(song){
  title.textContent = song.display;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 1;

// Previous song
function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length - 1;
  }
  
  loadSong(songs[songIndex]);
  playSong();
}
// Next song
function nextSong(){
  songIndex++;
  if(songIndex > songs.length -1){
    songIndex = 0;
  }
  
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select first song
loadSong(songs[songIndex]);


// Update progress bar and time
function updateProgressBar(e){
  if(isPlaying){
    const {currentTime, duration} = e.target;
    // Update the progress bar width
    const progressPercent = (currentTime/duration)*100;
    // console.log(currentTime, duration, progressPercent);
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration/60);
    let durationSeconds = Math.floor(duration % 60);
    
    if(durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay durationEl to avoid flashing NaN
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    
    // Calculate Display for current time
    const currentMinute = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10) currentSeconds = `0${currentSeconds}`

    currentTimeEl.textContent = `${currentMinute}:${currentSeconds}`
  }
}

// set progress bar
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const {duration} = audio;
  // const progressPercentage = (clickX/width) * 100;
  const progressInSeconds = Math.floor((clickX/width) * duration);
  
  audio.currentTime = progressInSeconds
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);