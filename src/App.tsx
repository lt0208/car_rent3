import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ListCarsComponent from './Components/ListCarsComponent';
import SaveCarComponent from './Components/SaveCarComponent';
import ListRequestsOfCustomerComponent from './Components/ListRequestsOfCustomerComponent';
import MakeRequestComponent from './Components/MakeRequestComponent';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <div className='container'>
        <Routes>
          
          <Route path='/all-cars' element={<ListCarsComponent />}> </Route>
          <Route path='/all-cars/:available' element={<ListCarsComponent />}> </Route>

          <Route path='add-car' element={<SaveCarComponent />}></Route>
          <Route path='/save-car/:id' element={<SaveCarComponent/>}></Route>
          <Route path='/requests/customer/:id' element={<ListRequestsOfCustomerComponent />}></Route>
          <Route path='/make-request/:carId/:customerId' element={<MakeRequestComponent />}></Route>        
         
        </Routes>

      </div>

    </BrowserRouter>

    </div>
  );
}

export default App;
