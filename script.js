const iframe = document.getElementById("sc-player");
let player;

// daftar lagu
const songs = [
  {
    url: "https://soundcloud.com/forss/flickermood",
    lyrics: [
      { time: 0, text: "Intro..." },
      { time: 5, text: "Masuk beat..." },
      { time: 10, text: "Mulai vibe..." }
    ]
  },
  {
    url: "https://soundcloud.com/odesza/say-my-name",
    lyrics: [
      { time: 0, text: "Awal lagu..." },
      { time: 6, text: "Masuk chorus..." },
      { time: 12, text: "Drop..." }
    ]
  }
];

let currentLyrics = [];

// load lagu
function playSong(index) {
  iframe.src =
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent(songs[index].url) +
    "&auto_play=true";

  setTimeout(() => {
    player = SC.Widget(iframe);
    bindPlayer(index);
  }, 500);
}

// bind event player
function bindPlayer(index) {
  currentLyrics = songs[index].lyrics;

  player.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
    let time = e.currentPosition / 1000;
    updateLyrics(time);
  });
}

// render lirik
function updateLyrics(currentTime) {
  const container = document.getElementById("lyrics");
  container.innerHTML = "";

  currentLyrics.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line.text;

    if (currentTime >= line.time) {
      p.classList.add("active");
    }

    container.appendChild(p);
  });
}
