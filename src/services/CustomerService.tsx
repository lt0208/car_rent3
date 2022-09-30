import axios from "axios";

const  Customer_REST_API_URL = "http://localhost:8080/customers";

class CustomerService{
    getCustomerById(customerId:number){
        return axios.get(Customer_REST_API_URL+"/"+customerId)
    }

    addCustomer(customer:number){
        return axios.post(Customer_REST_API_URL+"/add",customer)
    }
}

export default new CustomerService();