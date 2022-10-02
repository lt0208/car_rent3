export default interface Car{
     id?:number,
     year:string,
     brand:string,
     model:string
     price:number
}

export interface Customer{
    id?:number,
    firstName:string,
    lastName:string,
    email:string,
    credit:number
}

export interface Request{
    id?:number,
    status:string,
    dateCreated: string,
    startDate:string,
    endDate:string,
    car?: Car
    customer?:Customer
}
// Be notes, the we used localDate class in Java, the formant is yyyy-mm-dd. so the format should be consistent