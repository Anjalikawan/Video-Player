const player = document.querySelector('.players')
const video = player.querySelector('.video');
const toggle = player.querySelector('.player-button');
const range = player.querySelectorAll('.slider');
const dataSkip = player.querySelectorAll('[data-skip]');
const progress = player.querySelector('.progress');
const probar = player.querySelector('.progress1'); 
const fullscreenbtn = player.querySelector('.btn');
const closebtn = player.querySelector('.close');

function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    const icon = video.paused ? '►' : '❚ ❚';
    //console.log(icon)
    toggle.textContent = icon;
}

function handleRangeButton(){
    video[this.name] = this.value
    //console.log(this.value)
    //console.log(this.name)

}

function skip(){
    //console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateProgressbar(){
    const percent = (video.currentTime / video.duration) * 100;
    //console.log(percent)
    probar.style.flexBasis = `${percent}%`;
    //console.log('hi')
}

function scrub(e){
    const scrubData = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubData;
   // console.log('scrubData')
}

function openFullscreen(){
    //const elem = video.requestFullscreen() || video.exitFullscreen();
      //elem.call(e);
    if (!video.requestfullscreen) {
        video.requestFullscreen();
    }
    //console.log('hi')
}
function closeFullscreen(){
    if(!video.exitFullscreen){
        video.exitFullscreen();
    }
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgressbar);
//toggle.addEventListener('click', openFullScreen)
fullscreenbtn.addEventListener('click', openFullscreen);
closebtn.addEventListener('click', closeFullscreen);
range.forEach(items => items.addEventListener('change', handleRangeButton));
range.forEach(items => items.addEventListener('mousemove', handleRangeButton));

dataSkip.forEach(items => items.addEventListener('click',skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
