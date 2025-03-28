import logo from './logo.svg';
import Login from './Screens/Login';
import Navigation from './Fragments/Navigation';
import './Styles/styles.css';
import Projects from './Screens/Projects';
import PerceptronPlot from './Fragments/PerceptronPlot';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PerceptronModel from './Screens/PerceptronModel';
import Data from './Screens/Data';
import './App.css';
import PaginaPrincipal from './Screens/PaginaPrincipal'; // Ajusta la ruta según tu estructura de carpetas

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/projects" Component={Projects} />
          <Route path="/model/perceptron" Component={PerceptronModel} />
          <Route path="/model/data" Component={Data} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
