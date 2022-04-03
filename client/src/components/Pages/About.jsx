import React,{useState} from 'react';
import './css/About.scss';
import './css/about.css';
import Container from "../fragment/Container";
import Developer from "../fragment/Developer";
import Attribution from "../fragment/Attribution";
import { IconButton } from '@material-ui/core';
import { Brightness3 } from '@material-ui/icons';
import process from 'process'
import minimist from 'minimist'
import Loader from '../fragment/Loader';
import web3Api from '../../provider/web3/Web3Provider';

// import { getFilesFromPath } from 'web3.storage'
import { Web3Storage,getFilesFromPath } from 'web3.storage/dist/bundle.esm.min.js'
const About = () => {
    const [loader, setloader] = useState(false);
    async function main (e) {
        e.preventDefault();
        console.log(e)
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY0NTQ5NEIyM2YyRjU2QmEwNTljRDQzZjg4ZTA5RUMwMTQ4YWJFMkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDgzODU3ODY5MzQsIm5hbWUiOiJNUDMifQ.FnhG2qsrOFEa24uwW7LGKnSw7rVaf3_E9dLDpy1Hr-A'
      
        if (!token) {
          return console.error('A token is needed. You can create one on https://web3.storage')
        }
            
        const storage = new Web3Storage({ token })
        const files = []
      
        files.push(e.target.files[0]);
      
        console.log(`Uploading ${files.length} files`)
        setloader(true);
        const cid = await storage.put(files)
        setloader(false);
        console.log('Content added with CID:', cid)
        alert("Upload Successfull")
      }
      
    const handleMint = () => {
        console.log(web3Api.contracts.musicContract);
    }

    return (
        <Container>
            <div className={"About"}> 
            <Loader display={loader}/>
            <div className= "upload" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <h1 style={{marginTop:'3%',fontSize:'2.8em'}}>Upload your Own Music</h1>
                <br/>
                <form>
                    <label>Song Name</label><br/>
                    <input className='text' type={'text'} placeholder='Song name'/><br/>
                    <label>Choose your Audio File</label><br/>
                    <input className='file' type={'file'} onChange={main}/>
                    <br/>
                    <label>Choose your Cover Image</label><br/>
                    <input className='file' type={'file'} onChange={main}/>
                    </form>
                     <button className='button btn-lg' onClick={handleMint}>mint</button>      
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </Container>
    );
}

export default About;
