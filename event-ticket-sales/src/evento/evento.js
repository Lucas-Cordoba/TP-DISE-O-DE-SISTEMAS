import React from "react";
import { Link } from "react-router-dom";
import "./evento.css";

const eventos = [
  {
    id: 1,
    name: "Concierto Rock",
    price: 50,
    date: "2025-06-15",
    location: { name: "Estadio Nacional" },
  },
  {
    id: 2,
    name: "Feria de Arte",
    price: 20,
    date: "2025-07-01",
    location: { name: "Centro Cultural" },
  },
  {
    id: 3,
    name: "Festival de Jazz",
    price: 35,
    date: "2025-08-20",
    location: { name: "Parque Central" },
  },
];

const formatFecha = (fecha) => {
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones).replace(/\//g, "/");
};

const Eventos = () => {
  return (
    <div className="container pb-5">
      <h2 className="text-center py-5">EVENTOS</h2>
      <div className="row">
        {eventos.map((evento) => (
          <div className="col-md-4 mb-4" key={evento.id}>
            <div className="card h-100 shadow bc bs">
              <img
                src={require(`../img/events/${evento.id}.jpg`)}
                className="card-img-top event-image"
                alt={`Imagen de ${evento.name}`}
              />
              <div className="card-body text-center">
                <h5 className="card-title fs-4 fw-bold text-dark">{evento.name}</h5>
                <p className="card-text fs-5 text-success">${evento.price}</p>
                <p className="card-text text-muted">{formatFecha(evento.date)}</p>
                <p className="card-text text-muted">{evento.location.name}</p>
                <Link to={`/detalles/${evento.id}`} className="btn btn-dark fs-6 fw-bold boton">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
