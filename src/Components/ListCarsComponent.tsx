import CarService from "../services/CarService";
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
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
        }).catch((e: any) => {
            alert(e.response.data)
            console.log(e);
        }            
        );// CAN'T pass {id} to the function

    }

    const readAvailableCars = () => {
        CarService.getAllAvailableCars()
            .then((Response: any) => {
                setCarsList(Response.data)
                console.log("carsList: " + carsList + " response data: " + Response.data)
            }).catch((e: any) => {
                alert(e.response.data)
                console.log(e);
            }            
            )
    }

    const readAllCars = () => {
        CarService.getAllCars()
            .then((Response: any) => {
                setCarsList(Response.data)
                console.log("carsList: " + carsList + " response data: " + Response.data)
            }).catch((e: any) => {
                alert(e.response.data)
                console.log(e);
            }            
            )
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
            {!available && <Link className="btn btn-primary" to={"/add-car"}>Add New Car</Link>}
            <div id="alert"></div>

            <table className="table table-striped">
                <thead>
                    <tr> <th scope="col">#</th>
                        <th>Car Id</th>
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
                                        <td>{car.id}</td>
                                        <td>{car.year}</td>
                                        <td>{car.brand}</td>
                                        <td>{car.model}</td>
                                        <td>{car.price}</td>
                                        <td>
                                            {(available) && <Link className="btn btn-success" to={`/make-request/${car.id}/${customerId}`} >Request</Link>}

                                            {(!available) && <Link className="btn btn-primary" to={`/update-car/${car.id}`}>Update</Link>}

                                            {!available && <button className="btn btn-danger" onClick={() => {
                                                if (car.id) {
                                                    deletion(car.id)
                                                }
                                            }} >Delete</button>}

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
