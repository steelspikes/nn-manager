import React from "react";
import '../Styles/Login.css';
import axios from "axios";

function Login() {
  const hola = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", {
      username: "Marcus Dantus",
      password: "password123"
    }).then(res  => {
      alert(res.data.Message)
    });
  }

  return (
    <div className="login">
      <div className="body">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Crear cuenta</h1>
              <input type="text" placeholder="Nombre" />
              <input type="email" placeholder="Correo" />
              <input type="password" placeholder="Contraseña" />
              <input type="password" placeholder="Confirmar contraseña" />
              <button onClick={hola} className="ghost">Registrarse</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Ingresar</h1>
              <input type="email" placeholder="Correo" />
              <input type="password" placeholder="Contraseña" />
              <a href="#">¿Olvidaste tu contraseña?</a>
              <button onClick={hola}>Ingresar</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Ya eres miembro!</h1>
                <p>Para ingresar solo necesitas tu correo y contraseña</p>
                <button className="ghost" id="signIn">Ingresar</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Aun no eres miembro</h1>
                <p>Crea una cuenta para que puedas acceder a todos nuestras funciones</p>
                <button className="ghost" id="signUp">Registrarse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import '../Styles/Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Función para manejar el login
//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Enviar la solicitud POST al servidor
//     fetch('http://localhost:5000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: email,
//         password: password,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data === 'Inicio de sesión exitoso') {
//           alert('Bienvenido');
//           // Redirigir a la página principal o hacer otro manejo
//         } else {
//           alert('Usuario o contraseña incorrectos');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Hubo un error al intentar iniciar sesión');
//       });
//   };

//   return (
//     <div className="login">
//       <div className="body">
//         <div className="container" id="container">
//           <div className="form-container sign-up-container">
//             <form action="#">
//               <h1>Crear cuenta</h1>
//               <input type="text" placeholder="Nombre" />
//               <input type="email" placeholder="Correo" />
//               <input type="password" placeholder="Contraseña" />
//               <input type="password" placeholder="Confirmar contraseña" />
//               <button className="ghost">Registrarse</button>
//             </form>
//           </div>
//           <div className="form-container sign-in-container">
//             <form onSubmit={handleLogin}>
//               <h1>Ingresar</h1>
//               <input
//                 type="email"
//                 placeholder="Correo"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Contraseña"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <a href="#">¿Olvidaste tu contraseña?</a>
//               <button type="submit">Ingresar</button>
//             </form>
//           </div>
//           <div className="overlay-container">
//             <div className="overlay">
//               <div className="overlay-panel overlay-left">
//                 <h1>Ya eres miembro!</h1>
//                 <p>Para ingresar solo necesitas tu correo y contraseña</p>
//                 <button className="ghost" id="signIn">Ingresar</button>
//               </div>
//               <div className="overlay-panel overlay-right">
//                 <h1>Aun no eres miembro</h1>
//                 <p>Crea una cuenta para que puedas acceder a todos nuestras funciones</p>
//                 <button className="ghost" id="signUp">Registrarse</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
