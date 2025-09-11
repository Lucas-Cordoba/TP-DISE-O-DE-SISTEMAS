import React, {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import "./evento.css";



const formatFecha = (fecha) => {
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones).replace(/\//g, "/");
};


const Eventos = () => {
  const [eventos, setEventos] = useState([]);  // Estado para eventos

  useEffect(() => {
    // Aquí hacemos la llamada al backend
    fetch("http://localhost:4000/events")  // Ajusta la URL si tu backend corre en otro puerto o ruta
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);


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
                <p className="card-text text-muted">{evento.location}</p>
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
