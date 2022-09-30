import axios from "axios";

const Car_REST_API_URL = "http://localhost:8080/cars";

class CarService {
    getAllCars = () => {
        return axios.get(Car_REST_API_URL);
    }

    getAllAvailableCars=()=>{
        return axios.get(Car_REST_API_URL+"/available")
    }

    getCarById(id) {
        return axios.get(Car_REST_API_URL + '/' + id) // You CAN'T wrap id with {}, and CAN'T pass {id} either
    }

    updateCar(id, carDetail) {
        return axios.put(Car_REST_API_URL + "/update/" + id, carDetail) // You CAN'T wrap id with {},and CAN'T pass {id} either
    }

    addCar(car) {
        return axios.post(Car_REST_API_URL + "/add", car)
    }

    deleteCar(id) {
        return axios.delete(Car_REST_API_URL + "/delete/" + id) // You CAN'T wrap id with {},and CAN'T pass {id} either
    }
}

export default new CarService();