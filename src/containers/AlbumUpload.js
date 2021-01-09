import React from 'react';
import axios from 'axios';

//material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import './AlbumUpload.css'

class AlbumUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            artist: "",
            genre: 0,
            nation: "",
            year: 0,
            volume: 0
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleValueChange(event) {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.addAlbum()
        .then((response) => {
            console.log(response);
        })

        document.location.href = '/upload';
    }

    addAlbum = async () => {
        const {name, artist, genre, nation, year, volume} = this.state;
        const url = 'http://moonmusic.duckdns.org:8081/api/upload';
        const obj = {
            name: name,
            artist: artist,
            genre: genre,
            nation: nation,
            year: year,
            volume: volume,
            rating: 0
        };

        const response = await axios.post(url, obj);
    }

    render() {
        return (
            <div className="album-upload-container">
                <center>
                    <div className="album-upload-title">
                        앨범 업로드
                    </div>
                    <div className="album-upload-detail">
                        새 앨범을 업로드하는 곳입니다. <br/>
                        장르 [ 1:POP, 2:R&B/Soul, 3:Rock, 4:J-POP, 5:Jazz, 6:HipHop, 7:Electronic, 8:Others ] <br/>
                        ex) Rock · POP = 31 <br/>
                    </div>
                    <form onSubmit = {this.handleFormSubmit}>
                        <TextField type="text" id="standard-basic" label="앨범 이름" name="name" onChange={this.handleValueChange}/> <br/> <br/>
                        <TextField type="text" id="standard-basic" label="아티스트 이름" name="artist" onChange={this.handleValueChange}/> <br/> <br/>
                        <TextField type="number" id="standard-basic" label="장르" name="genre" onChange={this.handleValueChange}/> <br/> <br/>
                        <TextField type="text" id="standard-basic" label="국가" name="nation" onChange={this.handleValueChange}/> <br/> <br/>
                        <TextField type="number" id="standard-basic" label="출시 연도" name="year" onChange={this.handleValueChange}/> <br/> <br/>
                        <TextField type="number" id="standard-basic" label="Volume" name="volume" onChange={this.handleValueChange}/> <br/> <br/>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className="upload-button"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            Upload
                        </Button>
                    </form>
                </center>
            </div>
        );
    }
}

export default AlbumUpload;