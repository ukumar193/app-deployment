import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    // if (localStorage.getItem("email") && localStorage.getItem("password")) {
    //   emailInputRef.current.value = localStorage.getItem("email");
    //   passwordInputRef.current.value = localStorage.getItem("password");
    //   onLogin();
    // }
    if (localStorage.getItem("token")) {
      // onValidToken();
    }
  }, []);
  let onValidToken = async () => {
    let dataToSend = new FormData();
    dataToSend.append("token", localStorage.getItem("token"));
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("/validatetoken", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status === "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    }
  };

  let onLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("/login", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status === "success") {
      /**web token starts from here  */
      /* localStorage.setItem("email", emailInputRef.current.value);
      localStorage.setItem("password", passwordInputRef.current.value);*/
      localStorage.setItem("token", JSOData.data.token);
      /**--> */ dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    }
   else  alert(JSOData.msg);
  };

  return (
    <div>
      <div>
        <form>
          <h1>Login</h1>
          <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
            <span></span>
          </div>
          <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
            <span></span>
          </div>
          <br></br>
          <div>
            <button
              type="button"
              onClick={() => {
                onLogin();
              }}
            >
              LOGIN
            </button>
          </div>
        </form>
        <br></br>
        <Link className="li1" to="signup">
          signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
