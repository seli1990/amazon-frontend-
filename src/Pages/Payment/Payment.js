import React, {useContext,useState} from 'react';
import Layout from '../../Components/Layout/Layout';
import classes from "./Payment.module.css";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../API/axios';
import { ClipLoader } from 'react-spinners';
import {db} from '../../Utility/firebase'
import { useNavigate} from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {
const [{user,basket},dispatch]= useContext(DataContext)
// console.log(user);
const totaItem=basket?.reduce((amount,item)=>{
  return item.amount+amount
},0)
const total = basket.reduce((amount, item) => {
  return item.price*item.amount + amount;
}, 0);


const [CardError,setCardError]=useState(null);
const [processing,setprocessing]=useState(false)



const stripe = useStripe();
const elements = useElements();
const navigate= useNavigate();
const handleChange = (e) => {
  // console.log(e);
  e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
};

const handlePayment = async(e)=>{
e.preventDefault();

try{
  setprocessing(true)
  //backend function contact clinet secret
const response =await axiosInstance({
  method:"post",
  url:`/payment/create?total=${total*100}`,
});
// console.log(response.data);
const clientSecret = response.data?.clientSecret;
//client side react side confirmation
const {paymentIntent} = await stripe.confirmCardPayment(
  clientSecret,
  {
    payment_method:{
      card:elements.getElement(CardElement ),
  },
 
  });

  await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
//empty the basket
dispatch({type:Type.EMPTY_BASKET})


// console.log(paymentIntent)
setprocessing(false)
navigate("/orders",{ state: { message:"you have placed new order"}})
}catch(error){
console.log(error)
setprocessing(false)
}









}


  return (
    <Layout>

 <div  className={classes.payment_header}>Checkout ({totaItem}) item</div>

<section className={classes.payment}>
<div className={classes.flex}>
  <h3>Delivered Address</h3>
 <div>
  <div>{user?.email}</div>
  <div>7184 state lane</div>
  <div>Chicago,IL </div>
</div>
</div>
<hr/>
<div className={classes.flex}>
<h3>Review items and delivery</h3>
<div>
{
  basket?.map((item)=><ProductCard product={item} flex={true}/>)
}
</div>
</div>
<hr/>

<div className={classes.flex}>
<h3>payment methods</h3>
<div className={classes.payment_card_container}>
<div className={classes.payment_details}> 
  <form onSubmit={handlePayment}>
    {CardError && <small style={{color:"red"}}>{CardError}</small>}
    <CardElement  onChange={handleChange}/> 

<div className={classes.payment_price}>
<div>
<span style={{display:"flex",gap:"10px"}}>
  <p>Total Order|</p> <CurrencyFormat amount={total}/>
</span>
</div>
<button type='submit'>
  {
    processing?(
      <div className={classes.loading}>
        <ClipLoader  color='gray' size={12}  />
        <p>Please wait ...</p>
      </div>

    ):" pay now"
  }
  
 
  
  
  
  </button>
</div>








  </form>
  </div>


</div>








</div>










</section>
      


     



    </Layout>
  );
}

export default Payment;
