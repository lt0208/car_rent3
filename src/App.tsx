import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ListCarsComponent from './Components/ListCarsComponent';
import SaveCarComponent from './Components/SaveCarComponent';
import ListRequestsOfCustomerComponent from './Components/ListRequestsByCondition';
import MakeRequestComponent from './Components/MakeRequestComponent';
import Headers from './Components/Headers';
import ListRequestsByCondition from './Components/ListRequestsByCondition';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <div className='container'>
        <Headers />
        <Routes>
        <Route path='/' element={<ListCarsComponent />}> </Route>
          
          <Route path='/all-cars' element={<ListCarsComponent />}> </Route>
          <Route path='/all-cars/:available' element={<ListCarsComponent />}> </Route>

          <Route path='/add-car' element={<SaveCarComponent />}></Route>
          <Route path='/update-car/:id' element={<SaveCarComponent/>}></Route>

          <Route path='/all-requests' element={<ListRequestsByCondition />}></Route>
          <Route path='/all-requests/:submitted' element={<ListRequestsByCondition />}></Route>
          <Route path='/all-requests/customer/:customerId' element={<ListRequestsByCondition />}></Route>

          <Route path='/make-request/:carId/:customerId' element={<MakeRequestComponent />}></Route>        
         
        </Routes>
      </div>
    </BrowserRouter>

    </div>
  );
}

export default App;
