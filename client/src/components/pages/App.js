import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Home from './Home';
import About from './About';
import GetTV from './GetTV';
import GetSong from './GetSong';
import GetQuote from './GetQuote';
import SongPage from './SongPage';
import Login from './LogIn';
import Register from './Register';
import User from './UserAccount';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize as false
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [likedSongs, setLikedSongs] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    const getUserAndCheckAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", { withCredentials: true });
        const userData = response.data;
  
        if (userData.username) {
          setUsername(userData.username);
          setId(userData.id);
          setIsAuthenticated(true);
          setLikedSongs(userData.likedSongs);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // console.error(error);
      }
    };
  
    if (!isAuthenticated) {
      getUserAndCheckAuth(); // Initial check when the component mounts
      const intervalId = setInterval(() => {
        getUserAndCheckAuth(); // Periodically check every second or as needed
      }, 1000);
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated]);
  

  const BASE_URL ='http://localhost:5000/api/v1/'

  return (
    <div className="App">
      <Header
        title={"SwiftHelper: Swifties Best Site"}
        isAuthenticated={isAuthenticated}
        username={username}
      />
      <Routes>
        <Route path="/" element = {<Home></Home>}></Route>
        <Route path="/about" element = {<About></About>}></Route>
        <Route path="/tv-search" element = {<GetTV></GetTV>}></Route>
        <Route path="/random-song" element = {<GetSong></GetSong>}></Route>
        <Route path="/random-quote" element = {<GetQuote></GetQuote>}></Route>
        <Route path="/song" element = {<SongPage isAuthenticated={isAuthenticated} userId={id} userLikedSongs={likedSongs}></SongPage>}></Route>
        <Route path="/login" element = {<Login></Login>}></Route>
        <Route
          path="/account"
          element={<User isAuthenticated={isAuthenticated} userId={id} userLikedSongs={likedSongs}></User>}
        />
        <Route path="/register" element = {<Register></Register>}></Route>

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
