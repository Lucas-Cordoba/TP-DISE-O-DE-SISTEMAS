import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el manejo de errores
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook de navegación para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("Por favor ingresa email y contraseña");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión");
      } else {
        // Guarda token en localStorage
        localStorage.setItem("token", data.token);
        // Redirige a la página principal (o dashboard)
        navigate("/");
      }
    } catch (err) {
      setError("Error de conexión. Intenta más tarde.");
    }
  };

  return (
    <div className="container mt-4 py-5">
      <div className="row bg-light p-4 rounded align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            className="login-imagen img-fluid max-height-400 mb-4"
            src={require("../img/1.jpg")}
            alt="Login"
          />
        </div>
        
        <div className="col-md-6">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Mostrar Contraseña
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              ¿No estás registrado? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
