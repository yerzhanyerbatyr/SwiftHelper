import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingImg from '../LoadingImg';
import AlbumIntro from '../AlbumIntro';
import AlbumCover from '../AlbumCover';
import Button from '../Button';

const GetSong = () => {
  const texts = ["Looks like you need to hear", "This is the perfect time to listen to", "Hey! You should listen to", "Taylor said you need to hear this", "This one is definitely fans favourite", "Imagine this as your surprise song"];
  const ranText = texts[Math.floor(Math.random() * 6)];
  const [jsonData, setJsonData] = useState(null);
  const [details, setDetails] = useState({
    tSong: null,
    tAlbum: null
  })

  useEffect(()=> {
      fetchJsonData();
  }, []);
    
  const fetchJsonData = async() => {
        try {
            var response = await axios.get(`https://taylorswiftapi.onrender.com/get`);
            while ((response.data.album === "Taylor Swift" || response.data.album === "Reputation" || response.data.album === "1989")) {
              response = await axios.get(`https://taylorswiftapi.onrender.com/get`);
            }
            setJsonData(response.data);
            setDetails(() => {
              return{
              tSong : response.data.song,
              tAlbum : response.data.album
              }
            })
        } catch (err) {
            console.log(err);
        }
    }
  
    
  return (<div>
        {jsonData ? (
          <div className='centeredPage'>
            <AlbumCover Album = {details.tAlbum}></AlbumCover>
            <div className='centeredPage centeredDiv'>
              <h2>{ranText}</h2>
              <h1>"{details.tSong}"</h1>
              <h2>From <AlbumIntro Album = {details.tAlbum}></AlbumIntro></h2>
              <div className='button-flex'>
                <Button content={"Get another song"} tFunction = {fetchJsonData}></Button>
                <Button content={"Listen now"} hyperLink={"/song?name="+details.tSong} ></Button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingImg></LoadingImg>
        )}
      </div>);
};

export default GetSong;