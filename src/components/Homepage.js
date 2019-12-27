import React from 'react';
import '../styles/components/Homepage.scss';
import Header from './Header.js';
import HeroSection from './HeroSection.js';
import ImageGrid from './ImageGrid.js';
const { header_nav, hero, featured_pixel_art } = require('../../data.json');


const Homepage = (props) => {

    return (
        <div className="App">
            <h1 className="accessibility-hidden">John Di Girolamo</h1>
            <Header headerNav={header_nav} initialState={false} />
            <HeroSection banners={hero} />
            <ImageGrid gridData={featured_pixel_art} />
        </div>
    );
}

export default Homepage;