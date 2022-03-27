import React from 'react';
import '../assets/scss/Attribution.scss';
import {useSelector} from "react-redux";

const Attribution = () => {
    const {playing} = useSelector(state => state.musicReducer);
    return (
        <div className={"Attribution"}>
            
        </div>
    );
}

export default Attribution;