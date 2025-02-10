import React from 'react';
import{useSelector}from 'react-redux'
import TopNavigation from './TopNavigation';

function Dashboard() {
     let customerDetails = useSelector((store)=>{
          return store.customerDetails ;
     })
  return (
    <div>
      <TopNavigation/>
    <h1>Dashboard</h1>
    <h2>{customerDetails.firstName}</h2>
    <h2>{customerDetails.lastName} </h2>
  
    <img className="pic2" src={`http://localhost:4569/${customerDetails.profile}`} alt='abcdert'></img>

    </div>
  )
}

export default Dashboard