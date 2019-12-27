import React from 'react';
import '../styles/components/ImageGrid.scss';
import TinySlider from "tiny-slider-react";

function getTiles(tiles) {
    return tiles.map(tile => {
        return {
            images: tile.images,
            alt: tile.title
        }
    });
}

const ImageGrid = ({ gridData }) => {
    const tilesData = getTiles(gridData);
    const createGrid = () => {

        let tiles = tilesData.filter(tile => {
            return tile.images.length > 0;
        }).map((tile, index) => {
            return <ImageGridTile key={"image_grid__tile_" + index} index={index} tile={tile} />;
        });

        return [].concat(<div key={"image_grid_wrapper"} className="image_grid">{tiles}</div>);
    }


    return (
        <section className="image_grid_section">{createGrid()}</section>
    );
}

const ImageGridTile = ({ tile, index }) => {

    const tileClass = 'image_grid__tile_' + index;
    const buildTile = () => {
        return tile.images.length > 1 ? buildCarouselTile() : buildImageTile();
    };

    const buildImageTile = () => {
        const { images, alt } = tile;
        let image = images[0];
        return (
            <div key={tileClass + "-image-wrapper_image_" + index} className="image_grid__tile-image">
                <img
                    key={tileClass + "-image_" + index}
                    src={image}
                    alt={alt}
                />
            </div>
        );
    }

    const buildCarouselTile = () => {

        const { images, alt } = tile;

        const settings = {
            lazyload: true,
            nav: false,
            mouseDrag: true,
            controls: false,
            dots: true,
            loop: true,
            items: 1
        };

        let tile_images = images.map((image, index) => {
            return (
                <div key={tileClass + "-image-wrapper_image_" + index} className="image_grid__tile-image">
                    <img
                        className={`tns-lazy-img`}
                        key={parent + "-image_" + index}
                        src={image}
                        alt={alt}
                        data-src={image}
                    />
                </div>
            );
        });

        return (

            <TinySlider
                key={parent + "slider"}
                settings={settings}
            >{tile_images}</TinySlider>
        );
    }

    return (
        <div key={parent + "-image-wrapper"} className="image_grid__tile">
            {buildTile()}
        </div>
    );

}

// const ImageSliderGridTile = ({ images, parent, alt }) => {

//     const settings = {
//         lazyload: true,
//         nav: false,
//         mouseDrag: true,
//         controls: false,
//         dots: true,
//         loop: true,
//         items: 1
//     };
//     const buildTile = () => {

//         let tile_images = images.map((image, index) => {
//             return (
//                 <div key={parent + "-image-wrapper_image_" + index} className="image_grid__tile-image">
//                     <img
//                         className={`tns-lazy-img`}
//                         key={parent + "-image_" + index}
//                         src={image}
//                         alt={alt}
//                         data-src={image}
//                     />
//                 </div>
//             );
//         });

//         return [].concat(
//             (
//                 <div key={parent + "-image-wrapper"} className="image_grid__tile">
//                     <TinySlider
//                         key={parent + "slider"}
//                         settings={settings}
//                     >{tile_images}</TinySlider>
//                 </div>
//             )
//         )
//     };

//     return buildTile();

// }

export default ImageGrid;