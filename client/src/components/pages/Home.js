import TSButton from '../Button';

function Home() {
  return (
      <div className='centeredPage'>
        {/* <img className='gifWidth' src='https://media.tenor.com/eDS3gwyklJAAAAAC/waving-ciao.gif'></img> */}
        <img className='gifWidth' src='https://media.tenor.com/LspcOZxgrawAAAAd/taylor-swift-heart.gif'></img>
            <TSButton 
                content={"Find \" Taylor's Version \""}
                hyperLink = {"/tv-search"}
            />
            <TSButton 
                content={"Generate a random song"} 
                hyperLink = {"/random-song"} 
            />
            <TSButton 
                content={"Get Swift's Quote of the Day"} 
                hyperLink = {"/random-quote"} 
            />
      </div>
  );
}

export default Home;