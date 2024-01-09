import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

import "react-datepicker/dist/react-datepicker.css";
import CitaService from "../servicios/CitaService";

function Cita(props) {
  const [cita, setCita] = useState([]);

  const [id_cita, setId_cita] = useState(0);

  const [id_paciente, setId_paciente] = useState(0);

  const [id_doctor, setId_doctor] = useState(0);

  const [id_consultorio, setId_consultorio] = useState(0);

  const [fecha, setFecha] = useState(new Date());

  const [nombre_paciente, setNombre_paciente] = useState("");

  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    CitaService.getAllCitas()
      .then((response) => {
        setCita(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // El segundo argumento [] significa que este efecto se ejecuta solo al montar/desmontar el componente

  const addCita = () => {
    const citaExistente = cita.find(
      (c) =>
        c.id_consultorio === id_consultorio && c.hora === hora.toISOString()
    );

    //cita con el mismo doctor
    const citaDoctorMismo = cita.find(
      (c) => (c.id_doctor = id_doctor && c.hora === hora.toISOString())
    );

    const citaPacienteExistente = cita.find(
      (c) =>
        c.id_paciente === id_paciente &&
        c.fecha === fecha.toISOString().split("T")[0] &&
        (new Date(c.hora).getTime() === hora.getTime() ||
          Math.abs(new Date(c.hora).getTime() - hora.getTime()) <
            2 * 60 * 60 * 1000)
    );

    if (citaExistente) {
      console.log("la cita ya existe");
      return;
    } else if (citaDoctorMismo) {
      console.log("Ya existe una cita para el mismo doctor y hora");
      return;
    } else if (citaPacienteExistente) {
      console.log(
        "El paciente ya tiene una cita en el mismo día y hora, o con menos de 2 horas de diferencia"
      );
      return;
    }

    const nuevaCita = {
      id_cita: id_cita,
      id_paciente: id_paciente,
      id_doctor: id_doctor,
      id_consultorio: id_consultorio,
      fecha: fecha,
      hora: hora,
      nombre_paciente: nombre_paciente,
    };
    CitaService.addCita(nuevaCita)
      .then((response) => {
        console.log("Cita agregada con éxito:", response.data);
        CitaService.getAllCitas()
          .then((response) => {
            setCita(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error("Error al agregar la cita:", error);
      });
  };

  const eliminarCita = (id_cita) => {
    CitaService.eliminarCita(id_cita)
      .then(() => {
        console.log("Cita eliminada con éxito");
        const updatedCitas = cita.filter((c) => c.id_cita !== id_cita);
        setCita(updatedCitas);
      })
      .catch((error) => {
        console.error("Error al eliminar la cita:", error);
      });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">CITA DE PACIENTES</div>
        <div className="card-body">
          {" "}
          {/**parte de registrar */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              id_cita:{" "}
            </span>
            <input
              type="number"
              value={id_cita}
              onChange={(event) => {
                setId_cita(event.target.value);
              }}
              className="form-control"
              placeholder="cita_id"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              paciente_id:{" "}
            </span>
            <input
              type="number"
              value={id_paciente}
              onChange={(event) => {
                setId_paciente(event.target.value);
              }}
              className="form-control"
              placeholder="paciente_id"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              doctor_id:{" "}
            </span>
            <input
              type="number"
              value={id_doctor}
              onChange={(event) => {
                setId_doctor(event.target.value);
              }}
              className="form-control"
              placeholder="id_doctor"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              consultorio_id:{" "}
            </span>
            <input
              type="number"
              value={id_consultorio}
              onChange={(event) => {
                setId_consultorio(event.target.value);
              }}
              className="form-control"
              placeholder="consultorio_id"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              fecha:{" "}
            </span>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              className="form-control"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Hora:
            </span>
            <TimePicker
              onChange={(time) => setHora(time)}
              value={hora}
              className="form-control"
              disableClock={true} // Deshabilita el reloj para una selección más sencilla
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              nombre del paciente:{" "}
            </span>
            <input
              type="text"
              value={nombre_paciente}
              onChange={(event) => {
                setNombre_paciente(event.target.value);
              }}
              className="form-control"
              placeholder="nombre del paciente"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-success" onClick={addCita}>
            Registrar
          </button>
        </div>
        {/**termina diseño boton  */}
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">id_cita</th>
            <th scope="col">id_paciente</th>
            <th scope="col">id_doctor</th>
            <th scope="col">id_consultorio</th>
            <th scope="col">fecha</th>
            <th scope="col">hora</th>
            <th scope="col">nombre del paciente</th>
            <th scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          {cita.map((val, key) => (
            <tr key={val.id_cita}>
              {" "}
              {/**id */}
              <td>{val.id_cita}</td>
              <td>{val.id_paciente}</td>
              <td>{val.id_doctor}</td>
              <td>{val.id_consultorio}</td>
              <td>{val.fecha}</td>
              <td>{val.hora}</td>
              <td>{val.nombre_paciente}</td>
              <td>
                {" "}
                {/**botones  */}
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button
                    type="button"
                    onClick={() => {
                      eliminarCita(val.id_cita);
                    }}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
      {/**termina tabla */}
    </div>
  );
}

export default Cita;
