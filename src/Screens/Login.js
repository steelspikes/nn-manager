import React from "react";

function Login() {
  return (
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Crear cuenta</h1>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
          <button class="ghost">Registrarse</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Ingresar</h1>
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button>Ingresar</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Ya eres miembro!</h1>
            <p>Para ingresar solo necesitas tu correo y contraseña</p>
            <button class="ghost" id="signIn">Ingresar</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Aun no eres miembro</h1>
            <p>Crea una cuenta para que puedas acceder a todos nuestras funciones</p>
            <button class="ghost" id="signUp">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
