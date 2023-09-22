import React from "react";

const AlbumCover = ({Album}) =>{
    
    const albumChoice = ({Album}) => {
        switch (Album) {
            case "Taylor Swift": 
                return (
                <div className="centeredPage">
                    <img src="https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png" alt="album cover" className="circle-img"></img>
                </div>)
            case "Fearless": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://upload.wikimedia.org/wikipedia/en/5/5b/Fearless_%28Taylor%27s_Version%29_%282021_album_cover%29_by_Taylor_Swift.png" alt="album cover" ></img>
                </div>)
            case "Speak Now": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://upload.wikimedia.org/wikipedia/en/5/5b/Taylor_Swift_-_Speak_Now_%28Taylor%27s_Version%29.png" alt="album cover" ></img>
                </div>)
            case "Red": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://upload.wikimedia.org/wikipedia/en/4/47/Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png" alt="album cover"></img>
                </div>)
            case "1989": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://media1.popsugar-assets.com/files/thumbor/6wQNj6pVCpuyHda8fPlVwuw5dHY/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/13/882/n/1922283/tmp_Pq1JjI_659330be79927d0b_GettyImages-499033840.jpg" alt="album cover" ></img>
                </div>) 
            case "Reputation":
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png" alt="album cover"></img>
                </div>) 
            case "Lover": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/22/19/taylor-swift.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp" alt="album cover"></img>
                </div>)
            case "Folklore": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://static01.nyt.com/images/2020/12/11/arts/11taylor-review-1/merlin_181083276_3c26aebc-9e18-4b14-aa94-91d4aeefb61f-jumbo.jpg?quality=75&auto=webp" alt="album cover"></img>
                </div>)
            case "Evermore": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://static01.nyt.com/images/2020/12/10/arts/10taylor-item2/10taylor-item2-jumbo.jpg?quality=75&auto=webp" alt="album cover"></img>
                </div>) 
            case "Midnights": 
                return (
                <div className="centeredPage">
                    <img className="circle-img" src="https://radyo.hacettepe.edu.tr/wp-content/uploads/2022/11/cf996da5abdd7197669d3c77594f8a73.jpg" alt="album cover"></img>
                </div>)
            default:
                return <span style={{ "fontFamily": "", "color":"black" }}> {Album} </span>
        }
    }
    return albumChoice({Album})
}

export default AlbumCover;