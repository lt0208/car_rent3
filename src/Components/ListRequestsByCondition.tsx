/* eslint-disable no-unused-expressions */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, Suspense, useRef } from 'react'
import RequestService from '../services/RequestService'
import CarService from '../services/CarService'
import Car, { Customer, Request } from './Interfaces'
import CustomerService from '../services/CustomerService'
import ListRequestsComponent from './ListRequestsComponent'

const ListRequestsByCondition = () => {
    const { customerId } = useParams();

    const { submitted } = useParams();
    const [requests, setRequests] = useState<Array<Request>>([]);
    const [customer, setCustomer] = useState<Customer>({
        firstName: '',
        lastName: '',
        email: '',
        credit: 0
    });

   

    useEffect(() => {
        if ( customerId) {
            RequestService.getRequestsOfCustomer(parseInt(customerId)).
                then((Response: any) => {
                    setRequests(Response.data)
                    console.log(Response.data)
                }).catch((e: any) => {
                    console.log(e)
                    alert(e.response.data)
                })

            CustomerService.getCustomerById(parseInt(customerId)).
                then((Response: any) => {
                    setCustomer(Response.data)
                    console.log(JSON.stringify(Response.data))
                }
                ).catch((e: any) => {
                    console.log(e)
                    alert(e.response.data)
                })
        } else if (submitted) {
            RequestService.getAllSubmittedRequests().then((Response: any) => {
                setRequests(Response.data)
            }).catch((e: any) => {
                console.log(e)
                alert(e.response.data)
            })

        } else {
            RequestService.getAllRequests().then((Response: any) => {
                setRequests(Response.data)
            }).catch((e: any) => {
                console.log(e)
                alert(e.response.data)
            })
        }
    }, [])

    return (
        <div className="container">

            {customerId &&
                <div className="container" >
                    <h2>Customer Account:</h2>
                    <h3>First Name: {customer.firstName}</h3>
                    <h2>Last Name: {customer.lastName}</h2>
                    <h2>Email: {customer.email}</h2>
                    <h2>Credit: {customer.credit}</h2>
                </div>
            }

           <div> {customerId? <ListRequestsComponent isCustomer={true} requests={requests}/> : <ListRequestsComponent isCustomer={false} requests={requests}/> } </div> 

        </div>
    )
}


export default ListRequestsByCondition;
