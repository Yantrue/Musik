const iframe = document.getElementById("sc-player");
const progressBar = document.getElementById("progress");

let player;
let duration = 0;
let isPlaying = false;

const songs = [
  {
    title: "Back to Friends",
    cover: "https://picsum.photos/200?1",
    url: "https://soundcloud.com/forss/flickermood",
    lyrics: [
      { time: 0, text: "Intro..." },
      { time: 5, text: "Mulai..." },
      { time: 10, text: "Masuk beat..." }
    ]
  },
  {
    title: "From The Start",
    cover: "https://picsum.photos/200?2",
    url: "https://soundcloud.com/odesza/say-my-name",
    lyrics: [
      { time: 0, text: "Awal..." },
      { time: 6, text: "Chorus..." },
      { time: 12, text: "Drop..." }
    ]
  }
];

let currentLyrics = [];

// play lagu
function playSong(i) {
  const song = songs[i];

  iframe.src =
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent(song.url) +
    "&auto_play=true";

  document.getElementById("title").innerText = song.title;
  document.getElementById("cover").src = song.cover;

  setTimeout(() => {
    player = SC.Widget(iframe);
    bindPlayer(i);
  }, 500);
}

// bind player
function bindPlayer(i) {
  currentLyrics = songs[i].lyrics;

  player.getDuration(d => duration = d);

  player.bind(SC.Widget.Events.PLAY_PROGRESS, e => {
    let time = e.currentPosition / 1000;

    // update progress bar
    let percent = (e.currentPosition / duration) * 100;
    progressBar.style.width = percent + "%";

    updateLyrics(time);
  });
}

// play pause
function togglePlay() {
  if (!player) return;

  if (isPlaying) {
    player.pause();
  } else {
    player.play();
  }

  isPlaying = !isPlaying;
}

// seek
function seek(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  player.seekTo(percent * duration);
}

// lirik
function updateLyrics(time) {
  const box = document.getElementById("lyrics");
  box.innerHTML = "";

  currentLyrics.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line.text;

    if (time >= line.time) {
      p.classList.add("active");
    }

    box.appendChild(p);
  });
}
