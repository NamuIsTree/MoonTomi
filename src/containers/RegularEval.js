import React from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import './RegularEval.css'

class RegularEval extends React.Component {
    state = {
        isLoading: true,
        albums: [],
        comments: [],
        album_id: 0,
        album_artist: '',
        album_genre: '',
        album_name: '',
        album_nation: '',
        album_year: 0,
        targetAlbum: [],
        targetComments: [],
    }

    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        if (event.target.value > this.state.albums.length) event.target.value = this.state.albums.length;
        if (event.target.value < 1) event.target.value = 1;

        var name, artist, genre, nation, year;

        this.state.albums.map(album => {
            if (album.id === parseInt(event.target.value)) {
                name = album.name;
                artist = album.artist;
                genre = album.genre;
                nation = album.nation;
                year = album.year;
            }
        })

        console.log(name);

        this.setState({
            album_id: event.target.value,
            album_name: name,
            album_artist: artist,
            album_genre: genre,
            album_nation: nation,
            album_year: year
        });
    }

    getData = async () => {
        const album = await axios('http://moonmusic.duckdns.org:8081/api/albums/all');
        const comment = await axios('http://moonmusic.duckdns.org:8081/api/comments');

        this.setState({
            isLoading: false,
            album_id: album.data.length,
            album_name: album.data[album.data.length - 1].name,
            album_artist: album.data[album.data.length - 1].artist,
            album_genre: album.data[album.data.length - 1].genre,
            album_nation: album.data[album.data.length - 1].nation,
            album_year: album.data[album.data.length - 1].year,
            albums: album.data,
            comments: comment.data
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {isLoading, album_id, albums, comments} = this.state;
        const imgsrc = "http://moonmusic.duckdns.org/images/" + album_id + ".jpg";

        console.log(this.state);

        return (
            <div className="regular-evaluation">
                {isLoading ? (
                    <div className="loader">
                        Loading Data...
                    </div>
                ) : (
                    <div className="regular-evaluation-container">
                        <div className="regular-evaluation-title">
                            <TextField
                                type="number"
                                value={album_id}
                                className="regular-evaluation-count"
                                inputProps={{
                                    pattern: '[0-9]*'
                                }}
                                name="album_id"
                                onChange={this.handleValueChange}
                            />
                            회 정기 음평회 <br/>
                        </div>
                        <div className="evaluation-album-title">
                            {this.state.album_name}
                        </div>
                        <div className="evaluation-album-artist">
                            [{this.state.album_artist}]의 {this.state.album_year}년도 앨범
                        </div>
                        <div className="album-information">
                            <div className="regular-evaluation-image">
                                <img src={imgsrc} alt="album cover"/>
                            </div>
                            <div className="regular-evaluation-list">
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default RegularEval;