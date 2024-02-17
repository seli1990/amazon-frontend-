import React, { useContext } from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/firebase"
function Header() {

  const[{user,basket},dispatch]=useContext(DataContext)
  console.log(basket.length)
const totaItem=basket?.reduce((amount,item)=>{
  return item.amount+amount
},0)



  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to='/'>
              <img src='https://pngimg.com/uploads/amazon/small/amazon_PNG11.png' alt="amazon logo" />
            </Link>

            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type='text' />
            <BsSearch size={38} />
          </div>

          <div className={classes.order_container}>
            <Link to='' className={classes.language}>
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png" alt="USA flag" />
              <select name='' id=''>
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"}>
              <div>
{

user?(
  <>
   <p>Hello {user?.email?.split("@")[0]}</p>
   <span onClick={()=>auth.signOut()}>Sign out</span>
    </>

):(
  <>
  <p>Hello,Sign In</p>
  <span>Account & Lists</span> 
  </>

)
}

               
               
             

              </div>
              
              
            </Link>

            <Link to='/orders'>
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            <Link to='/cart' className={classes.cart}>
              <BiCart size={35} />
              <span>{totaItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   