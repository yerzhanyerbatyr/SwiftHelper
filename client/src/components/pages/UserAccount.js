import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import TSButton from '../Button';

function User({isAuthenticated, userId, userLikedSongs}) {
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [likedSongs, setLikedSongs] = useState([]);
    const [displayedSongs, setDisplayedSongs] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
    const getURLParameter = (username) => {
      const urlParams = new URLSearchParams(location.search);
      return urlParams.get(username);
    };
    const savedUsername = getURLParameter("username");
    setUsername(savedUsername);

    // Set the liked songs and initial displayed songs
    setLikedSongs(userLikedSongs);
    setDisplayedSongs(userLikedSongs.slice(0, 3)); // Display the first three songs
    setShowMore(userLikedSongs.length > 3); // Check if there are more songs to display
  }, [location, userLikedSongs]);

  const handleShowMore = () => {
    // Display the next three songs when "More" is clicked
    const startIndex = displayedSongs.length;
    const endIndex = startIndex + 3;
    const nextSongs = likedSongs.slice(startIndex, endIndex);
    setDisplayedSongs([...displayedSongs, ...nextSongs]);
    setShowMore(endIndex < likedSongs.length);
  };

  return (
      <div className='centeredPage'>
        <h2>Hello, {username}</h2>
        <h4>You liked this songs:</h4>
            {displayedSongs.map((song, index) => (
                <a
                key={index}
                // href={song.spotifyLink} // Replace with the actual property containing the Spotify link
                target="_blank"
                rel="noopener noreferrer"
                >
                {song.songTitle}
                </a>
            ))}
            {showMore && (
                <button onClick={handleShowMore}>More</button>
            )}
        
            <TSButton 
                content={"Find \" Taylor's Version \""}
                hyperLink = {"/tv-search"}
            />
            <TSButton 
                content={"Generate a recomended song"} 
                hyperLink = {"/recommended-song"} 
            />
            <TSButton 
                content={"Get Swift's Quote of the Day"} 
                hyperLink = {"/random-quote"} 
            />
      </div>
  );
}

export default User;