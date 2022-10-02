import CarService from "../services/CarService";
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Car from "./Interfaces";

const ListCarsComponent = () => {
    const [carsList, setCarsList] = useState([]);
    const { available } = useParams();
    var tableRow = 0;
    var customerId = 3;

    const deletion = (id: number) => {

        CarService.deleteCar(id).then((Response: any) => {
            if (available) {
                readAvailableCars();
            } else {
                readAllCars();
            }
        }).catch((e: string) => console.log(e));// CAN'T pass {id} to the function

    }

    const readAvailableCars = () => {
        CarService.getAllAvailableCars()
            .then((Response: any) => {
                setCarsList(Response.data)
                console.log("carsList: " + carsList + " response data: " + Response.data)
            }).catch((e: string) => { console.log(e) })
    }

    const readAllCars = () => {
        CarService.getAllCars()
            .then((Response: any) => {
                setCarsList(Response.data)
                console.log("carsList: " + carsList + " response data: " + Response.data)
            }).catch((e: string) => { console.log(e) })
    }

    useEffect(() => {
        if (available) {
            readAvailableCars();
        } else {
            readAllCars();
        }
    }, [])

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr> <th scope="col">#</th>
                        <th>Year</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        carsList.map(
                            (car: Car) => {
                                return (
                                    //conditional expression should be outside of JSX, if statements can't be inside of the JSX,
                                    // or you could use a ternary expression in {} instead
                                    //or use && in {}
                                    <tr key={car.id}>
                                        <th scope="row">{++tableRow}</th>
                                        <td>{car.year}</td>
                                        <td>{car.brand}</td>
                                        <td>{car.model}</td>
                                        <td>{car.price}</td>
                                        <td>                                            
                                            {(available) && <Link className="btn btn-success" to={`/make-request/${car.id}/${customerId}`} >Request</Link>}
                                            {(!available) && <Link className="btn btn-primary" to={`/save-car/${car.id}`}>Update</Link>}
                                           <>{available? <></> : <button className="btn btn-danger" onClick={() => { if (car.id) { deletion(car.id) } }} >Delete</button>}</> 
                         
                                        </td>
                                    </tr>)
                            }
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ListCarsComponent
