import React, { useState } from 'react';
import "./CarruselCaseroEstilo.css";

import fotoBaner2 from "../../img/assets2Ftask_01jxeann45fvbrsj700pp93y902F1749606488_img_1.png";
import fotoBaner3 from "../../img/assets2Ftask_01jxeaxzf4e3r83t9fb1r80vze2F1749606759_img_1.png";
import fotoBaner1 from "../../img/raw.png"

const CarruselCasero = () => {
    const slides = [
        fotoBaner1,
        fotoBaner3,
        fotoBaner2,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="carrusel">
            <button className="carrusel__button carrusel__button--left" onClick={prevSlide}>
                &#8249;
            </button>
            <div className="carrusel__slides">
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        alt={`Slide ${index + 1}`}
                        className={`carrusel__slide ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="carrusel__button carrusel__button--right" onClick={nextSlide}>
                &#8250;
            </button>
        </div>
    );
};

export default CarruselCasero;