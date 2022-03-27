import React from 'react';
import './css/About.scss';
import Container from "../fragment/Container";
import Developer from "../fragment/Developer";
import Attribution from "../fragment/Attribution";
import { IconButton } from '@material-ui/core';
import { Brightness3 } from '@material-ui/icons';

const About = () => {
    return (
        <Container>
            <div className={"About"}> 
                <Developer/>
                <Attribution/>
            </div>
        </Container>
    );
}

export default About;
