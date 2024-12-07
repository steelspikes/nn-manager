import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login';
import Navigation from './Fragments/Navigation';
import './Styles/styles.css';
import Projects from './Screens/Projects';
import PerceptronPlot from './Fragments/PerceptronPlot';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Login/>
    </div>
  );
}

export default App;
