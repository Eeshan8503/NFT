import React from "react"
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from "./MarketCard";
import {useSelector} from "react-redux";
import Container from "./Container";

function MarketCard() {
    const {playlists} = useSelector(state => state.musicReducer);
    return (
        <Container>
            <div className={"music-card-container"}>
                {
                    playlists.map(item => (
                        <MusicCard key={item.id} music={item} price="10ETH"/>
                    ))
                }
            </div>
        </Container>
    );
}

export default MarketCard;
