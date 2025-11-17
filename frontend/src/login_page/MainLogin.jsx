import React from "react";
import dental_logo from "../assets/headerLogo.png";

const MainLogin = () => {
  return (
    <div className=" bg-cyan-50 flex min-h-screen justify-center items-center ">
      <div className="border-2 rounded-2xl shadow-2xl border-cyan-400 flex flex-col  p-5 w-[95%] py-15 mx-auto max-w-lg bg-white">
        <div className="flex flex-col justify-center items-center">
          <img
            src={dental_logo}
            alt="dental_iamge_rest here"
            className="size-25 "
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className=" text-2xl ">Paitent Login</h1>
          <h1 className="text-lg text-cyan-500">
            {" "}
            Access your patient portal to manage appointments
          </h1>
        </div>

        <div className=" ">
          <form className="flex flex-col">
            <div className="p-5 flex flex-col gap-3">
              <label className="">Email Address</label>
              <input
                type="email"
                className="border-2  border-cyan-500 rounded-lg p-1.5 hover:border-gray-500 hover:border-2"
              />
            </div>
            <div className="p-5 flex gap-3 flex-col">
              <label className="">Password</label>
              <input
                type="password"
                className="border-2 rounded-lg border-cyan-500  p-1.5 hover:border-gray-500 hover:border-2"
              />
            </div>

            <div className="flex flex-row justify-around ">
              <div className="flex flex-row gap-x-3 py-2 ">
                <input type="checkbox" />
                <label className="pr-4 text-cyan-400">Remember Me</label>
              </div>

              <div>
                <a href="" className="hover:text-cyan-500">
                  Forget Password?
                </a>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <button className="bg-cyan-600 rounded-2xl w-[90%] p-3 text-white  mx-auto hover:bg-cyan-800">
                Sign in
              </button>
            </div>
            <div className="py-6">
              <hr/>
            </div>
            <div className="flex flex-row justify-center gap-4"> 
              <h1 className="text-cyan-500">Dont Have An Account?</h1>
             <a href="" className="text-cyan-600 hover:text-cyan-700"><u>Register Here</u></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MainLogin;
