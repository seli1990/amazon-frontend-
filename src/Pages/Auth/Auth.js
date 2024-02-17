import React from 'react';
import classes from './Auth.module.css';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useState,useContext } from 'react';
import {auth} from '../../Utility/firebase';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth" 
import{DataContext} from '../../Components/DataProvider/DataProvider'
import { ClipLoader } from 'react-spinners';
import { Type } from '../../Utility/action.type';

function Auth() {
 const[email,setEmail]=useState("");
 const[password,setpassword]=useState("");
 const[error,setError]=useState(""); 
 const[loading,setLoading]=useState({
   signIn:false,
   signUp:false

 })

 const[{user},dispatch]=useContext(DataContext)
console.log(user);
const navigate=useNavigate()
const navStateData = useLocation()

//  console.log(password,email);
const authHandler=async(e)=>{
  e.preventDefault();
  console.log(e.target.name);
  if(e.target.name == "signin"){
    setLoading({...loading,signIn:true})
signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
  // console.log(userInfo)
  dispatch({
    type:Type.SET_USER,
    user:userInfo.user,
  });
    setLoading({...loading,signIn:false})
  navigate(navStateData?.state?.redirect || "/");
}).catch((error)=>{
  // console.log(error.message); 
  setError(error.message); 
})


  }else{
    setLoading({...loading,signUp:true})
createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
  // console.log(userInfo);
 
  dispatch({
    type:Type.SET_USER,
    user:userInfo.user,
  });
  setLoading({...loading,signUp:false})
  navigate(navStateData?.state?.redirect || "/");
})
.catch((error)=>{ 
  // console.log(error.message); 
  setError(error.message);
  setLoading({...loading,signUp:false})  
})
  }
}



  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png" alt='' />
      </Link>

<div className={classes.login_container}>

<h1>SIGN In</h1>
{navStateData ?.state?.msg && (
  <small style={{
    padding: "5px",
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  }}>
    {navStateData.state.msg}
  </small>
)}
<form action="">

<div>
<label htmlFor="email">Email</label>
<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email"/>
</div>

<div>
<label htmlFor="password">password</label>
<input value={password} onChange={(e)=>setpassword(e.target.value)}  type="password" id="password"/>
</div>

<button type="submit"name="signin" onClick={authHandler} className={classes.login_signInButton}>
  {loading.signIn?(
    <ClipLoader color='#000' size={15}/>
  ):("Sign In")
    
  }
</button>

  
</form>
<p>
  By signing in you agree to the AMAZON FAKE CLONE conditions of use & Sale.Please see our Privacy Notice,our Cookies Notice and our Interest.Based Ads Notice.
</p>

<button type="submit" name="signup" onClick={authHandler}  className={classes.login_registerButton}>
{loading.signUp?(
    <ClipLoader color='#000' size={15}/>
  ):(" Create your shopping Account ")
}
 
  </button>
  
 
{error && <small style={{paddingTop:"5px",color:"red"}}>{error}</small>}
</div>


</section>
  );
}

export default Auth;




