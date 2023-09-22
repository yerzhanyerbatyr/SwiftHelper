import React, {useState} from 'react';
import AlbumIntro from '../AlbumIntro';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const GetTV = () => {
  const navigate  = useNavigate();
  const [songName, setSongName] = useState("");

  return (
    <div className='centeredPage'>
      <div className='centeredDiv'>
        <img className='gifWidth' src='https://media.tenor.com/xijWJmIsMuUAAAAM/taylor-swift-delicate.gif'></img>
        <form>
          <div className="col-12">
            <input className="textbox-12" 
              type="text" 
              placeholder="Which song are you going to listen?"
              onKeyDown={event => {
                if (event.key == 'Enter'){
                  event.preventDefault();
                  navigate(`/song?name=`+songName+``);
                }
              }}
              onChange={(event => {
                setSongName(event.target.value);
              })}
              />
            <span className="focus-border-12"></span>
          </div>
          <Button
            content={"Find (Taylor's Version)"}
            hyperLink={"/song?name="+songName}/>
        </form>
        <h4 style={{"margin-top":"45px"}}>*Taylor started re-recording her first six albums in 2021. Now she owns <AlbumIntro Album={'Speak Now'}></AlbumIntro><AlbumIntro Album={'Fearless'}></AlbumIntro> and <AlbumIntro Album={'Red'}></AlbumIntro>. Learn more about the reason of re-recordings <a style={{"color":'black'}} href='https://en.wikipedia.org/wiki/Taylor_Swift_masters_controversy'>here</a>. <br></br> Enter the name of a song you want to listen in Taylor's Version!
          </h4>
      </div>
    </div>
  );
};

export default GetTV;