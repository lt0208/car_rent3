import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CarService from '../services/CarService';
import RequestService from '../services/RequestService';
import Car, { Request } from './Interfaces';


const ListRequestsComponent = (props: any) => {
    const navigate = useNavigate();

    const changeStatus = (requestId: number, statusId: number) => {

        RequestService.handleRequest(requestId, statusId).then(
            (Response: any) => {
                window.location.reload(); // an old fashion to refresh a page!!
                console.log("id: " + requestId + "statusID: " + statusId + " request: " + JSON.stringify(Response))
            }
        ).catch((e: any) => {
            alert(e.response.data)
            console.log(e);
        }
        )
    }
    var tableRow = 0;

    useEffect(
        () => {

        }, []
    )
    return (
        <table className="table table-striped">
            <thead>
                <tr><th scope="col">#</th>
                    <th>Request Id</th>
                    <th>Request  date</th>
                    <th>Car</th>
                    <th>Price</th>
                    <th>start date</th>
                    <th>End date</th>
                    <th>Status</th>
                    <th>Operation</th>

                </tr>
            </thead>

            <tbody>
                {
                    props.requests.map(
                        (request: Request) => {
                            //tableRow++; // or update tableRow here
                            return (
                                //<GetCar request={request} show="model"/>; Approach1:Pass data through props to GetCar, and directly use the returned React-element
                                // <GetCar2 request={request} car={carObj} setCar={setCarObj} />; Approach2: it's supposed to be able to access updated carObj. But doesn't work well
                                <>
                                    <tr key={request.id}>
                                        <td scope="row">{++tableRow}</td>
                                        <td>{request.id}</td>
                                        <td>{request.dateCreated}</td>
                                        <GetCar request={request} show="car" />
                                        <GetCar request={request} show="price" />
                                        <td>{request.startDate}</td>
                                        <td>{request.endDate}</td>
                                        <td>{request.status}</td>
                                        <td>
                                            {props.isCustomer && request.status === "APPROVED" &&
                                                <button className='btn btn-success' onClick={() => {
                                                    if (request.id) { changeStatus(request.id, 4) }
                                                }}>Return Car</button>}

                                            {props.isCustomer && request.status === "SUBMITTED" &&
                                                <button className='btn btn-warning' onClick={() => {
                                                    if (request.id) { changeStatus(request.id, 2) }
                                                }}>Cancel Car</button>}

                                            {!props.isCustomer && request.status === "APPROVED" &&
                                                <button className='btn btn-success' onClick={() => {
                                                    if (request.id) { changeStatus(request.id, 4) }
                                                }}>Return Car</button>}

                                            {!props.isCustomer && request.status === "SUBMITTED" &&
                                                <button className='btn btn-primary' onClick={() => {
                                                    if (request.id) { changeStatus(request.id, 1) }
                                                }}>Approve</button>}

                                            {!props.isCustomer && request.status === "SUBMITTED" &&
                                                <button className='btn btn-warning' onClick={() => {
                                                    if (request.id) { changeStatus(request.id, 3) }
                                                }}>Deny</button>}


                                        </td>
                                    </tr>
                                </>)
                        })}
            </tbody>
        </table>
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
        if (props.request.car && props.request.car.id) {
            CarService.getCarById(props.request.car.id).then((Response: any) => {
                setCar(Response.data);
            }).catch((e: any) => {
                alert(e.response.data)
                console.log(e);
            }
            )
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


export default ListRequestsComponent;
