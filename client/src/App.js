import './App.css';
import Main from './Components/Main';

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemInfo from './Components/ItemInfo';
import Imgup from './Components/Imgup';
import Imgdown from './Components/Imgdown';
import Mysidenav from './Components/Mysidenav.js';
import AdminLogin from './Components/AdminLogin';
import CustomerLogin from './Components/CustomerLogin';
import SellerLogin from './Components/SellerLogin';
import AddBooks from './Components/AddBooks';


function App() {
 
  return (

    <>     
     
      <Router>
         <Mysidenav />
        <Routes >
          <Route exact path='/' element={<Main />} />
          <Route exact path='/ItemInfo/:param1' element={<ItemInfo />} />
          <Route exact path='/AdminLogin' element={<AdminLogin />} />
          <Route exact path='/CustomerLogin' element={<CustomerLogin />} />
          <Route exact path='/SellerLogin' element={<SellerLogin />} />
          
          <Route exact path='/Imgup' element={<Imgup />} />
          <Route exact path='/Imgdown' element={<Imgdown />} />
          <Route exact path='/addBooks' element={<AddBooks/>} />

        </Routes>
      </Router>
       
      {/* aaa */}

    </>
  );
}

export default App;