import React, { useState } from 'react';
import "./CarruselCaseroEstilo.css";
import fotoMetal from "../../img/descarga.jpg";
import fotocompleta from "../../img/images (1).jpg";
import fotomedias from "../../img/UTB8SVphXwnJXKJkSaelq6xUzXXaI.jpg_720x720q50.avif";

const CarruselCasero = () => {
    const slides = [
        fotoMetal,
        fotocompleta,
        fotomedias,
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