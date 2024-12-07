import { createContext } from "react";

const DataContext = createContext({
  rows: [],
  setRows: (p) => {},
  columns: [],
  setColumns: (p) => {},
  inputs: [],
  setInputs: (p) => {},
  outputs: [],
  setOutputs: (p) => {}
});

export default DataContext;