import React, { useContext, useEffect, useRef, useState } from "react";
import PerceptronPlot from "../Fragments/PerceptronPlot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { layer } from "@fortawesome/fontawesome-svg-core";
import DataContext from "../Contexts/DataContext";
import PerceptronContext from "../Contexts/PerceptronContext";
import axios from "axios";

function PerceptronModel() {
    const plotRef = useRef(null);
    const { inputs, outputs } = useContext(DataContext);
    const {
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
        setLoss,
        epochs,
        setEpochs
    } = useContext(PerceptronContext);

    useEffect(() => {
        setPlotCBounds(plotRef.current.getBoundingClientRect());
    }, [plotRef]);

    useEffect(() => {
        const tempLayers = [...layers];
        tempLayers[0] = inputs[0].length;
        tempLayers[layers.length - 1] = outputs[0].length;
        setLayers(tempLayers);

    }, [inputs, outputs]);

    const increaseZoom = () => setPlotZoom(plotZoom + 2);
    const decreaseZoom = () => setPlotZoom(plotZoom - 2);

    const setOutputLayerNeurons = (value, i) => {
        const tempLayers = [...layers];
        const scannedNumber = Number(value);
        tempLayers[i] = scannedNumber;
        setLayers(tempLayers);
    }

    const getLayerName = (i) => {
        if (i == 0) return 'Entrada';
        else if (i == (layers.length - 1)) return 'Salida';
        return 'Oculta ' + i;
    }

    const addHiddenLayer = () => {
        const tempLayers = [...layers];
        const tempLayersAct = [...layersActivations];
        tempLayers.splice(tempLayers.length - 1, 0, 1)
        tempLayersAct.splice(tempLayersAct.length - 1, 0, 'linear')
        setLayers(tempLayers);
        setLayersActivations(tempLayersAct);
    }

    const ACTIVATION_FUNCTIONS = {
        "elu": "ELU",
        "hardSigmoid": "Hard Sigmoid",
        "linear": "Linear",
        "relu": "ReLU",
        "relu6": "ReLU6",
        "selu": "SELU",
        "sigmoid": "Sigmoid",
        "softmax": "Softmax",
        "softplus": "Softplus",
        "softsign": "Softsign",
        "tanh": "Tanh",
        "swish": "Swish",
        "mish": "Mish",
        "gelu": "GELU",
        "gelu_new": "GELU New"
    }

    const onChangeActivation = (e, i) => {
        const tempLayersActivations = [...layersActivations];
        tempLayersActivations[i] = e.target.value;
        setLayersActivations(tempLayersActivations);
    }

    const OPTIMIZERS = {
        adam: 'Adam',
        adadelta: 'Adadelta',
        adagrad: 'Adagrad',
        adamax: 'Adamax',
        sgd: 'SGD',
        rmsprop: 'RMS Prop',
        momentum: 'Momentum'
    }

    const LOSSES = {
        "categoricalCrossentropy": "Categorical Crossentropy",
        "sparseCategoricalCrossentropy": "Sparse Categorical Crossentropy",
        "binaryCrossentropy": "Binary Crossentropy",
        "meanSquaredError": "Mean Squared Error",
        "meanAbsoluteError": "Mean Absolute Error",
        "meanAbsolutePercentageError": "Mean Absolute Percentage Error",
        "cosineSimilarity": "Cosine Similarity",
        "hinge": "Hinge Loss",
        "logcosh": "Log-Cosh",
        "poisson": "Poisson Loss"
    }

    const onTrain = () => {
        axios.post("http://localhost:5000/model", {
            inputs, outputs, layers, layersActivations, optimizer, loss, epochs
        }).then(res  => {
            console.log('Hola');
        });
    }

    return (
        <div className="perceptron-model">
            <div className="min-h-screen relative items-start">
                <div className="w-96 h-screen fixed z-20 bg-white grid grid-cols-12 p-5 gap-3 pt-20 overflow-y-scroll">
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
                            <input value={x !== 0 ? x : ''} disabled={['Entrada', 'Salida'].includes(getLayerName(i))} className="col-span-8 border-4" type="number" onChange={e => setOutputLayerNeurons(e.target.value, i)} placeholder="0" />
                        </>)
                    }

                    <h1 className="text-xl col-span-11 font-bold">Función de activación</h1>
                    {
                        layersActivations.map((x, i) => <>
                            <p className="col-span-4">{getLayerName(i)}</p>
                            <select disabled={['Entrada'].includes(getLayerName(i))} className="col-span-8" value={layersActivations[i]} onChange={e => onChangeActivation(e, i)}>
                                {
                                    Object.keys(ACTIVATION_FUNCTIONS).map(actFun => <option value={actFun}>{ACTIVATION_FUNCTIONS[actFun]}</option>)
                                }
                            </select>
                        </>)
                    }

                    <h1 className="text-xl col-span-11 font-bold">Optimizador</h1>
                    <select className="col-span-12" value={optimizer} onChange={e => setOptimizer(e.target.value)}>
                        {
                            Object.keys(OPTIMIZERS).map(optim => <option value={optim}>{OPTIMIZERS[optim]}</option>)
                        }
                    </select>

                    <h1 className="text-xl col-span-11 font-bold">Función de pérdida (loss)</h1>
                    <select className="col-span-12" value={loss} onChange={e => setLoss(e.target.value)}>
                        {
                            Object.keys(LOSSES).map(l => <option value={l}>{LOSSES[l]}</option>)
                        }
                    </select>

                    <h1 className="text-xl col-span-11 font-bold">Etapas (epochs)</h1>
                    <input value={epochs !== 0 ? epochs : ''} className="col-span-8 border-4" type="number" onChange={e => setEpochs(Number(e.target.value))} placeholder="0" />
                    
                    <hr />

                    <button className="text-xl font-bold py-2 border-4 border-black col-span-12 rounded-md" onClick={onTrain}>Entrenar</button>

                </div>
                <div className="bg-slate-300 w-full pt-20 relative pl-96 overflow-x-hidden h-screen" ref={plotRef}>
                    <PerceptronPlot bounds={plotCBounds} layers={layers} circleRadius={plotZoom} />
                    <div className="absolute top-16 right-0">
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
