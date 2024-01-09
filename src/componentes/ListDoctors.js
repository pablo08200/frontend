import React, { useEffect,useState } from 'react';
import axios from 'axios';
import DoctorService from '../servicios/DoctorService';
import "bootstrap/dist/css/bootstrap.min.css";

const ListDoctors = () => {
    
    const [doctors,setDoctors] = useState([]);
    useEffect(() => {
        DoctorService. getAllDoctors().then((response) =>{
            setDoctors(response.data);
        }).catch(err => {
            console.log(err);
        })
            
        
        
    }, []); // El segundo argumento [] significa que este efecto se ejecuta solo al montar/desmontar el componente


    return (
        <div className='container'>
        <h2>Lista de Doctores</h2>
        <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Especialidad</th>
                </tr>
            </thead>
            <tbody>
                {doctors.map(doctor => (
                    <tr key={doctor.id_doctor}>
                        <td>{doctor.id_doctor}</td>
                        <td>{doctor.nombre}</td>
                        <td>{doctor.apellido_paterno}</td>
                        <td>{doctor.apellido_materno}</td>
                        <td>{doctor.especialidad}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    );
}

export default ListDoctors;