import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"

function ShowAlbum ({index, id, name, artist, rating}) {
    const imgsrc = "http://moonmusic.duckdns.org/images/" + id + ".jpg";
    var rankColor;
    if (index == 1) {
        rankColor = '#ff0000';
    }
    else if (index == 2) {
        rankColor = '#ff3333';
    }
    else if (index == 3) {
        rankColor = '#ff6666';
    }
    else {
        rankColor = '#ff9999';
    }
    
    if (artist)

    return (
        <div className="HOF-album">
            <div className="HOF-album-ranking"
                 style = {{
                     color: rankColor
                 }}> {index}위 : {rating}
            </div>
            <img src={imgsrc} alt={name}/>
            <div className="HOF-album-name">
                {name}
            </div>
            <div className="HOF-album-artist">
                {artist}
            </div>
        </div>
    );
}

class Home extends React.Component {
    state = {
        isLoading: true,
        albums : [],
        rlbums : []
    }

    getAlbums = async () => {
        var url = "http://moonmusic.duckdns.org:8081/api/albums";
        var albums = await axios.get(url);
        albums.data.sort(function(a, b) {
            return b.rating - a.rating;
        });
        this.setState({albums: albums.data.slice(0, 10), 
                       rlbums: albums.data.slice(-10).reverse(),
                       isLoading: false});
    }

    componentDidMount() {
        this.getAlbums();
    }

    constructor(props) {
        super(props);

        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    render() {
        const settings = {
            className: "album-container",
            centerMode: true,
            dots: true,
            centerPadding: "60px",
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            focusOnSelect: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 2300,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
        
        const {isLoading, albums, rlbums} = this.state;
        var order = 1;
        var rrder = 1;
        return (
            <section className="container">
                <div className="page_title">
                    <center>
                    <div className="HOF-title">
                        <img src="http://moonmusic.duckdns.org/images/m_logo.png" alt="m_logo"/>
                        명예의 전당
                    </div>
                    <div className="HOF-albums">
                        <Slider {...settings}>
                            {albums.map(album => (
                                <ShowAlbum 
                                    key = {order}
                                    index = {order++}
                                    id = {album.id}
                                    name = {album.name}
                                    artist = {album.artist}
                                    rating = {album.rating}
                                />
                            ))}
                        </Slider>
                    </div>
                    <br></br>
                    <div className="ROF-title">
                        <img src="http://moonmusic.duckdns.org/images/m_logo.png" alt="m_logo"/>
                        불명예의 전당
                    </div>
                    <div className="rlbums">
                    <Slider {...settings}>
                            {rlbums.map(album => (
                                <ShowAlbum 
                                    key= {rrder}
                                    index = {rrder++}
                                    id = {album.id}
                                    name = {album.name}
                                    artist = {album.artist}
                                    rating = {album.rating}
                                />
                            ))}
                        </Slider>
                    </div>
                    </center>
                </div>
            </section>
        );
    }
};

export default Home;