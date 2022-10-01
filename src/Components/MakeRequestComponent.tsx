import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarService from '../services/CarService';
import CustomerService from '../services/CustomerService';
import RequestService from '../services/RequestService';
import * as React from 'react';
import Car, { Customer, Request } from './Interfaces';

import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';


const MakeRequestComponent = () => {

  const { carId } = useParams();
  const [dateRange, setDateRange] = React.useState<DateRange<Dayjs>>([null, null]);
  const { customerId } = useParams();
  //console.log("carId " + carId + " customerId " + customerId)
  const navigate = useNavigate();
  const [car, setCar] = useState<Car>({
    id: -1,
    year: '',
    brand: '',
    model: '',
    price: 0
  });

  const [customer, setCustomer] = useState<Customer>({
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    credit: 0
  });
  const [request, setRequest] = useState<Request>({
    id: -1,
    status: '',
    dateCreated: '',
    startDate: '',
    endDate: ''
  })


  const submitChange = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    RequestService.makeRequest(request).then((Response: any) => {
      console.log("request: " + JSON.stringify(request) + "response data  " + Response.data)
      navigate('/requests/customer/' + customerId)
    }).catch(e => console.log(e))
  }


  useEffect(() => {
    if (carId) {
      CarService.getCarById(parseInt(carId)).then((Response: any) => {
        setCar(Response.data);// it's not good to set the car obj of request here, if the below CustomerService did the same thing
        console.log("+++car: " + JSON.stringify(car) + " response data: " + Response.data)
      }).catch((e: string) => console.log(e))
    }

    if (customerId) {
      CustomerService.getCustomerById(parseInt(customerId)).then((Response: any) => {
        setCustomer(Response.data);// it's not good to set the customer obj of request here, if the above CarService did the same thing. 
        //Why? Two async fucntion modifying the same state isn't a good idea, I believe
        console.log("+++customer: " + JSON.stringify(customer) + " response data: " + Response.data)
      }).catch((e: string) => console.log(e))

    }
  }, [])



  return (
    <div>MakeRequestComponent

      <form>
        <h1>Hi, {customer.firstName}, welcome to our car booking service!</h1>

        <div>

          <h2>Car: {car.brand} - {car.model}</h2>

        </div>
        <div> Select Date Range
        <BasicDateRangePicker dateRangeChild = {dateRange} setDateRangeChild = {setDateRange}/>
        </div>
        

        <button className='btn btn-primary' onClick={submitChange} >Submit</button>

      </form>
    </div>
  )
}



export function BasicDateRangePicker(props:any) {
  

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: 'Start Date', end: 'End Date' }}
    >
      <DateRangePicker
        value={props.dateRangeChild}
        onChange={(newValue) => {
          props.setDateRangeChild(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

export default MakeRequestComponent;