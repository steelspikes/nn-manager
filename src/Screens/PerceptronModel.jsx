import React, { useEffect, useRef, useState } from "react";
import PerceptronPlot from "../Fragments/PerceptronPlot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { layer } from "@fortawesome/fontawesome-svg-core";

function PerceptronModel() {
    const plotRef = useRef(null);

    const [plotCBounds, setPlotCBounds] = useState(0);
    const [plotZoom, setPlotZoom] = useState(25);
    const [layers, setLayers] = useState([2, 3, 1]);
    const [layersActivations, setLayersActivations] = useState(['linear', 'linear', 'linear']);

    useEffect(() => {
        setPlotCBounds(plotRef.current.getBoundingClientRect());
    }, [plotRef])

    const increaseZoom = () => setPlotZoom(plotZoom + 2);
    const decreaseZoom = () => setPlotZoom(plotZoom - 2);

    const setOutputLayerNeurons = (e, i) => {
        const tempLayers = [...layers];
        const scannedNumber = Number(e.target.value);
        tempLayers[i] = scannedNumber;
        setLayers(tempLayers);
    }

    const getLayerName = (i) => {
        if (i == 0) return 'Entrada';
        else if (i == (layers.length - 1)) return 'Salida';
        return 'Oculta ' + i
    }

    const addHiddenLayer = () => {
        const tempLayers = [...layers];
        const tempLayersAct = [...layersActivations];
        tempLayers.splice(tempLayers.length - 1, 0, 1)
        tempLayersAct.splice(tempLayers.length - 1, 0, 'linear')
        setLayers(tempLayers);
        setLayersActivations(tempLayersAct);
    }

    const ACTIVATION_FUNCTIONS = {
        linear: 'Lineal',
        relu: 'ReLU',
        tanh: 'TanH',
        sigmoid: 'Sigmoide'
    }

    const onChangeActivation = (e, i) => {
        const tempLayersActivations = [...layersActivations];
        tempLayersActivations[i] = e.target.value;
        setLayersActivations(tempLayersActivations);
    }

    return (
        <div className="perceptron-model">
            <div className="grid grid-cols-12 mt-16 min-h-screen relative items-start">
                <div className="col-span-3 grid grid-cols-12 p-5 gap-3">
                    <div className="col-span-12 grid grid-cols-12">
                        <h1 className="text-2xl col-span-11 font-bold">Capas</h1>
                        <button className="col-span-1" onClick={addHiddenLayer}>
                            <FontAwesomeIcon icon={faPlusCircle} size="xl" />
                        </button>
                    </div>

                    <h1 className="text-xl col-span-11 font-bold">Número de neuronas</h1>
                    {
                        layers.map((x, i) => <>
                            <p className="col-span-4">{getLayerName(i)}</p>
                            <input value={x !== 0 ? x : ''} className="col-span-8 border-4" type="number" onChange={e => setOutputLayerNeurons(e, i)} placeholder="0" />
                        </>)
                    }

                    <h1 className="text-xl col-span-11 font-bold">Función de activación</h1>
                    {
                        layersActivations.map((x, i) => <>
                            <p className="col-span-4">{getLayerName(i)}</p>
                            <select className="col-span-8" value={layersActivations[i]} onChange={e => onChangeActivation(e, i)}>
                                {
                                    Object.keys(ACTIVATION_FUNCTIONS).map(actFun => <option value={actFun}>{ACTIVATION_FUNCTIONS[actFun]}</option>)
                                }
                            </select>
                        </>)
                    }

                </div>
                <div className="bg-slate-300 col-span-9 relative h-full" ref={plotRef}>
                    <PerceptronPlot bounds={plotCBounds} layers={layers} circleRadius={plotZoom} />
                    <div className="absolute top-0 right-0">
                        <button className="size-12" onClick={increaseZoom}>
                            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                        </button>
                        <button className="size-12" onClick={decreaseZoom}>
                            <FontAwesomeIcon icon={faMinusCircle} size="2x" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerceptronModel;
