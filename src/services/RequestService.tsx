import axios from "axios";
import { Request } from "../Components/Interfaces";
const REQUESTS_REST_API_URL = "http://localhost:8080/requests";

class RequestService {
    getAllRequests() {
        return axios.get(REQUESTS_REST_API_URL + "/all");
    }

    getAllSubmittedRequests() {
        return axios.get(REQUESTS_REST_API_URL + "/submitted")
    }

    getRequestsOfCustomer(id: number) {
        return axios.get(REQUESTS_REST_API_URL + "/customer/" + id) // You CAN'T wrap id with {},and CAN'T pass {id} either
    }

    makeRequest(request: any) {
        return axios.post(REQUESTS_REST_API_URL + "/make", request)
    }

    handleRequest(requestId: number, statusId: number) { 
        console.log("++id: " + requestId + " ++statusID: " + statusId)
        return axios.put(REQUESTS_REST_API_URL + "/handle/" + requestId + "/" + statusId) // You CAN'T wrap id with {},and CAN'T pass {id} either
        // Note: it's difficult to pass a enum parameter, so I modify the backend code to let it take int statusId as path variable!!
    }

}

export default new RequestService();