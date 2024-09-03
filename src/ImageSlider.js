import React from 'react';
import Slider from "react-slick";
import "./styles/imageSlider.css"

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slider-item">
            <img src={img} alt={`product-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
