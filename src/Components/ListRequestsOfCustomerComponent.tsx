/* eslint-disable no-unused-expressions */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, Suspense, useRef } from 'react'
import RequestService from '../services/RequestService'
import CarService from '../services/CarService'
import Car, { Request } from './Interfaces'

const ListRequestsOfCustomerComponent = () => {
    const { id } = useParams();
    const [requests, setRequests] = useState([]);
    var tableRow = 0;
    //const [carObj, setCarObj] = useState({}); //Approach2 to get car info for each request, carObj will be passed to GetCar2 component


    useEffect(() => {
        if (id) {
            RequestService.getRequestsOfCustomer(parseInt(id)).
                then((Response: any) => {
                    setRequests(Response.data);
                }).catch((e: any) => console.log(e))
        }
    }, [])

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr><th scope="col">#</th>
                        <th>Request  date</th>
                        <th>Car</th>
                        <th>Price</th>
                        <th>start date</th>
                        <th>End date</th>
                        <th>Status</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        requests.map(
                            (request: Request) => {
                                //tableRow++; // or update tableRow here
                                return (
                                    //<GetCar request={request} show="model"/>; Approach1:Pass data through props to GetCar, and directly use the returned React-element
                                    // <GetCar2 request={request} car={carObj} setCar={setCarObj} />; Approach2: it's supposed to be able to access updated carObj. But doesn't work well
                                    <>
                                        <tr key={request.id}>
                                            <th scope="row">{++tableRow}</th>
                                            <td>{request.dateCreated}</td>
                                            <GetCar request={request} show="car" />
                                            <GetCar request={request} show="price" />
                                            <td>{request.startDate}</td>
                                            <td>{request.endDate}</td>
                                            <td>{request.status}</td>
                                        </tr>
                                    </>)
                            })}

                </tbody>
            </table>

        </div>
    )
}
interface Props {
    request: Request,

    show: string
}

export const GetCar = (props: Props) => {
    const [car, setCar] = useState<Car>({
        id: -1,
        year: '',
        brand: '',
        model: '',
        price: 0
    })

    useEffect(() => {
        if (props.request.car) {
            CarService.getCarById(props.request.car.id).then((Response: any) => {
                setCar(Response.data);
            }).catch((e: string) => console.log(e))
        }

    }, [])

    switch (props.show) {
        case "car":
            return <td>{car.brand} - {car.model}</td>;
        case "price":
            return <td>{car.price}</td>
        default:
            return null;
    }

}

export const GetCar2 = (props: any) => {

    useEffect(() => {
        CarService.getCarById(props.request.car.id).then((Response: any) => {
            props.setCar(Response.data)
            console.log("carobjjjjj")
            console.log(props.car)
        }).catch((e: any) => console.log(e))
    }, [])
}


export default ListRequestsOfCustomerComponent;
