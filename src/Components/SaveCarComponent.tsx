import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarService from '../services/CarService';
import Car from './Interfaces';

const SaveCarComponent = () => {
    const { id } = useParams() // the object property must be "id", the same as the path variable "id"
    const [carObj, setCarObj] = useState<Car>({
        id: -1,
        year: '',
        brand: '',
        model: '',
        price: 0
    });
    const navigate = useNavigate();

    const saveChange = (e: React.MouseEvent<HTMLElement>) => {
        console.log(carObj)
        e.preventDefault();
        if (id) {
            CarService.updateCar(parseInt(id), carObj).then((Response: any) => { // CAN'T pass {id} to the function
                navigate("/all-cars")
            }).catch((e: any) => {
                alert(e.response.data)
                console.log(e);
            }
            )
        } else {
            CarService.addCar(carObj).then((Response: any) => {
                navigate("/all-cars")
            })
        }
    }

    useEffect(

        () => {
            if (id) {
                CarService.getCarById(parseInt(id)).then((Response: any) => {
                    setCarObj(Response.data)
                    //console.log("-------------") // Be noted: often use console.log to see your current status and check the provious steps
                    console.log(carObj) // when I use const {  carId } = useParams(), this log didn't display anything!! So, remember to use console.log
                }).catch((e: any) => {
                    alert(e.response.data)
                    console.log(e);
                }
                )
            }
        }, []
    )


    return (
        <div>SaveCarComponent
            <form>
                <div  >
                    <label >Year
                        <input type="text" className="form-control" id="year" value={carObj.year}
                            onChange={e => setCarObj({ ...carObj, 'year': e.target.value })}></input> </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Brand
                        <input type="text" className="form-control" value={carObj.brand} onChange={e => setCarObj({ ...carObj, 'brand': e.target.value })}></input>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Model
                        <input type="text" className="form-control" value={carObj.model} onChange={e => setCarObj({ ...carObj, 'model': e.target.value })}></input>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Price
                        <input type="text" className="form-control" value={carObj.price} onChange={e => setCarObj({ ...carObj, 'price': parseInt(e.target.value) })}></input>
                    </label>
                </div>
                <button className="btn btn-primary" onClick={saveChange}>Submit</button>
            </form>
        </div>
    )
}

export default SaveCarComponent