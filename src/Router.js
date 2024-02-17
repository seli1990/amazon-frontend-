import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Landing from './Pages/Landing/Landing';
 import Auth from './Pages/Auth/Auth';
 import Payment from './Pages/Payment/Payment';
 import Orders from './Pages/Orders/Orders';
 import Cart from './Pages/Cart/Cart';
 import Results from './Pages/Results/Results';
 import ProductDetail from './Pages/ProductDetails/ProductDetails';
 import {Elements} from '@stripe/react-stripe-js';
 import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute';

 const stripePromise = loadStripe('pk_test_51OitNwGF5VB5Kw1O8QHWzEZaU3Vz7DABSvV1uUH4Qp1H22llyPGWD91THcBhNcvxI6wrmhDBlBu4QvLk7GlOlrjT00l54tl7BU');
 
 function Routing() {
   return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/payment" element={

        <ProtectedRoute
         msg={"you must log in to pay"} 
         redirect={"/payment"}        >
          <Elements stripe={stripePromise}>
          <Payment />
          </Elements>
        </ProtectedRoute>
        } />
      

      <Route path="/orders" element={
      
      <ProtectedRoute
      msg={"you must log in to  access your orders"}
      redirect={"/orders"}
      >
     <Orders />
        </ProtectedRoute>
  } />
    
     
    
    
    
  



      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productID" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
);
}

 export default Routing;







 
 