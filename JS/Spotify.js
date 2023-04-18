const clientId = "sdfghjkiojhgfd23456789";
const clientSecret = "gbhnjkiojuhgfdsd2345678987654";
let i = 0;
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  //   console.log(data);
  const accessToken = data.access_token;
  // console.log(accessToken);
  const artistId = "1mYsTxnqsietFxj1OgoGbG";
  fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      let songsSrc = [];
      let imgArray = [];
      let songsNameArray = [];

      data.tracks.map(m => {
        // console.log(m);

        let Songcards = document.getElementById("Songcards");

        // console.log(Songcards);

        let divCard = document.createElement("div");

        divCard.className = "divCard";

        Songcards.appendChild(divCard);

        divCard.innerHTML += `<img id="thumbnails" src="${m.album.images[0].url}" alt="${m.name}"><h4>${m.name}</h4>`;
        // console.log(m.name);
        // console.log(m.album.images[0].url);
        // console.log(m.preview_url);

        // event listener

        divCard.addEventListener("click", e => {
          e.stopPropagation();
          e.preventDefault();
          let audio = document.getElementById("audio");

          let playAndPause = document.getElementById("playSong");
          playAndPause.innerHTML = `<i title="" class="fa-solid fa-pause">`;

          // audio.style.display = "block";
          audio.setAttribute("src", m.preview_url);
          // console.log(m.preview_url);

          let smallImg = document.getElementById("smallImg");

          // console.log(smallImg);

          smallImg.setAttribute("src", m.album.images[0].url);
          let smallSongName = document.getElementById("smallSongName");
          smallSongName.innerHTML = m.name;
        });

        //pushing songsSrc in to the array
        songsSrc.push(m.preview_url);
        imgArray.push(m.album.images[0].url);
        songsNameArray.push(m.name);
      });

      //!Playing the next song and previous song

      let nextSong = document.getElementById("nextSong");

      let audio = document.getElementById("audio");

      nextSong.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();

        //for current song index
        let currentSong = songsSrc.indexOf(audio.getAttribute("src"));
        let songIndex = currentSong;
        // console.log(songIndex);

        //For setting current songs image
        let smallImg = document.getElementById("smallImg");
        let songImgIndex = imgArray.indexOf(smallImg.getAttribute("src"));
        // console.log(songImgIndex);

        //setting song names for the audio player

        let smallSongName = document.getElementById("smallSongName");

        if (
          songIndex >= 0 &&
          songIndex <= songsSrc.length - 1

          // &&
          // songImgIndex >= 0 &&
          // songImgIndex <= imgArray.length - 1
        ) {
          songIndex++;
          let playAndPause = document.getElementById("playSong");
          playAndPause.innerHTML = `<i title="" class="fa-solid fa-pause">`;

          console.log(songIndex);

          // audio.style.display = "block";
          audio.setAttribute("src", songsSrc[songIndex]);

          //setting images for the audio player

          smallImg.setAttribute("src", imgArray[songIndex]);

          //setting song names for the audio player
          smallSongName.innerHTML = songsNameArray[songIndex];
        } else {
          audio.setAttribute("src", songsSrc[0]);
          smallImg.setAttribute("src", imgArray[0]);
          smallSongName.innerHTML = songsNameArray[0];

          // console.log("playlist over");
        }
      });

      // Playing the previous song

      let previousSong = document.getElementById("previousSong");

      previousSong.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();

        //for current song index
        let currentSong = songsSrc.indexOf(audio.getAttribute("src"));
        let songIndex = currentSong;
        // console.log(songIndex);

        //For setting current songs image
        let smallImg = document.getElementById("smallImg");
        let songImgIndex = imgArray.indexOf(smallImg.getAttribute("src"));
        // console.log(songImgIndex);

        //setting sons name for the audio player

        if (songIndex >= 0 && songIndex <= songsSrc.length - 1) {
          let playAndPause = document.getElementById("playSong");
          playAndPause.innerHTML = `<i title="" class="fa-solid fa-pause">`;

          songIndex--;

          console.log(songIndex);

          audio.setAttribute("src", songsSrc[songIndex]);

          //setting images for the audio player
          // songImgIndex--;
          smallImg.setAttribute("src", imgArray[songIndex]);

          //setting song names for the audio player
          smallSongName.innerHTML = songsNameArray[songIndex];
        } else {
          // console.log("playlist over");

          audio.setAttribute("src", songsSrc[songsSrc.length - 1]);
          smallImg.setAttribute("src", imgArray[songIndex.length - 1]);
          smallSongName.innerHTML = songsNameArray[songIndex.length - 1];
        }
      });

      let playAndPause = document.getElementById("playSong");

      playAndPause.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();

        let value = audio.classList.toggle("active");
        if (value === true) {
          playAndPause.innerHTML = `<i title="" class="fa-solid fa-pause">`;
          audio.play();
        } else {
          playAndPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
          audio.pause();
        }
      });
      // console.log(songsSrc);
      console.log(imgArray);
      console.log(songsNameArray);
    });
};
getToken();

//! setting the greeting message for the users

let date = new Date();
// console.log(date.getTime());
// let locale = date.toLocaleTimeString();

let hrs = date.getHours();
// console.log(typeof hrs);

let min = date.getMinutes();
// console.log(typeof min);

let sec = date.getSeconds();
// console.log(typeof sec);

if (hrs >= 00 && hrs < 12) {
  let greeting = document.getElementById("greeting");
  greeting.innerHTML = "Good Morning";
} else if (hrs >= 12 && hrs < 16) {
  greeting.innerHTML = "Good afternoon";
} else if (hrs >= 16 && hrs < 22) {
  greeting.innerHTML = "Good evening";
} else if (hrs >= 22 && hrs < 24) {
  greeting.innerHTML = "Good night ";
}
