const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullScreenBtn = document.querySelector('.fullscreen'); 


// Play & Pause ----------------------------------- //

function showPlayIcon(){
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay(){
  if(video.paused){
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  }else{
    video.pause();
    showPlayIcon();
  }
}

//On Video end, show play button icon
video.addEventListener('ended', showPlayIcon); 

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time){
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  seconds < 10 ? seconds = `0${seconds}`: seconds;

  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress(){  
  progressBar.style.width = `${(video.currentTime/video.duration)*100}%`;

  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
  
}

// Click to seek within the video
function setProgress(e){
  const newTime = e.offsetX/progressRange.offsetWidth;
  progressBar.style.width = `${newTime*100}%`;
  video.currentTime = newTime*video.duration;
  console.log(newTime)
}

// Volume Controls --------------------------- //
// Volume Bar
function changeVolume(e){
  let volume = e.offsetX/volumeRange.offsetWidth;
  // Rounding volume value
  if(volume < 0.1){
    volume = 0;
  }
  if(volume >0.9){
    volume = 1;
  }
  volumeBar.style.width = `${volume*100}%`;
  video.volume = `${volume}`;

  // Change icon depending on volume
  volumeIcon.className = '';
  if(volume > 0.7){
    volumeIcon.classList.add('fas', 'fa-volume-up')
  }else if(volume < 0.7 && volume > 0.1){
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }else{
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
}
// Mute or unmute 
function toggleMute(e){
  let prevVolume = video.volume;
  if(video.muted){
    video.muted = false;
    video.volume = prevVolume;
    if(video.volume < 0.7 && video.volume > 0.1){
      volumeIcon.classList.replace("fa-volume-mute", "fa-volume-down")
    }
    if(video.volume > 0.7){
      volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up")
    }
    volumeIcon.title = "Mute"
    volumeRange.style.display = 'block';
    volumeBar.style.width = `${prevVolume*100}%`;
  }else{
    video.muted = true;
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute")
    volumeIcon.classList.replace("fa-volume-down", "fa-volume-mute");
    volumeIcon.title = "Unmute"
    volumeRange.style.display = 'none';
    // volumeBar.style.width = `${0}%`;
  }
}


// Change Playback Speed -------------------- //
function changeSpeed(){
  video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen(){
  console.log('fullscreen')

  if(!fullscreen){
    openFullscreen(player);
  }else{
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullScreenBtn.addEventListener('click', toggleFullscreen);