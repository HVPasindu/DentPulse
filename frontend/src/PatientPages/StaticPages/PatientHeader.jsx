import React from "react";
// import headerLogo from "./";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PatientHeader = () => {

   const handleLogout = () => {
    // 1. Remove auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // if you stored user info

    // 2. Redirect to login
    navigate("/login");
  };



  const navigate = useNavigate();
  return (
    <div className="flex flex-row w-screen justify-between bg-white p-4 shadow-md">
      <div className="bg-white flex flex-row p-2 cursor-pointer" >
       <img src="headerLogo.png" alt="dental logo" className="size-10" onClick={()=>{navigate("/")}}/> 

        <h1 className="text-cyan-400 text-2xl font-bold" onClick={()=>{navigate("/")}}>
          <span className="text-cyan-600">Dent</span>Pluse
        </h1>
      </div>

      <div className=" flex flex-row">
        <h1 className=" p-4 text-cyan-600  ">Hello Patient!</h1>

        <button className="bg-white  hover:bg-cyan-100 border-2  hover:border-2 border-cyan-400 px-3 rounded-2xl " onClick={handleLogout}>
          <div className="flex p-0.5">
            <div className=" pr-3">
              <LogOut className="size-5" />
            </div>
            <div>
              <h1>Logout</h1>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PatientHeader;
