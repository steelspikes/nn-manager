import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login';
import Navigation from './Fragments/Navigation';
import './Styles/styles.css';
import PaginaPrincipal from './Screens/PaginaPrincipal'; // Ajusta la ruta según tu estructura de carpetas
import Projects from './Screens/Projects';
import PerceptronPlot from './Fragments/PerceptronPlot';

function App() {
  return (
    <div className="App">
      {/* <PaginaPrincipal/> */}
      <Navigation></Navigation>
      <Login/>
    </div>
  );
}

export default App;
