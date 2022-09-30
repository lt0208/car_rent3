import CarService from "../services/CarService";
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Car from "./Interfaces";

const ListCarsComponent = () => {
    const [carsList, setCarsList] = useState([]);
    var tableRow = 0;
    var customerId = 3;

    const deletion = (id:number) => {
        
        CarService.deleteCar(id).then((Response:any) => {displayCars(); }).catch((e:string) => console.log(e));// CAN'T pass {id} to the function
        
    }

    const displayCars = () => {
        CarService.getAllAvailableCars()
            .then((Response:any) => {
                setCarsList(Response.data)
                console.log("carsList: " +carsList + " response data: "+Response.data)
            }).catch((e:string) => { console.log(e) })
    }

    useEffect(() => {
        displayCars();

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
                            (car:Car) => {
                                return(
                                <tr key={car.id}>
                                    <th scope="row">{++tableRow}</th>
                                    <td>{car.year}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.model}</td>
                                    <td>{car.price}</td>
                                    <td>
                                        <Link className="btn btn-primary" to={`/save-car/${car.id}`}>Update</Link>
                                        <button className="btn btn-danger" onClick={() => deletion(car.id)} >Delete</button>
                                        <Link className="btn btn-success" to={`/make-request/${car.id}/${customerId}`} >Request</Link>
                                        
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
