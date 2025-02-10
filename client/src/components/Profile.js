import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  let navigate = useNavigate();
  let customerDetails = useSelector((store) => {
    return store.customerDetails;
  });

  let deletProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", customerDetails.email);
    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };
    let JSONData = await fetch(
      "http://localhost:4569/deleteprofile",
      reqOptions
    );
    let JSOData = await JSONData.json();
    console.log(JSOData);
    if (JSOData.status == "success") {
      navigate("/");
    }
    alert(JSOData.msg);
  };
  return (
    <div>
      <TopNavigation></TopNavigation>
      <h1>Profile</h1>
      <button
        className="bn3"
        onClick={() => {
          deletProfile();
        }}
      >
        DeleteAccount
      </button>
    </div>
  );
}

export default Profile;
