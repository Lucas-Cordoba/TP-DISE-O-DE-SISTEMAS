import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detalles.css";

const eventos = [
  {
    id: "1",
    name: "Concierto Rock",
    price: 50,
    description: "Un gran concierto de rock con bandas famosas.",
    location: { name: "Estadio Nacional" },
  },
  {
    id: "2",
    name: "Feria de Arte",
    price: 20,
    description: "Exposición de arte local e internacional.",
    location: { name: "Centro Cultural" },
  },
  {
    id: "3",
    name: "Festival de Jazz",
    price: 35,
    description: "Tres días de música jazz en vivo en el parque.",
    location: { name: "Parque Central" },
  },
];

const Detalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar evento localmente según el id
  const event = eventos.find((e) => e.id === id);

  if (!event) {
    return <p className="text-center mt-5">No se encontró el evento.</p>;
  }

  const { name, price, description, location } = event;

  return (
    <div className="container mt-4 py-5">
      <div className="row bg-light p-4 rounded align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            className="producto-imagen img-fluid max-height-400 mb-4"
            src={require(`../img/events/${id}.jpg`)}
            alt={name}
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-center mb-4">{name}</h2>
          <p className="h5 text-center">Precio: ${price}</p>
          <p className="h5 text-center">Localidad: {location?.name}</p>
          <p className="text-center">{description}</p>
        </div>
      </div>

      <div className="d-flex justify-content-center my-3 ">
        <button
          className="btn btn-secondary me-3"
          onClick={() => navigate(`/comprar/${id}`)}
        >
          Comprar
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Detalles;
