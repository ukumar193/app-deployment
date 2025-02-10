import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopNavigation() {
let navigate = useNavigate();
  let customerDetails = useSelector((store) => {
     console.log("TopNavigation");
     console.log(store);
    return store.customerDetails;
  });
  useEffect(()=>{
     if(customerDetails && customerDetails.email){

     }
     else{
          navigate("/")
     }
  },[])
  return (
    <nav className="navBar">
      <Link className="link1" to="/dashboard">Dashboard</Link>
      <Link className="link1" to="/tasks">Tasks</Link>
      <Link className="link1" to="/editprofile">Edit Profile</Link>
      <Link className="link1" to="/leaves">Leaves</Link>
      <Link className="link1" to="/profile">Profile</Link>
      <Link className="link1" to="/" onClick={()=>{
        localStorage.clear();
      }}>signout</Link>
    </nav>
  );
}

export default TopNavigation;
