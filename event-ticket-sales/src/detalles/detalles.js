import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./detalles.css";

const Detalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Evento no encontrado");
        return res.json();
      })
      .then((data) => {
        setEvento(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  if (loading) return <p className="text-center mt-5">Cargando...</p>;
  if (error) return <p className="text-center mt-5">{error}</p>;

  const { name, price, description, location } = evento;

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
          <p className="h5 text-center">Localidad: {location}</p>
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
