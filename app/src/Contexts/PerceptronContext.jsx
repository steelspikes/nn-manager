import { createContext } from "react";

const PerceptronContext = createContext({
    plotCBounds: 0,
    setPlotCBounds: (p) => { },
    plotZoom: 0,
    setPlotZoom: (p) => { },
    layers: [],
    setLayers: (p) => { },
    layersActivations: [],
    setLayersActivations: (p) => { },
    optimizer: '',
    setOptimizer: (p) => {},
    loss: '',
    setLoss: (p) => {}
});

export default PerceptronContext;