require('dotenv').config();

const ARTIST_ID = "06HL4z0CvFAxyc27GXpf02";
const CLIENT_ID = process.env.SPOTIFY_CLIENTID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENTSECRET;

getSpotyToken = async() => {
    try {
        var authParameters = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }
        const result = await fetch('https://accounts.spotify.com/api/token', authParameters);
        const data = await result.json();
        return(data.access_token);
    } catch (error) {
        return ("Server error: could not get Spotify Token " + error);
    }
}
songIDSearch = async(songName) => {
    const SPOTIFY_TOKEN = await getSpotyToken();
    var songParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ SPOTIFY_TOKEN
        }
    }
    var songIDSpoty = await fetch('https://api.spotify.com/v1/search?q='+songName+'&type=track',songParams)
      .then(response=>response.json())
      .then(data => {
        for (var i = 0; i < 20; i++){
          if (data.tracks.items[i].artists[0].id === ARTIST_ID){
            return data.tracks.items[i];
          }
        }
    });
    return songIDSpoty
}

exports.getSongByName = async(songName)=>{
    try {
        const songDetails = await songIDSearch(songName);
        const songLink = songDetails.external_urls.spotify
        return songLink
    } catch (error) {
        return error
    }
}

exports.getSong = async(req,res)=>{
    const {name} = req.params;
    try {
        const songDetails = await songIDSearch(name);
        res.status(200).json(songDetails);
    } catch (error) {
        res.status(500).json({message: "Server error: could not get all expenses to database"});
    }
}
