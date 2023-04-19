
import './App.css';
import Table from './table';
import data from './dummy';

function App() {
  const column = ["title", "id", "read"]
  return (
    <Table rowData={data} columns ={column} rowsPerPage={5}/>
  );
}

export default App;
