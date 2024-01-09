import axios from 'axios';
const CITA_BASE_REST_API_URL = 'http://localhost:8080/api/v1/cita';




class CitaService{
    
    getAllCitas() {
        return axios.get(`${CITA_BASE_REST_API_URL}/getAllCitas`);
    }

    addCita(citaData) {
        return axios.post(`${CITA_BASE_REST_API_URL}/create-cita`, citaData);
    }

    eliminarCita(id_cita) {
        return axios.delete(`${CITA_BASE_REST_API_URL}/delete-cita/${id_cita}`);
      }
}
export default new CitaService();