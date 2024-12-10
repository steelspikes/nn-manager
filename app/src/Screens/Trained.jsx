import React, { useContext, useEffect, useRef, useState } from "react";
import PerceptronPlot from "../Fragments/PerceptronPlot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { layer } from "@fortawesome/fontawesome-svg-core";
import DataContext from "../Contexts/DataContext";
import PerceptronContext from "../Contexts/PerceptronContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loading from "../Fragments/Loading";
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';

function Trained() {
    const [loading, setLoading] = useState(false);

    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        getTrainedData();
    }, []);

    const [accChart, setAccChart] = useState(null);
    const [lossChart, setLossChart] = useState(null);
    const [mseChart, setMseChart] = useState(null);
    const [predicted, setPredicted] = useState([]);

    const { columns, outputs } = useContext(DataContext);

    let cols = columns.filter(x => x[2] === '0');

    const addPredictionRow = () => {
        const predictionsCopy = [...predictions];
        predictionsCopy.push(cols.map(x => 0));
        setPredictions(predictionsCopy);
    }

    const modifyTableValue = (e, i, j) => {
        const tempPredictions = [...predictions];
        tempPredictions[i][j] = e.target.value;
        setPredictions(tempPredictions);
    }

    const getTrainedData = () => {
        setLoading(true);
        axios.post("http://localhost:5000/model/trained", {}).then(res => {
            setLoading(false);
            if (res.data.success) {
                console.log(res.data)

                const ctx = document.getElementById('accuracy-chart');

                setAccChart({
                    labels: Array.from({ length: res.data.history.acc.length }, (_, i) => i + 1),
                    datasets: [{
                        label: 'Exactitud',
                        data: res.data.history.acc,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        borderWidth: 1
                    }]
                });

                setLossChart({
                    labels: Array.from({ length: res.data.history.loss.length }, (_, i) => i + 1),
                    datasets: [{
                        label: 'Pérdida',
                        data: res.data.history.loss,
                        borderColor: 'rgb(62,56,120)',
                        tension: 0.1,
                        borderWidth: 1
                    }]
                });

                setMseChart({
                    labels: Array.from({ length: res.data.history.mse.length }, (_, i) => i + 1),
                    datasets: [{
                        label: 'Error cuadrático medio',
                        data: res.data.history.mse,
                        borderColor: 'rgb(126,56,20)',
                        tension: 0.1,
                        borderWidth: 1
                    }]
                });
            } else {
                alert('Hubo un error interno');
            }
        });
    }

    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const predict = () => {
        axios.post("http://localhost:5000/model/predict", {
            inputs: predictions.map(x => x.map(y => Number(y)))
        }).then(res => {
            setLoading(false);
            if (res.data.success) {
                setPredicted(res.data.predicted)
                console.log(res.data.predicted)
            } else {
                alert('Hubo un error interno');
            }
        });
    }

    return (
        <div className="trained">
            <Loading show={loading} text={'Cargando los datos'} />
            <div className="mt-16 p-6">
                <h1 className="text-2xl font-bold mb-6">Estadísticas del entrenamiento</h1>
                <div className="grid grid-cols-12">
                    <div className="col-span-4">
                        {
                            accChart !== null && <Line className="w-full" data={accChart} />
                        }
                    </div>

                    <div className="col-span-4">
                        {
                            lossChart !== null && <Line className="w-full" data={lossChart} />
                        }
                    </div>

                    <div className="col-span-4">
                        {
                            mseChart !== null && <Line className="w-full" data={mseChart} />
                        }
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-6">
                    <div className="col-span-6 grid grid-cols-12 gap-6">
                        <div className="col-span-12 grid grid-cols-12">
                            <h1 className="text-2xl col-span-11 font-bold">Predicciones</h1>
                            <button className="col-span-1 text-right" onClick={addPredictionRow}>
                                <FontAwesomeIcon icon={faPlusCircle} size="xl" />
                            </button>
                        </div>
                        <table className="table text-lg border-2 border-collapse border-black col-span-12">
                            <thead>
                                <tr>
                                    {
                                        cols.map(x => <td className="border-2 border-black py-2 px-4 font-bold">{x[0]}</td>)
                                    } {
                                        outputs[0].map((x, k) => <td className="border-2 border-black py-2 px-4 font-bold">Salida {k + 1}</td>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    predictions.map((row, i) => <tr className="border-2 border-black py-2 px-4 font-bold">
                                        {
                                            row.map((val, j) => <td className="border-2 border-black py-2 px-4 font-bold"><input value={predictions[i][j] === '0' ? '0' : predictions[i][j]} onChange={e => modifyTableValue(e, i, j)} /></td>)
                                        }
                                        {
                                            predicted.length > Number(i) && predicted[i].map((val, j) => <td className="border-2 border-black py-2 px-4 font-bold"><p>{predicted[i][j]}</p></td>)
                                        }
                                    </tr>)
                                }
                            </tbody>
                        </table>

                        <button className="text-xl font-bold py-2 border-4 border-black col-span-12 rounded-md" onClick={predict}>Predecir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trained;
