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
import DataContext from './Contexts/DataContext';
import { useState } from 'react';
import PerceptronContext from './Contexts/PerceptronContext';

function App() {
  const [rows, setRows] = useState([
    [1, 2],
    [2, 4],
    [3, 6],
    [4, 8]
  ]);
  const [columns, setColumns] = useState([
    ['X', 'number', '0', 'none'], //Entrada //3era columna es si usa onehot
    ['Y', 'number', '1', 'none'] //Salida
  ]);

  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);

  const [plotCBounds, setPlotCBounds] = useState(0);
  const [plotZoom, setPlotZoom] = useState(25);
  const [layers, setLayers] = useState([2, 3, 1]);
  const [layersActivations, setLayersActivations] = useState(['linear', 'linear', 'linear']);
  const [optimizer, setOptimizer] = useState('adam');
  const [loss, setLoss] = useState('categoricalCrossentropy');

  return (
    <div className="App">
      <PerceptronContext.Provider value={{
        plotCBounds,
        setPlotCBounds,
        plotZoom,
        setPlotZoom,
        layers,
        setLayers,
        layersActivations,
        setLayersActivations,
        optimizer, 
        setOptimizer,
        loss,
        setLoss
      }}>
        <DataContext.Provider value={{ rows, setRows, columns, setColumns, inputs, setInputs, outputs, setOutputs }}>
          <Navigation></Navigation>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Login} />
              <Route path="/projects" Component={Projects} />
              <Route path="/model/perceptron" Component={PerceptronModel} />
              <Route path="/model/data" Component={Data} />
            </Routes>
          </BrowserRouter>
        </DataContext.Provider>
      </PerceptronContext.Provider>
    </div>
  );
}

export default App;
