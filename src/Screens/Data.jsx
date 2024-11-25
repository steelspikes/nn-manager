import React, { useEffect, useRef, useState } from "react";
import PerceptronPlot from "../Fragments/PerceptronPlot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMinus, faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Papa from 'papaparse';
import {debounce} from '../Utils/Utils';

function Data() {
    const [rows, setRows] = useState([
        [1, 2],
        [2, 4],
        [3, 6],
        [4, 8]
    ])

    const [columns, setColumns] = useState([
        ['X', 'int', '0'], //Entrada
        ['Y', 'int', '1'] //Salida
    ]);

    const [uniqueValues, setUniqueValues] = useState([]);

    const [resultType, setResultType] = useState('regression');

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
        int: 'Entero',
        string: 'Cadena',
        image: '* Imagen',
        audio: '* Audio',
        temporalSerie: '* Serie temporal'
    }

    const RESULT_TYPE = {
        classification: 'Clasificación',
        regression: 'Regresión'
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

    useEffect(() => {
        if(resultType === 'classification') {
            updateUniqueValues();
        }
    }, [rows, resultType]);

    const updateUniqueValues = () => {
        const uniques = Array.from({ length: rows[0].length }, () => []);

        for(let i in rows) {
            for(let j in rows[i]) {
                if(!uniques[j].includes(rows[i][j])) {
                    uniques[j].push(rows[i][j]);
                }
            }
        }

        setUniqueValues(uniques);
    }

    const addColumn = () => {
        const tempRows = [...rows];
        const tempCols = [...columns];

        tempCols.push(['Unamed Column', 'int', '0']);

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

        for(let d of data) {
            tempRows.push(Object.values(d));
        }
        
        setColumns(Object.keys(data[0]).map(field => [field, 'string', '0']));
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

    return (
        <div className="perceptron-model">
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

                    <div className="text-lg col-span-8">¿Qué desea hacer?</div>
                    <select className="col-span-4" value={resultType} onChange={e => setResultType(e.target.value)}>
                        {
                            Object.keys(RESULT_TYPE).map(res_type => <option value={res_type}>{RESULT_TYPE[res_type]}</option>)
                        }
                    </select>

                    <div className="text-2xl font-bold col-span-11">Registros</div>
                    <div className="col-span-1"><button onClick={addRow}><FontAwesomeIcon icon={faCirclePlus} size="lg" /></button></div>

                    <div className="text-2xl font-bold col-span-11">Columnas</div>
                    <div className="col-span-1"><button onClick={addColumn}><FontAwesomeIcon icon={faCirclePlus} size="lg" /></button></div>
                    {
                        columns.map((x, i) => <>
                            <div className="col-span-6">{columns[i][0]}</div>

                            <select className="col-span-3" value={columns[i][1]} onChange={e => setColumnType(e, i)}>
                                {
                                    Object.keys(TYPES).map(type_key => <option value={type_key}>{TYPES[type_key]}</option>)
                                }
                            </select>
                            <div className="col-span-3">
                                <button onClick={() => swapInputOutput(i)}>{['Entrada', 'Salida'][columns[i][2]]}</button>
                            </div>
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
                                            {
                                                resultType === 'classification' && <span className="text-sm text-gray-500">({
                                                    uniqueValues.length > Number(j) && uniqueValues[j].indexOf(rows[i][j])
                                                })</span>
                                            }
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
