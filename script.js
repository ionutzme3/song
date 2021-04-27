let term = "";
const songContainer = document.getElementById("songs");

const updateTerm = () => {
    term = document.getElementById("searchInput").value;

    if(!term || term === "" ){
        alert("please enter a search term")
    } else {
        while(songContainer.firstChild){
            songContainer.removeChild(songContainer.firstChild);
        }
        const url = (`https://itunes.apple.com/search?limit=10&media=music&term=${term}`);
    fetch(url)
    .then((response)=> response.json() )
    .then((data) => {
    // console.log(data);
    const artists = data.results;
    return artists.map(result => {
        const article = document.createElement("article");
        const artist = document.createElement("p");
        const song = document.createElement("p");
        const img = document.createElement("img");
        const audio = document.createElement("audio");
        const audioSource = document.createElement("source");

        artist.innerHTML = result.artistName;
        song.innerHTML = result.trackName;
        img.src = result.artworkUrl100;
        audioSource.src = result.previewUrl;
        audio.setAttribute("controls", "");

        article.appendChild(img);
        article.appendChild(artist);
        article.appendChild(song);
        article.appendChild(audio);
        audio.appendChild(audioSource);

        songContainer.appendChild(article);
        console.log(result);
    })
})
.catch(error => console.log('Request failed: ', error));

    }
}

const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", updateTerm);

document.addEventListener("play", event => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++){
        if(audio[i] != event.target){
            audio[i].pause();
        }
    }
}, true);

