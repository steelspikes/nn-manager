import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login';
import Navigation from './Fragments/Navigation';
import './Styles/styles.css';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Login/>
    </div>
  );
}

export default App;
