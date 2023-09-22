import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingImg from '../LoadingImg';
import AlbumIntro from '../AlbumIntro';
import AlbumCover from '../AlbumCover';
import Button from '../Button';

const BASE_URL = 'http://localhost:5000/api/v1/';

const RecomSong = ({userId}) => {
  const text = ["Based on your liked songs, you might wanna listen to"];
  const [details, setDetails] = useState({
    tSong: null,
    tAlbum: null
  });
  const [songName, setSongName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}/recommendSong`);
        if (response.status === 200) {
          setSongName(response.data.recommendedSong);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (songName && !loading) {
      spotySearch();
    }
  }, [songName, loading]);

  async function spotySearch() {
    try {
      const response = await axios.get(`${BASE_URL}random-song/${songName}`);
      console.log(response.data);
      setDetails({
        tSong: response.data.name,
        tAlbum: response.data.album.name
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {loading ? (
        <LoadingImg />
      ) : (
        <div className='centeredPage'>
          <AlbumCover Album={details.tAlbum}></AlbumCover>
          <div className='centeredPage centeredDiv'>
            <h2>{text}</h2>
            <h1>"{details.tSong}"</h1>
            <h2>From <AlbumIntro Album={details.tAlbum}></AlbumIntro></h2>
            <div className='button-flex'>
              <Button content={"Listen now"} hyperLink={"/song?name=" + details.tSong} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecomSong;
