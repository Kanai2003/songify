// export async function getInitialSongs() {
//   const url = "https://deezerdevs-deezer.p.rapidapi.com/infos";
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "bd2953fa7emshaade930eb8139eep1138b8jsn58c6b903d648",
//       "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     },
//   };

//   const res = await fetch(url, options);
//   const data = await res.json();
//   console.log(data);
//   const initialSongs = data.tracks.map((track: any) => ({
//     id: track.id,
//     title: track.title,
//     artist: track.artist,
//     duration: track.duration,
//     url: track.preview_url,
//   }));
//   return initialSongs;
// }
