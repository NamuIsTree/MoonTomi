import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"

function ShowAlbum ({index, id, name, artist, rating}) {
    const imgsrc = "url(http://moonmusic.duckdns.org/images/" + id + ".jpg)";
    var trophy;
    var rankColor;
    if (index == 1) {
        trophy = "http://moonmusic.duckdns.org/images/gold.png";
    }
    else if (index == 2) {
        trophy = "http://moonmusic.duckdns.org/images/silver.png";
    }
    else if (index == 3) {
        trophy = "http://moonmusic.duckdns.org/images/bronze.png";
    }
    else {
        trophy = "http://moonmusic.duckdns.org/images/unrank.png";
    }
    
    return (
        <div className="HOF-album"
             style = {{
                 backgroundImage: imgsrc
             }}
        >
            <div className="HOF-album-detail">
                <img src={trophy} alt="trophy image"/>
                <div className="HOF-album-name"> 
                    {name}
                </div>
                <div className="HOF-album-artist">
                    {artist}
                </div>
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

    render() {
        const settings = {
            className: "album-container",
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0
                    }
                }
            ]
        }
        
        const {isLoading, albums, rlbums} = this.state;
        var order = 1;
        var rrder = 1;
        return (
            <section className="home-container">
                {isLoading ? (
                    <div className = "loader">
                        <span className = "loader-text">Loading Albums...</span>
                    </div>
                ) : (
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
                )}
            </section>
        );
    }
};

export default Home;