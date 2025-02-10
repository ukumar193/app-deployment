import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import Leaves from "./components/Leaves";
import Tasks from "./components/Tasks";
import Profile from "./components/Profile";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/editprofile" element={<EditProfile/>}></Route>
          <Route path="/leaves" element={<Leaves/>}></Route>
          <Route path="/tasks" element={<Tasks/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
