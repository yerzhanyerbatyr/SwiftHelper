import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import AlbumIntro from "../AlbumIntro";
import LoadingImg from "../LoadingImg";
import AlbumCover from "../AlbumCover";
import Button from '../Button';
import { QRCode } from 'react-qrcode-logo';
import axios from "axios";

const BASE_URL ='http://localhost:5000/api/v1/'

const SongPage = ({isAuthenticated, userId, userLikedSongs}) => {
  const location = useLocation();
  const [songName, setSongName] = useState('');
  const [fullSongName, setFullSongName] = useState('');
  const [spotyLink, setSpotyLink] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [songId, setSongId] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState();
  
  //getting song name from the URL
  useEffect(() => {
    const getURLParameter = (name) => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get(name);
    };
    const savedSongName = getURLParameter('name');
    setSongName(savedSongName);
  }, [location]);

  //searching for songs
  useEffect(()=>{
    if (songName) {
      doFunction()
      spotySearch();
    }
  },[songName]);

  const doFunction = async() =>{
    if (songName) {
      await getSongId();
    }
  }

  const addToFavorites = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post(`http://localhost:5000/user/${userId}/addSong/${encodeURIComponent(songName)}`);
      const response = await axios.post(`http://localhost:5000/user/${userId}/addSong/${fullSongName}`);
      if (response.status === 200) {
        console.log('Song added to favorites');
        setIsAdded(true);
        setIsLiked(true);
      } else {
        // Handle other status codes or errors
        setIsLiked(false);
        console.error('Failed to add the song to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/${userId}/deleteSong/${songId}`);
      if (response.status === 200) {
        setIsRemoved(true);
      }
    } catch (error) {
      console.error('Error removing song:', error);
    }
  };

  const getSongId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}/likedSongs/check/${encodeURIComponent(songName)}`);
      if (response.status === 200) {
        const check = response.data;
        setIsLiked(check.songExists);
        if (check.songExists === true){
          setSongId(check.songId)
        }
      } else {
        console.error('Failed to add the song to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(userId, isLiked, songId);


  async function spotySearch () {
    var response = await axios.get(`${BASE_URL}random-song/${songName}`)
      .then(fullData => {
            // console.log(fullData);
            setSpotyLink(fullData.data.external_urls.spotify);
            setAlbumName(fullData.data.album.name);
            setFullSongName(fullData.data.name);
            // console.log(fullData.data.album.name);
          })
  }

  function pageSetUp(albumName){
    albumName = albumName.charAt(0).toUpperCase() + albumName.slice(1);
    if (albumName.includes('1989')) albumName = "1989";
    else if (albumName.includes('olklore')) albumName = "Folklore";
    else if (albumName.includes('vermore')) albumName = "Evermore";
    else if (albumName.includes('over')) albumName = "Lover";
    else if (albumName.includes('Midnights')) albumName = "Midnights";
    else if (albumName.includes('Red')) albumName = "Red";
    else if (albumName.includes('Fearless')) albumName = "Fearless";
    else if (albumName.includes('Speak')) albumName = "Speak Now";
    else if (albumName.includes('Reputation')) albumName = "Reputation";
    else if (albumName.includes('Taylor Swift')) albumName = "Taylor Swift";
    else albumName = albumName;

    if (albumName === 'Folklore' || albumName === 'Evermore' || albumName === 'Lover' || albumName === 'Midnights'){
      return (
        <div className="centeredDiv songPage gapped">
          <AlbumCover Album={albumName}/>
          <h2 >Welcome to <AlbumIntro Album={albumName}></AlbumIntro> era </h2>
          <h2 >This era and album already belongs to Taylor Swift, enjoy listening to</h2>
          <h1 >"{fullSongName}"</h1>
          <div className="button-flex">
            <div>
              {spotyLink && <QRCode value={spotyLink} bgColor="transparent" size="120"/>}
              <h3>Listen on
                <a style={{color : "#1DB954"}} href={spotyLink}> Spotify </a>
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Logo"
                style={{ height: '1em', width: 'auto', marginRight: '0.2em', marginBottom: '-0.1em'}}
                />
                </h3>
            </div>
          </div>
        </div>
      )
    } else if (albumName.includes('1989') || albumName === 'Reputation' || albumName === 'Taylor Swift'){
      return (
        <div className="centeredDiv songPage gapped">
          <AlbumCover Album={albumName}/>
          <h2 >Welcome to <AlbumIntro Album={albumName}></AlbumIntro> era </h2>
          <h1 >"{fullSongName}"</h1>
          <h2 >Ooops... Unfortunately Taylor has not re-recorded this album yet. Check her social medias for updates, but now listen to another Swift's song!</h2>
          <Button
            content={"Get a song to listen"}
            hyperLink={"/random-song"}
          />
        </div>
      )
    } else if (albumName ==='Red' || albumName === 'Fearless' || albumName === 'Speak Now'){
      return (
        <div className="centeredDiv songPage gapped">
          <AlbumCover Album={albumName}/>
          <h3 >Welcome to <AlbumIntro Album={albumName.replace(`(Taylor's Version)`, '')}></AlbumIntro> era </h3>
          <h3 >Taylor Swift re-recorded this song so you can enjoy listening to</h3>
          <h1 >"{fullSongName}"</h1>
          <div className="button-flex">
            <div>
              {spotyLink && <QRCode value={spotyLink} bgColor="transparent" size="120"/>}
              <h3>Listen on
                <a style={{color : "#1DB954"}} href={spotyLink}> Spotify </a>
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Logo"
                style={{ height: '1em', width: 'auto', marginRight: '0.2em', marginBottom: '-0.1em'}}
                />
                </h3>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="centeredDiv songPage gapped">
          <img src="https://fil.kz/wp-content/uploads/2023/03/taylor-swift@2000x1270-1024x650.jpg" className="circle-img"/>
          <h3 >This is a single from Taylor, enjoy</h3>
          <h1 >"{fullSongName}"</h1>
          <div className="button-flex">
            <div>
              {spotyLink && <QRCode value={spotyLink} bgColor="transparent" size="120"/>}
              <h3>Listen on
                <a style={{color : "#1DB954"}} href={spotyLink}> Spotify </a>
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Logo"
                style={{ height: '1em', width: 'auto', marginRight: '0.2em', marginBottom: '-0.1em'}}
                />
                </h3>
            </div>
          </div>
        </div>
      )
    }
  }

  function notHerSong(){
    return (
      <div className="centeredDiv songPage gapped">
        <img src="https://cdn.vox-cdn.com/thumbor/euBgUuEFJTVZn-x0y1awQrRqfPQ=/0x0:2040x1358/920x613/filters:focal(726x438:1052x764):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/50152317/taylorswifthumble.0.jpg" className="circle-img"/>
        <h1 >Oops... looks like this is not a Taylor's song</h1>
        <h2 >Please check your spelling, or get a new song to listen now</h2>
        <Button
            content={"Get a song to listen"}
            hyperLink={"/random-song"}
          />
      </div>
    )
  }

  
  return (
  <div>
    {albumName !== '' ? ( fullSongName ? (
      <div className='centeredPage'>
        {pageSetUp(albumName)}
        <h3>
            {isAuthenticated ? (
                  isRemoved ? (
                    'Song removed from favorites'
                  ) : isAdded ? (
                    'Song added to favorites'
                  ) : isLiked ? (
                    <a onClick={removeFromFavorites}>
                      {/* <a href="#!"> */}
                      Remove from favorites
                    </a>
                  ) : (
                    <a onClick={addToFavorites}>
                      📌Add to favorites
                    </a>
                  )
                ) : (
                  <span>You must be<a href="/login" style={{color:"black"}}> logged in</a> to add/remove favorites</span>
                )}
              </h3>
      </div>
    ) : (
      <LoadingImg></LoadingImg>
    )) : 
      <LoadingImg></LoadingImg>
    }
  </div>
  );
};

export default SongPage;