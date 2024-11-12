import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login';
import Navigation from './Fragments/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Login></Login>
    </div>
  );
}

export default App;
