import React, { useEffect, useState } from "react";
import Carousel from "../carousel/carousel";
import "./principal.css";
import { Link } from "react-router-dom";

const Principal = () => {
  const [events, setEvents] = useState([]);
  const [configurations, setConfigurations] = useState({ description: "" });

  useEffect(() => {
    // 🔧 BACKEND: Aquí podrías obtener configuraciones desde Firebase o API

    // Datos simulados para frontend:
    const fakeConfig = {
      description: "Somos un organizador de eventos con la mejor experiencia."
    };
    setConfigurations(fakeConfig);
  }, []);

  useEffect(() => {
    // 🔧 BACKEND: Aquí podrías obtener próximos eventos desde Firebase o API

    // Datos simulados para frontend:
    const fakeEvents = [
      {
        id: 1,
        name: "Concierto Rock",
        price: 1500,
        date: "2025-06-10T00:00:00Z"
      },
      {
        id: 2,
        name: "Festival Jazz",
        price: 2000,
        date: "2025-07-05T00:00:00Z"
      },
      {
        id: 3,
        name: "Obra de Teatro",
        price: 1200,
        date: "2025-08-12T00:00:00Z"
      }
    ];
    setEvents(fakeEvents);
  }, []);

  const formatFecha = (fecha) => {
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(fecha)
      .toLocaleDateString("es-ES", opciones)
      .replace(/\//g, "/"); // Cambia las barras si es necesario
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-center my-5 fw-3 fs-2">ANUNCIOS</h2>
        <Carousel />
      </div>
      <hr />
      <div className="container">
        <h2 className="text-center mb-5 fw-3 fs-2">PRÓXIMOS EVENTOS</h2>
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow bc">
                <img
                  src={require(`../img/events/${event.id}.jpg`)}
                  className="card-img-top event-image"
                  alt={`Imagen de ${event.name}`}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fs-4 fw-bold text-dark">
                    {event.name}
                  </h5>
                  <p className="card-text fs-5 text-success">${event.price}</p>
                  <p className="card-text text-muted">{formatFecha(event.date)}</p>
                  <Link
                    to={`/detalles/${event.id}`}
                    className="btn btn-dark fs-6 fw-bold boton"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="container mb-80">
        <h2 className="text-center mb-5 fw-3 fs-2">SOBRE NOSOTROS</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              src={require("../img/2.jpg")}
              className="d-block w-100 bs ml-1"
              alt="Imagen Organizador"
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <p>{configurations.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
