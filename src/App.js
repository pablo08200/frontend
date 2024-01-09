import logo from './logo.svg';
import './App.css';
import ListDoctors from './componentes/ListDoctors';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cita from './componentes/Citas';
import DoctorService from './servicios/DoctorService';


function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element = {<inicio/>}/>
          
          <Route path='/Cita' element={<Cita />}></Route>
          <Route path='/DoctorService' element={<DoctorService />}></Route>
          

        </Routes>
      </Router>
   
  );
}
function inicio(){
  <ul>
    <li>
     <Link to="/Citas">Ir a plantilla de citas</Link>
    </li>
    <li>
      <Link to="/DoctorService">Ir a plantilla de doctores</Link>
    </li>
  </ul>
}

export default App;
