import React from 'react';
import '../styles/components/HeroSection.scss';
import TinySlider from "tiny-slider-react";

const DEFAULT_BANNER__COLOR_TEST = {
    "heading": "John Di Girolamo",
    // "subheading": "Welcome",
    "color": "#92c7f6",
    "cta_url": "/",
    "theme": "elegant",
    "cta_text": "Test"
};

const DEFAULT_BANNER__IMAGE_TEST = {
    "heading": "Under Construction",
    // "subheading": "Come back later :D",
    "src": "https://images.dailyhive.com/20180809120802/shutterstock_393672688.jpg",
    "cta_url": "/",
    "cta_text": "Test"
};

const HeroBanner = ({ banner = DEFAULT_BANNER__IMAGE_TEST, parent }) => {
    let key = parent;
    let bannerStyle = {};

    if (banner.src) {
        bannerStyle['backgroundImage'] = 'url(' + banner.src + ')';
    } else if (banner.color) {
        bannerStyle['backgroundColor'] = banner.color;
    }

    const buildBanner = () => {
        return (
            <div className="hero__banner" style={bannerStyle}>
                <div className={banner.full ? 'hero__banner-content' : 'hero__banner-content--wrapper'}>
                    <div className="hero__banner-heading">
                        <h2 className="highlight__underline">
                            <span className="text">
                                {banner.heading}
                                <span className="highlight-area">
                                    <span className="highlight-area__overflow"></span>
                                </span>
                            </span>
                        </h2>
                        <h3 className="highlight__underline">
                            <span className="text">
                                {banner.subheading}
                                <span className="highlight-area">
                                    <span className="highlight-area__overflow"></span>
                                </span>
                            </span>
                        </h3>
                    </div>
                    {
                        banner.cta_url ? (
                            <div className="hero__banner-cta">
                                <a role="button" href={banner.cta_url} className={`button button--${banner.theme}`}>{banner.cta_text}</a>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }

    return buildBanner();
}

const DEFAULT_BANNERS__TEST = [
    DEFAULT_BANNER__IMAGE_TEST,
    DEFAULT_BANNER__COLOR_TEST
];

const HeroSection = ({ banners = DEFAULT_BANNERS__TEST }) => {

    const buildBanners = () => {
        let bannersObj = banners.map((element, index) => {
            return (
                <HeroBanner banner={element} parent={"hero_banner_" + index} key={"hero_banner_" + index} />
            );
        });

        return banners.length > 1 ? buildBannerCarousel(bannersObj) : bannersObj;
    }

    const toggleAnimation = (info, eventName) => {
        info.slideItems.forEach(slide => {
            slide.classList.toggle('animated', info.slideItems <= 1 || slide.classList.contains('tns-slide-active'));
        });
        console.log(info, info.event.type, info.container.id);
    }

    const buildBannerCarousel = (bannersObj) => {

        const settings = {
            lazyload: true,
            nav: false,
            mouseDrag: true,
            controls: false,
            dots: true,
            loop: true,
            items: 1,
            autoplay: true,
            autoplayButtonOutput: false
        };

        return (
            <TinySlider settings={settings} onTransitionEnd={toggleAnimation}>{bannersObj}</TinySlider>
        );
    }

    return <div className="hero">{buildBanners()}</div>;
}

export default HeroSection;