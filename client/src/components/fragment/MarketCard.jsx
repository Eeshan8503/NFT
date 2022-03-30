import React, {useEffect, useState} from 'react';
import '../assets/scss/MusicCard.scss';
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import {useDispatch} from "react-redux";
import {increaseTimesPlayed, setCurrentPlaying} from "../../actions/actions";
import Name from "./Name";
import {Skeleton} from "@material-ui/lab";
import Box from "@material-ui/core/Box";

function MusicCard(props) {
    const {name, img, author_name} = props.music;

    const [isHovered, setHovered] = useState(false);

    function handleResponse() {
        setHovered(!isHovered);
    }

    const dispatch = useDispatch();

    function handlePlay() {
        dispatch(setCurrentPlaying(props.music))
        dispatch(increaseTimesPlayed(props.music.id));
    }

    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        setLoaded(true)
    },[]);

    return (
        <div className={"music-card"}>
            {
                !loaded ?
                <div className={"Skeleton-top"}>
                    <Skeleton variant="rect" width={210} height={210} />
                    <Box pt={0.5}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                </div>
                    :
                    <>
                        <div onClick={handlePlay}  className={"music-card-cover"} onMouseOver={handleResponse}>
                            <img src={require("../assets/img/" + img).default} alt={name}/>
                            <div className="play-circle">
                                <PlayCircleFilledWhiteIcon/>
                            </div>
                        </div>
                        <React.Fragment>
                            <div style={{display:'flex'}}>
                            <div style={{width:'50%'}}>
                            <Name name={name} className={"song-name"} length={name.length}/>
                            <Name name={author_name} className={"author-name"} length={author_name.length}/>
                            </div>
                            <div style={{display:'flex',marginLeft:'15%',width:'50%',height:'50%'}}>
                            <div style={{marginTop:'12%'}}>
                            <Name name={props.price} className={"author-name"} length={props.price.length}/>
                            </div>
                            <img style={{transform:'scale(0.5)'}}src="https://img.icons8.com/fluency/48/000000/ethereum.png" alt="eth icon"/>
                            </div>
                            </div>
                        </React.Fragment>
                    </>
            }


        </div>
    );
}

export default MusicCard;