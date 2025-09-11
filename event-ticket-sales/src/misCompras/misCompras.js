import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

const MisCompras = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token"); // asumo que tu token se llama así

        if (!token) {
          // Por ejemplo, podrías redirigir al login si no hay token
          console.log("No hay token, debe iniciar sesión");
          return;
        }

        const response = await fetch("http://localhost:4000/tickets", {
          // cambia la URL si es necesario
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las compras");
        }

        const data = await response.json();

        // data es un arreglo con objetos como { ticketId, eventName, first_name, last_name, dni }
        // Vamos a mapearlo para adaptarlo a la estructura que usas:
        const formattedTickets = data.map((ticket) => ({
          id: ticket.ticketId,
          event: { name: ticket.eventName },
          name: ticket.first_name,
          lastName: ticket.last_name,
          dni: ticket.dni,
        }));

        setTickets(formattedTickets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, []);
  const downloadQR = async (compra) => {
    try {
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(
        canvas,
        `Compra de entrada #${compra.id} para ${compra.event.name} - Nombre: ${compra.name}, Apellido: ${compra.lastName}, DNI: ${compra.dni}`,
        { width: 256 }
      );

      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "ticket.png";
      link.click();
    } catch (error) {
      console.error("Error generating QR code: ", error);
    }
  };

  return (
    <div className="container mt-4 py-5">
      <h2 className="text-center mb-4">Mis Compras</h2>
      {tickets.length === 0 ? (
        <p className="text-center">No has realizado ninguna compra.</p>
      ) : (
        <ul className="list-group">
          {tickets.map((compra, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{compra.event.name}</h5>
                <p>
                  Nombre: {compra.name} {compra.lastName}
                </p>
                <p>DNI: {compra.dni}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => downloadQR(compra)}
                >
                  Descargar QR
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default MisCompras;
