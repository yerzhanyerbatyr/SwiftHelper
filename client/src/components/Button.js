import React from "react";
import {Link} from 'react-router-dom';

const TSButton = ({content, hyperLink, tFunction, tWidth = '350px'}) => {
    return ( <div>
    <Link className="button-TV" to = {hyperLink} onClick={tFunction} style={{"width":{tWidth}}} >{content}</Link>
    </div>)
}

export default TSButton;