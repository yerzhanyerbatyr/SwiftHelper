import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingImg from '../LoadingImg';
import AlbumIntro from '../AlbumIntro';
import AlbumCover from '../AlbumCover';
import Button from '../Button';

const GetQuote = () => {
    const [jsonData, setJsonData] = useState(null);
    const [details, setDetails] = useState({
      tQuote: null,
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
            console.log("Oops я словил не ее альбом " + response.data.album );
            response = await axios.get(`https://taylorswiftapi.onrender.com/get`);
          }
          setJsonData(response.data);
          setDetails(() => {
            return{
            tQuote: response.data.quote,
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
            <h1>Welcome to <AlbumIntro Album = {details.tAlbum}></AlbumIntro> era </h1>
            {/* <AlbumIntro Album = {"Folklore"}></AlbumIntro> */}
            <div className='centeredPage centeredDiv'>
            <h2>Your Quote for today:</h2>
            <h1>"{details.tQuote}"</h1>
            <h2>From "{details.tSong}"</h2>
            <div className='button-flex'>
                <Button content={"Get other quote"} tFunction = {fetchJsonData}></Button>
                <Button content={"Listen to full lyrics"} hyperLink={"/song?name="+details.tSong} ></Button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingImg></LoadingImg>
        )}
      </div>);
};

export default GetQuote;