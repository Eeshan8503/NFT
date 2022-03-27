import React from 'react';
import '../assets/scss/Developer.scss';
import {IconButton} from "@material-ui/core";
import AvatarImage from "../assets/img/avatar.jpg";
import {Facebook, Instagram, LinkedIn, Portrait, Twitter} from "@material-ui/icons";

const Developer = () => {
    return (
        <div className={"Developer"}>
            <h3 className={"Developer-head"}>Welcome To MP3</h3>
            <div className="Developer-profile">
                
                <div className="Developer-profileDetails">
                    <p>A Decentralized Music Streaming App</p>
                    
                    </div>
            </div>
        </div>
    );
}

export default Developer;