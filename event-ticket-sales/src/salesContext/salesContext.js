import React, { createContext, useContext, useState } from "react";

// Creamos el contexto
const SalesContext = createContext();

// Este es el proveedor del contexto
export const Provider = ({ children }) => {
  // Guarda el ID del evento actual que se está comprando
  const [currentEventId, setCurrentEventId] = useState(0);

  // Guarda los datos de los tickets que el usuario va a comprar
  const [currentTickets, setCurrentTickets] = useState([
    { nombre: "", apellido: "", dni: "" }
  ]);

  // 🔧 BACKEND: Cuando tengas Firebase, podrías guardar `currentTickets` y `currentEventId` en Firestore aquí
  // Por ahora, esto se queda solo en memoria mientras se usa la app

  return (
    <SalesContext.Provider value={{ 
      currentEventId, 
      setCurrentEventId, 
      currentTickets, 
      setCurrentTickets 
    }}>
      {children}
    </SalesContext.Provider>
  );
};

// Hook para usar el contexto desde otros componentes
export const useSalesContext = () => {
  return useContext(SalesContext);
};
