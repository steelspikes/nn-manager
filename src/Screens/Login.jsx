import React, { useState } from "react";
import "../Styles/Login.css";

function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Requisitos: mínimo 8 caracteres, una letra mayúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Porfavor ingresa un nombre.";
    }

    if (!validateEmail(formData.correo)) {
      newErrors.correo = "Correo no valido.";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseña no coinciden.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aquí puedes enviar los datos al servidor
      console.log("Formulario enviado:", formData);
    }
  };

  return (
    <div className="login">
      <div className="body">
        <div
          className={`container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
              <h1>Crear cuenta</h1>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              {errors.nombre && <p className="error">{errors.nombre}</p>}

              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
              />
              {errors.correo && <p className="error">{errors.correo}</p>}

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}

              <button className="ghost">Registrarse</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Ingresar</h1>
              <input type="email" placeholder="Correo" />
              <input type="password" placeholder="Contraseña" />
              <a href="#">¿Olvidaste tu contraseña?</a>
              <button>Ingresar</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Ya eres miembro!</h1>
                <p>Para ingresar solo necesitas tu correo y contraseña</p>
                <button className="ghost" onClick={handleSignInClick}>
                  Ingresar
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Aun no eres miembro</h1>
                <p>
                  Crea una cuenta para que puedas acceder a todos nuestras
                  funciones
                </p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
