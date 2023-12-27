const music = document.querySelector("audio");
const image = document.querySelector("img");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const title = document.getElementById("title");
const creator = document.getElementById("creator");
const progressDiv = document.getElementById("progressDiv");
const progress = document.getElementById("progress");
const currentTimeSpan = document.getElementById("currentTime");
const totalTimeSpan = document.getElementById("totalTime");

let songIndex = 0;

const songs = [
  {
    name: "bootstrap",
    title: "Bootstrap 5 Eğitimi",
    creator: "Muhammed Salih",
  },
  {
    name: "c",
    title: "C Programlama Eğitimi",
    creator: "Muhammed Salih",
  },
];

let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  creator.textContent = song.creator;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.png`;
}

loadSong(songs[songIndex]);

function playSong() {
  isPlaying = true;
  music.play();
  playButton.classList.replace("fa-play", "fa-pause");
}

function pauseSong() {
  isPlaying = false;
  music.pause();
  playButton.classList.replace("fa-pause", "fa-play");
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    // console.log(currentTime, duration);
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    console.log(durationMinutes);

    let durationSecond = Math.floor(duration % 60);
    console.log(durationSecond);

    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    if (durationSecond) {
      totalTimeSpan.textContent = `${durationMinutes}:${durationSecond}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    console.log(currentMinutes);

    let currentSecond = Math.floor(currentTime % 60);
    console.log(currentSecond);

    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    if (currentSecond) {
      currentTimeSpan.textContent = `${currentMinutes}:${currentSecond}`;
    }
  }
}

function setProgressBar(e) {
  console.log(e);
  const width = e.srcElement.clientWidth;
  console.log(width);

  const { duration } = music;

  const clickX = e.offsetX;
  // console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}
playButton.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressDiv.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
