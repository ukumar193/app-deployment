import React, { useEffect, useRef, useState } from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstnameInputRef = useRef();
  let lastnameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileInputRef = useRef();
  let profileInputRef = useRef();
  let [pic, setPic] = useState(["./images/dummy.png"]);

  let customerDetails = useSelector((store) => {
    return store.customerDetails;
  });
  useEffect(() => {
    firstnameInputRef.current.value= customerDetails.firstName;
    lastnameInputRef.current.value =customerDetails.lastName;
    ageInputRef.current.value=customerDetails.age;
    emailInputRef.current.value=customerDetails.email;
    mobileInputRef.current.value=customerDetails.mobile;
        setPic(`http://localhost:4569/${customerDetails.profile}`)
    
  }, []);
  let onUpDateProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstnameInputRef.current.value);
    dataToSend.append("lastName", lastnameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);
    for (let i = 0; i < profileInputRef.current.files.length; i++) {
      dataToSend.append("profilepic", profileInputRef.current.files[i]);
    }
    let reqOptions = {
      method: "PATCH",
      body: dataToSend,
    };
   
    let JSONData = await fetch("http://localhost:4569/updateProfile",reqOptions)
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
  };

  return (
    <div>
      <TopNavigation></TopNavigation>
      <div>
        <form>
          <h2>EditProfile</h2>
          <div>
            <label>First Name</label>
            <input ref={firstnameInputRef}></input>
            <span></span>
          </div>
          <div>
            <label>Last Name</label>
            <input ref={lastnameInputRef}></input>
            <span></span>
          </div>
          <div>
            <label>Age</label>
            <input ref={ageInputRef}></input>
            <span></span>
          </div>
          <div>
            <label>Email</label>
            <input ref={emailInputRef} readOnly></input>
            <span></span>
          </div>
          <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
            <span></span>
          </div>
          <div>
            <label>Mobile</label>
            <input ref={mobileInputRef}></input>
            <span></span>
          </div>
          <div>
            <label>Profile </label>
            <input
              className="fi1"
              type="file"
              multiple
              ref={profileInputRef}
              onChange={(event) => {
                let selectedPicPath = URL.createObjectURL(
                  event.target.files[0]
                );
                setPic(selectedPicPath);
              }}
            ></input>
            <span></span>
          </div>
          <div>
            <img className="dp1" src={pic} alt="img"></img>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                onUpDateProfile();
              }}
            >
              UpDate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
