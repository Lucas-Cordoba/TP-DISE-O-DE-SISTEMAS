import React, { useState, useEffect } from "react";
import "./carousel.css";

// Lista simulada de imágenes locales (debes tenerlas en ../img/events/)
const imageIds = ["1", "2", "3"]; // IDs de eventos simulados

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("slide-in");

  // Carga imágenes locales según IDs
  useEffect(() => {
    const imgs = imageIds.map(id => require(`../img/events/${id}.jpg`));
    setImages(imgs);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const intervalId = setInterval(() => {
      setAnimationClass("slide-out");
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setAnimationClass("slide-in");
      }, 1000); // Duración de la animación
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  if (images.length === 0) return <p>Cargando imágenes...</p>;

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        className={`carousel-image ${animationClass}`}
        alt={`Imagen ${currentIndex + 1}`}
      />
    </div>
  );
};

export default Carousel;
