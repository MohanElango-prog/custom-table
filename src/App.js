
import './App.css';
import Table from './table';
import data from './dummy';

function App() {
  const column = ["id", "first_name", "email", "ip_address", "date"]
  const sortCol = ["id", "first_name", "date"]
  return (
    <Table rowData={data} columns ={column} rowsPerPage={100} sortableColumns ={sortCol}/>
  );
}

export default App;
