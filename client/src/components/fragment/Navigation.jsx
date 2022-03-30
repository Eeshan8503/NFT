import React, {useContext, useState} from "react";
import '../assets/scss/Navigation.scss';
import SearchBar from "./SearchBar";
import Brand from "./Brand";
import { IconButton } from "@material-ui/core";
import {ThemeContext} from "../../theme";
import { Brightness3 } from "@material-ui/icons";
import { Link } from "react-router-dom";
import SideBarRight from "./SideBarRight"

function Navigation() {
    const useStyle = useContext(ThemeContext);
    return (
        <nav style={useStyle.component}>
            <Brand />
            <div className={"navigation"}>
            </div>
            <SearchBar />
            <div className="Dark-mode">
                <IconButton >
                    <Brightness3 />
                </IconButton>
            </div>
            <SideBarRight />
            <Link to="/home/profile">
                <div className="Profile">
                    <img src="https://img.icons8.com/fluency/96/000000/cat-profile.png" width="40px" alt=""/>
                </div>
            </Link>
        </nav>
    );
}

export default Navigation;