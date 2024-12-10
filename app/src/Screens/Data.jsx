import React, { useContext, useEffect, useRef, useState } from "react";
import PerceptronPlot from "../Fragments/PerceptronPlot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMinus, faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Papa from 'papaparse';
import { debounce } from '../Utils/Utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DataContext from "../Contexts/DataContext";
import Loading from "../Fragments/Loading";

function Data() {
    const navigate = useNavigate();
    const { rows, setRows, columns, setColumns, setInputs, setOutputs } = useContext(DataContext);

    const CODIFICATIONS = {
        none: 'Ninguna',
        onehot: 'One Hot'
    }

    const inputRef = useRef(null);

    const updateColumn = (e, i) => {
        const tempColumns = [...columns];
        tempColumns[i][0] = e.target.value;
        setColumns(tempColumns);
    }

    const updateField = (e, i, j) => {
        const tempRows = [...rows];
        tempRows[i][j] = e.target.value;
        setRows(tempRows);
    }

    const TYPES = {
        number: 'Numero',
        string: 'Cadena',
        image: '* Imagen',
        audio: '* Audio',
        temporalSerie: '* Serie temporal'
    }

    const swapInputOutput = (i) => {
        const tempColumns = [...columns];
        tempColumns[i][2] = tempColumns[i][2] === '1' ? '0' : '1';
        setColumns(tempColumns);
    }

    const setColumnType = (e, i) => {
        const tempColumns = [...columns];
        tempColumns[i][1] = e.target.value;
        setColumns(tempColumns);
    }

    const getUniqueValues = (column) => {
        const uniques = [];

        for (let i in rows) {
            for (let j in rows[i]) {
                if (column === Number(j) && !uniques.includes(rows[i][j])) {
                    uniques.push(rows[i][j]);
                }
            }
        }

        return uniques;
    }

    const addColumn = () => {
        const tempRows = [...rows];
        const tempCols = [...columns];

        tempCols.push(['Unamed Column', 'number', '0', 'none']);

        for (let i in tempRows) {
            tempRows[i] = [...tempRows[i], ''];
        }

        setColumns(tempCols);
        setRows(tempRows);
    }

    const addRow = () => {
        setRows([...rows, Array.from({ length: columns.length }, () => [])]);
    }

    const requestImport = () => {
        inputRef.current.click();
    }

    const configureData = (data) => {
        const tempRows = [];

        for (let d of data) {
            console.log(Object.values(d))
            tempRows.push(Object.values(d));
        }

        setColumns(Object.keys(data[0]).map(field => {
            let type = 'string';
            if (!isNaN(data[0][field])) {
                type = 'number';
            }
            return [field, type, '0', 'none']
        }));
        setRows(tempRows);
    }

    const handleFileChange = e => {
        const file = e.target.files[0];

        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    configureData(results.data);
                },
                error: (err) => {

                }
            });
        }
    }

    const toOneHot = (j, value) => {
        const uniqueValues = getUniqueValues(j);
        const uniqueValue = uniqueValues.indexOf(value);
        const numClasses = uniqueValues.length

        const oneHot = Array(numClasses).fill(0);
        oneHot[uniqueValue] = 1;
        return oneHot;
    }

    const onSendData = () => {
        const inputCols = columns.map((x, k) => x[2] === '0' ? k : null).filter(x => x !== null);
        const outputCols = columns.map((x, k) => x[2] === '1' ? k : null).filter(x => x !== null);

        let inputs = [];
        let outputs = [];

        for (let i in rows) {
            let currentInput = [];
            let currentOutput = [];

            i = Number(i);
            for (let j in rows[i]) {
                j = Number(j);
                let value = rows[i][j];

                const columnType = columns[j][1];
                const columnCoding = columns[j][3];

                if (columnType === 'string') {
                    if (columnCoding !== 'onehot') {
                        alert('Las redes neuronales no pueden manejar cadenas. Puede usar algun tipo de codificación')
                        return;
                    }
                    value = value.toString();
                } else if (columnType === 'number') {
                    value = Number(value);
                    if (isNaN(value)) {
                        alert('No es posible convertir la columna "'+columns[j][0] + '" a numérica');
                        return;
                    }
                }

                if (columnCoding === 'onehot') {
                    value = toOneHot(
                        j, value
                    );
                } else {
                    value = [value];
                }

                if (inputCols.includes(j)) {
                    currentInput = currentInput.concat(value);
                }
                else if (outputCols.includes(j)) {
                    currentOutput = currentOutput.concat(value);
                }
            }

            inputs.push(currentInput);
            outputs.push(currentOutput);
        }

        setInputs(inputs);
        setOutputs(outputs);

        if(outputs[0].length === 0) {
            alert('No hay ninguna salida');
            return;
        }

        console.log(inputs)
        console.log(outputs)

        navigate('/model/perceptron');
    }

    const setColumnCodification = (e, i) => {
        const tempColumns = [...columns];
        tempColumns[i][3] = e.target.value;
        setColumns(tempColumns);
    }

    return (
        <div className="perceptron-model">
            <Loading show={false} text={'Cargandoo'} />
            <div className="min-h-screen relative items-start">
                <div className="w-96 grid grid-cols-12 p-5 gap-2 fixed overflow-y-scroll h-full pt-16 z-30 bg-white">
                    <div className="col-span-12 grid grid-cols-12 mb-4 gap-3">
                        <h1 className="text-2xl col-span-11 font-bold">Datos de entrenamiento</h1>
                        <input className="hidden" type="file" accept=".csv" onChange={handleFileChange} ref={inputRef} />
                        <div onClick={requestImport} className="border-dotted border-4 border-black col-span-12 text-2xl text-center font-bold py-10 rounded-md">
                            Arrastra tu archivo csv
                        </div>
                    </div>

                    <div className="text-2xl font-bold col-span-12">Tus datos</div>

                    <div className="text-2xl font-bold col-span-11">Registros</div>
                    <div className="col-span-1"><button onClick={addRow}><FontAwesomeIcon icon={faCirclePlus} size="lg" /></button></div>

                    <div className="text-2xl font-bold col-span-11">Columnas</div>
                    <div className="col-span-1"><button onClick={addColumn}><FontAwesomeIcon icon={faCirclePlus} size="lg" /></button></div>
                    {
                        columns.map((x, i) => <>
                            <div className="col-span-12 text-xl font-bold">Columna {i + 1}, "{columns[i][0]}"</div>
                            <div className="text-lg col-span-6">Tipo de dato</div>
                            <select className="col-span-6 text-lg" value={columns[i][1]} onChange={e => setColumnType(e, i)}>
                                {
                                    Object.keys(TYPES).map(type_key => <option value={type_key}>{TYPES[type_key]}</option>)
                                }
                            </select>
                            <div className="text-lg col-span-6">Entrada/Salida</div>
                            <div className="col-span-6 text-lg">
                                <button onClick={() => swapInputOutput(i)}>{['Entrada', 'Salida'][columns[i][2]]}</button>
                            </div>
                            <div className="col-span-6 text-lg">Codificación</div>
                            <div className="col-span-6">
                                <select className="w-full text-lg" value={columns[i][3]} onChange={e => setColumnCodification(e, i)}>
                                    {
                                        Object.keys(CODIFICATIONS).map(cod => <option value={cod}>{CODIFICATIONS[cod]}</option>)
                                    }
                                </select>
                            </div>
                            <hr />
                        </>)
                    }

                    <hr />

                    <div className="text-2xl font-bold col-span-12">Preprocesamiento</div>
                    <hr />
                    <div className="text-xl font-bold col-span-12 py-1">Dividir datos</div>

                    <div className="text-lg col-span-8">Entrenamiento</div>
                    <input type="text" className="text-lg border-2 col-span-4 text-right py-1 px-2" value="70" />

                    <div className="text-lg col-span-8 py-1">Prueba</div>
                    <input type="text" className="text-lg border-2 col-span-4 text-right py-1 px-2" value="30" />

                    <hr />
                    <div className="text-xl font-bold col-span-12 py-1">Acciones adicionales</div>
                    <div className="text-lg col-span-8">Eliminar nulos</div>
                    <input className="col-span-4" type="checkbox" name="" id="" />
                    <br />
                    <button className="text-xl font-bold py-2 border-4 border-black col-span-12 rounded-md" onClick={onSendData}>Enviar datos</button>

                </div>
                <div className="bg-slate-300 relative h-full w-full p-4 overflow-x-scroll pl-96 pt-20 min-h-screen">
                    <table className="table text-lg border-2 border-collapse border-black w-full">
                        <thead>
                            {
                                columns.map((_, i) => <td className="border-2 border-black py-2 px-4 font-bold">
                                    <input className="bg-transparent" type="text" name="" id="" value={columns[i][0]} onChange={e => updateColumn(e, i)} />
                                </td>)
                            }
                        </thead>
                        <tbody>
                            {
                                rows.map((_, i) => <tr>
                                    {
                                        rows[i].map((x, j) => <td className="border-2 border-black py-2 px-4">
                                            <input className="bg-transparent" type="text" name="" id="" value={rows[i][j]} onChange={e => updateField(e, i, j)} />
                                        </td>)
                                    }
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Data;
