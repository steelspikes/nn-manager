import React, { useState } from "react";
import '../Styles/Login.css'; // Importa el archivo de estilos

function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
   <div className = "login">
     <div className="body">
     <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Crear cuenta</h1>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
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
            <button className="ghost" onClick={handleSignInClick}>Ingresar</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Aun no eres miembro</h1>
            <p>Crea una cuenta para que puedas acceder a todos nuestras funciones</p>
            <button className="ghost" onClick={handleSignUpClick}>Registrarse</button>
          </div>
        </div>
      </div>
    </div>
     </div>
        </div>
  );
}

export default Login;
