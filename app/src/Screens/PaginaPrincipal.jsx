import React from 'react';
//import '../Styles/PaginaPrincipal.css'; // Asegúrate de tener los estilos adecuados

const PaginaPrincipal = () => {
  return (
    <div>
      {/* Barra de Navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <i className="fa-solid fa-sitemap me-2"></i> Redes Neuronales
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#inicio">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#videos">Videos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#editor">Editor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#perfil">
                  <i className="fa-solid fa-user-circle"></i> Perfil
                </a>
              </li>
            </ul>
            {/* Buscador */}
            <form className="d-flex ms-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Sección Principal */}
      <section className="main-section container my-4">
        <div className="text">
          <h1>Explora el Mundo de las Redes Neuronales</h1>
          <p>
            Aprende cómo funcionan las redes neuronales, sus aplicaciones y conceptos fundamentales. 
            Descubre tutoriales interactivos y crea tus propias redes neuronales con nuestras herramientas.
          </p>
          <button className="btn btn-primary">Más Información</button>
        </div>
        <div className="box">
          <span>Contenido Destacado</span>
        </div>
      </section>

      {/* Sección de Tarjetas */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Recursos Destacados</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="card1.jpg" className="card-img-top" alt="Video 1" />
              <div className="card-body">
                <h5 className="card-title">Introducción a las Redes</h5>
                <p className="card-text">Explora los conceptos básicos y fundamentos de las redes neuronales.</p>
                <a href="#" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="card2.jpg" className="card-img-top" alt="Video 2" />
              <div className="card-body">
                <h5 className="card-title">Casos de Uso</h5>
                <p className="card-text">Descubre aplicaciones prácticas de las redes neuronales en la vida diaria.</p>
                <a href="#" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="card3.jpg" className="card-img-top" alt="Video 3" />
              <div className="card-body">
                <h5 className="card-title">Crea tu Propia Red</h5>
                <p className="card-text">Utiliza nuestro editor interactivo para construir y probar redes neuronales.</p>
                <a href="#" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Plataforma de Redes Neuronales. Todos los derechos reservados.</p>
          <div className="footer-icons">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </footer>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default PaginaPrincipal;
