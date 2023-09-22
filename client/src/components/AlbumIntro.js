import React from "react";

const AlbumIntro = ({Album}) =>{
    const albumChoice = ({Album}) => {
        switch (Album) {
            case "Taylor Swift": 
                return (<span style={{ "fontFamily": "'Satisfy', cursive", "color":"#20acc5" }}> Taylor Swift </span>)
            case "Fearless": 
                return (<span style={{ "fontFamily": "'Archivo', sans-serif", "color":"#a77d41" }}> FEARLESS (Taylor's Version) </span>)
            case "Speak Now": 
                return (<span style={{ "fontFamily": "'Rochester', cursive", "color":"#8300a5" }}> Speak Now (Taylor's Version) </span>)
            case "Red": 
                return (<span style={{ "fontFamily": "'Oswald', sans-serif", "color":"#9c1b15" }}> RED (Taylor's Version) </span>)
            case "1989": 
                return (<span style={{ "fontFamily": "'Permanent Marker', cursive", "color":"#3b414f" }}> {Album} </span>) 
            case "Reputation":
                return (<span style={{ "fontFamily": "'UnifrakturCook', cursive", "color":"#333333" }}> {Album} </span>) 
            case "Lover": 
                return (<span style={{ "fontFamily": "'Satisfy', cursive", "color":"#eaadd6" }}> {Album} </span>)
            case "Folklore": 
                return (<span style={{"fontFamily": "'IM Fell DW Pica', serif", "color":"#abaaaa" }}> folklore </span>)
            case "Evermore": 
                return (<span style={{ "fontFamily": "'IM Fell DW Pica', serif", "color":"#7f3c10" }}> evermore </span>) 
            case "Midnights": 
                return (<span style={{ "fontFamily": "'Space Grotesk', sans-serif", "color":"#4e4466" }}> {Album} </span>)
            default:
                return <span style={{ "fontFamily": "", "color":"black" }}> {Album} </span>
        }
    }
    // const albumChoice = ({Album}) => {
    //     switch (Album) {
    //         case "Taylor Swift": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Satisfy', cursive", "color":"#20acc5" }}> Taylor Swift </span> era </h1>
    //             </div>)
    //         case "Fearless": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Archivo', sans-serif", "color":"#a77d41" }}> FEARLESS (Taylor's Version) </span> era </h1>
    //             </div>)
    //         case "Speak Now": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Rochester', cursive", "color":"#8300a5" }}> Speak Now (Taylor's Version) </span> era </h1>
    //             </div>)
    //         case "Red": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Oswald', sans-serif", "color":"#9c1b15" }}> RED (Taylor's Version) </span> era </h1>
    //             </div>)
    //         case "1989": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Permanent Marker', cursive", "color":"#3b414f" }}> {Album} </span> era </h1>
    //             </div>) 
    //         case "Reputation":
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to  <span style={{ "fontFamily": "'UnifrakturCook', cursive", "color":"#333333" }}> {Album} </span> era </h1>
    //             </div>) 
    //         case "Lover": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Satisfy', cursive", "color":"#eaadd6" }}> {Album} </span> era </h1>
    //             </div>)
    //         case "Folklore": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{"fontFamily": "'IM Fell DW Pica', serif", "color":"#abaaaa" }}> folklore </span> era </h1>
    //             </div>)
    //         case "Evermore": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'IM Fell DW Pica', serif", "color":"#7f3c10" }}> evermore </span> era </h1>
    //             </div>) 
    //         case "Midnights": 
    //             return (
    //             <div className="centeredPage">
    //                 <h1>Welcome to <span style={{ "fontFamily": "'Space Grotesk', sans-serif", "color":"black" }}> {Album} </span> era </h1>
    //             </div>)
    //         default:
    //             return <span style={{ "fontFamily": "", "color":"black" }}> {Album} </span>
    //     }
    // }
    return albumChoice({Album})
}

export default AlbumIntro;