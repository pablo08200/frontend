import axios from 'axios';
const DOCTOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/doctors/getall';


class DoctorService{
    
    getAllDoctors(){

        return axios.get(DOCTOR_BASE_REST_API_URL)
    }

}
export default new DoctorService();