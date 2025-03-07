import { songs, Singers, playLists, newPlaylist } from "./db.js";
window.addEventListener('DOMContentLoaded', (event) => {

    let audioElement = null;
    let currentSongIndex = null;
    let playlistSongs = songs;
    let banner = document.querySelector('.banner')
    let progressbar = document.getElementById('myProgress')
    const playSong = document.getElementById('play')
    let previous = document.getElementById('backword')
    let next = document.getElementById('forward')
    let time = document.getElementById('time')
    let duration = document.getElementById('duration')
    let createPlaylist = document.querySelector('.your-playlist');
    let newplaylist = document.querySelector('.create');

    banner.style.backgroundImage = `url('./songs_cover/${songs[0].cover}')`
    audioElement = new Audio(`./mp3/${songs[0].name}`)
    currentSongIndex = 0

    //to update the time of the music after playing
    const runningTime = (a) =>{
        const minutes = Math.floor(a.currentTime / 60)
        const seconds = Math.floor(a.currentTime % 60)

        const Time = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        time.textContent = Time
    } 

    //to get the actual duration of the music
    const actualTime = (a) =>{
        const minutes = Math.floor(a.duration / 60)
        const seconds = Math.floor(a.duration % 60)

        const Time = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        duration.textContent = Time
    }

    //function for updating the seekbar
    const handleTimeUpdate = () => {
        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
        progressbar.value = progress

        runningTime(audioElement)
        actualTime(audioElement)
    }

    //adding evenhandler on audioelement to track the progress of the song
    audioElement.addEventListener('timeupdate', handleTimeUpdate)

    //handling the change in progress bar
    progressbar.addEventListener('input', () => {
        audioElement.currentTime = (progressbar.value * audioElement.duration) / 100
        time.textContent = audioElement.currentTime
        runningTime(audioElement)
    })


    // fetch the all the songs by default playlist
    const fetch_songs = async (key = null, value = null) => {
        const currentSongs = document.querySelector(".currentSongs");

        // Clear current playlist contents
        currentSongs.innerHTML = `<h2 id="current-playlist-name">${key ? `${value}` : 'All Songs'}</h2>`;

        //container for song lists
        const songOuterDiv = document.createElement('div');
        songOuterDiv.classList.add('songs')


        //filtering playlistSongs on the behalf of selected singer or playlist if its selected otherwise by default playlit will be displayed
        if (key && value) {
            key = key.toLowerCase()
            value = value.toLowerCase()

            playlistSongs = songs.filter(song => song[key].toLowerCase() === value)
        }



        // Loop through the songs and create dynamic content for each song
        for (let index = 0; index < playlistSongs.length; index++) {
            const song = playlistSongs[index];

            // Create a new div for each song
            const songDiv = document.createElement('div');
            songDiv.classList.add('song');

            // Create cover div with the image
            const coverDiv = document.createElement('div');
            coverDiv.classList.add('cover');
            coverDiv.style.backgroundImage = `url('./songs_cover/${song.cover}')`;

            // Create details div
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');
            const songName = document.createElement('p');
            songName.id = 'name'
            songName.textContent = song.name;
            const songComposer = document.createElement('p');
            songComposer.id = 'composer'
            songComposer.textContent = `Composer: ${song.composer}`;
            detailsDiv.appendChild(songName);
            detailsDiv.appendChild(songComposer);

            // Create options div (You can add more functionality here)
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            // You can add buttons or options for each song here (like play, remove, etc.)

            // Append all parts to the songDiv
            songDiv.appendChild(coverDiv);
            songDiv.appendChild(detailsDiv);
            songDiv.appendChild(optionsDiv);

            songDiv.addEventListener("click", () => {

                if (!audioElement || currentSongIndex !== index) {

                    if (audioElement) {
                        audioElement.pause();
                        audioElement.currentTime = 0;
                        playSong.classList.remove('fa-pause')
                        playSong.classList.add('fa-play')
                    }

                    audioElement = new Audio(`./mp3/${song.name}`)
                    currentSongIndex = index;

                    audioElement.addEventListener('timeupdate', handleTimeUpdate)
                    audioElement.play()
                    playSong.classList.remove('fa-play')
                    playSong.classList.add('fa-pause')

                } else {
                    if (audioElement.paused || audioElement.currentTime <= 0) {
                        audioElement.play()
                        playSong.classList.remove('fa-play')
                        playSong.classList.add('fa-pause')
                    } else {
                        audioElement.pause()
                        playSong.classList.remove('fa-pause')
                        playSong.classList.add('fa-play')
                    }
                }

                banner.style.backgroundImage = `url('./songs_cover/${song.cover}')`
            })

            // Append songDiv to currentSongs
            songOuterDiv.appendChild(songDiv);
            currentSongs.appendChild(songOuterDiv);
        }
    }

    // Call the fetch_song function to populate the by default playlist
    fetch_songs();

    //fetching singers details from singers array

    const fetch_singer = () => {
        const leftSideBar = document.querySelector('.left')
        for (let i = 0; i < Singers.length; i++) {
            const singer = Singers[i]
            const singerImg = document.createElement('div')
            singerImg.classList.add('singer', 'element')

            singerImg.style.backgroundImage = `url('./singer_cover/${singer.cover}')`

            singerImg.addEventListener('click', () => {
                fetch_songs("singer", singer.name);
            })

            const singerName = document.createElement('div')
            singerName.classList.add('singer-name')
            singerName.textContent = singer.name

            leftSideBar.appendChild(singerImg)
            leftSideBar.appendChild(singerName)
        }
    }

    fetch_singer()


    const fetch_playlists = () => {
        const rightSideBar = document.querySelector('.right')
        for (let i = 0; i < playLists.length; i++) {
            const playlist = playLists[i]
            const playlistImg = document.createElement('div')
            playlistImg.classList.add('playlist', 'element')

            playlistImg.style.backgroundImage = `url('./playlist_cover/${playlist.cover}')`

            const playlistName = document.createElement('div')
            playlistName.classList.add('playlist-name')
            playlistName.textContent = playlist.name

            rightSideBar.appendChild(playlistImg)
            rightSideBar.appendChild(playlistName)

            playlistImg.addEventListener('click', () => {
                fetch_songs("playList", playlist.name)
            })
        }
    }
    fetch_playlists()


    //event listner for play icone to play the current runnig song
    const playCurrentSong = () => {
        play.addEventListener('click', () => {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play()
                playSong.classList.remove('fa-play')
                playSong.classList.add('fa-pause')
            } else {
                audioElement.pause()
                playSong.classList.remove('fa-pause')
                playSong.classList.add('fa-play')
            }
        })

    }
    playCurrentSong()


    //event listner for forward icon to play the next song
    next.addEventListener('click', () => {
        let i = currentSongIndex + 1

        if (playlistSongs.length <= i) {
            i = 0
        }

        let songToPlay = playlistSongs[i]

        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0
            playSong.classList.remove('fa-play')
            playSong.classList.add('fa-pause')
        }

        audioElement = new Audio(`./mp3/${songToPlay.name}`)
        banner.style.backgroundImage = `url('./songs_cover/${songToPlay.cover}')`

        currentSongIndex = i

        audioElement.addEventListener('timeupdate', handleTimeUpdate)
        audioElement.play()
    })

    //event listner for backward button to play previous song
    previous.addEventListener('click', () => {
        let i = currentSongIndex - 1

        if (i < 0) {
            if (playlistSongs && i < 0) {
                i = playlistSongs.length - 1
            } else {
                i = songs.length - 1
            }
        }

        let songToPlay
        if (playlistSongs && playlistSongs.length > 0) {
            songToPlay = playlistSongs[i]
        } else {
            songToPlay = songs[i]
        }

        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0
            playSong.classList.remove('fa-play')
            playSong.classList.add('fa-pause')
        }

        audioElement = new Audio(`./mp3/${songToPlay.name}`)
        banner.style.backgroundImage = `url('./songs_cover/${songToPlay.cover}')`

        currentSongIndex = i

        audioElement.addEventListener('timeupdate', handleTimeUpdate)
        audioElement.play()
    })

    createPlaylist.addEventListener('click',()=>{
        createPlaylist.classList.toggle('create-new');
    })

});





