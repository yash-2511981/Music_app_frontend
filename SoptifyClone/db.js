export const songs = [
    { name: "Kaleshi Chori.mp3", composer: "Dg Immortals,Raga,Hajras Hajarayi", cover: "KALESHI-CHORI.jpg", singer: "DgImmortals" ,playlist: "workout"},
    { name: "Millionaire Glory.mp3", composer: "Honey Singh", cover: "millinior.jpg", singer: "Honey Singh",playlist: "workout" },
    { name: "Suniyan Suniyan.mp3", composer: "Juss,MixSingh", cover: "Suniyan-Suniyan.jpg", singer: "MixSingh",playlist: "workout" },
]

export const Singers = [
    { name: "Arijit Singh", cover: "ArjithSingh.jpg" },
    { name: "Sonu Nigam", cover: "SonuNigam.jpg" },
    { name: "Shreya Ghoshal", cover: "ShreyGhoshal.jpg" },
    { name: "Honey Singh", cover: "HoneySIngh.jpg" },
]

export const playLists = [
    {name :"Workout",cover:"GymPlaylist.jpg"},
    {name :"Alone",cover:"Alone.jpg"},
    {name :"Party Songs",cover:"PartySong.jpg"},
    {name :"Love Mashups",cover:"Ishq.jpg"},
]

export const newPlaylist = [
    {name:""},
]
export const fetchSongs = (plylistName)=>{
    const playlistSongs = songs.map(song=> {
        if(song.playList.toLocaleLowerCase() === plylistName.toLocaleLowerCase()){
            return song;
        }

    })
    return playlistSongs
}
