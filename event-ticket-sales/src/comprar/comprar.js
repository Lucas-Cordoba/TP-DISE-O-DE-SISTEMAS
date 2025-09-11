import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./comprar.css";

const eventos = [
  {
    id: "1",
    name: "Los Herrera",
    price: 50,
    description: "Un gran concierto de rock con bandas famosas.",
    location: { name: "Estadio Nacional" },
  },
  {
    id: "2",
    name: "DesaKTa2",
    price: 20,
    description: "Exposición de arte local e internacional.",
    location: { name: "Centro Cultural" },
  },
  {
    id: "3",
    name: "FUlises Bueno",
    price: 35,
    description: "Tres días de música jazz en vivo en el parque.",
    location: { name: "Parque Central" },
  },
];

const Comprar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Busco evento localmente
  const event = eventos.find((e) => e.id === id);

  // Estado para cantidad y entradas
  const [cantidad, setCantidad] = useState(1);
  const [entradas, setEntradas] = useState([
    { nombre: "", apellido: "", dni: "" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para comprar entradas.");
      navigate("/login");
    }
  }, [navigate]);

  // Ajustar entradas según cantidad
  const handleCantidadChange = (e) => {
    const newCantidad = Math.max(1, parseInt(e.target.value) || 1);
    setCantidad(newCantidad);
    setEntradas((oldEntradas) => {
      const nuevas = [...oldEntradas];
      while (nuevas.length < newCantidad)
        nuevas.push({ nombre: "", apellido: "", dni: "" });
      return nuevas.slice(0, newCantidad);
    });
  };

  // Actualizar datos de cada entrada
  const handleChange = (index, field, value) => {
    const newEntradas = [...entradas];
    newEntradas[index][field] = value;
    setEntradas(newEntradas);
  };

  if (!event) {
    return <p className="text-center mt-5">No se encontró el evento.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para comprar entradas.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: id,
          cantidad,
          entradas,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al realizar la compra");
      }

      alert("Compra realizada con éxito!");
      setCantidad(1);
      setEntradas([{ nombre: "", apellido: "", dni: "" }]);
      navigate("/mis-compras");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4 py-5">
      <div className="bg-light p-4 rounded d-flex flex-column flex-md-row">
        <div className="col-md-4 mb-4 mb-md-0">
          <img
            className="producto-imagen img-fluid max-height-400"
            src={require(`../img/events/${event.id}.jpg`)}
            alt={event.name}
          />
          <p className="mt-3">{event.description}</p>
        </div>
        <div className="col-md-8 ms-md-4">
          <h2 className="text-center mb-4">{event.name}</h2>
          <div className="detalles mb-4">
            <p className="h5">Precio: ${event.price}</p>

            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Cantidad de Entradas
              </label>
              <input
                type="number"
                className="form-control w-50"
                id="cantidad"
                value={cantidad}
                onChange={handleCantidadChange}
                min="1"
              />
            </div>

            <form onSubmit={handleSubmit}>
              {entradas.map((entrada, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-4 pl">Entrada {index + 1}:</h5>
                    <label htmlFor={`nombre-${index}`} className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control w-50"
                      id={`nombre-${index}`}
                      value={entrada.nombre}
                      onChange={(e) =>
                        handleChange(index, "nombre", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`apellido-${index}`} className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control w-50"
                      id={`apellido-${index}`}
                      value={entrada.apellido}
                      onChange={(e) =>
                        handleChange(index, "apellido", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`dni-${index}`} className="form-label">
                      DNI
                    </label>
                    <input
                      type="text"
                      className="form-control w-50"
                      id={`dni-${index}`}
                      value={entrada.dni}
                      onChange={(e) =>
                        handleChange(index, "dni", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary me-3" type="submit">
                  Finalizar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary my-3" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default Comprar;
