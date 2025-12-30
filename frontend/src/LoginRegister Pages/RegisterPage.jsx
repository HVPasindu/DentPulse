import dental_logo from "../assets/headerLogo.png";
import { ArrowLeft } from "lucide-react";
import { registerpagedata } from "../data/registerpagedata";
import InputCommonCard from "./InputCommonCard";


const RegisterPage=()=>{


        return (
                  <div className=" bg-cyan-50 flex flex-col min-h-screen justify-center items-center ">
       <div className="flex flex-row justify-center items-center bg-cyan-50 pr-80 py-2">
          <ArrowLeft className="text-cyan-600"/>
          <a href="/" className="text-cyan-700">
            Back to Home
          </a>
        </div>

        <div className="border-2 rounded-2xl shadow-2xl border-cyan-400 flex flex-col  p-5 w-[95%] py-15 mx-auto max-w-lg bg-white">
          <div className="flex flex-col justify-center items-center">
            <img
              src={dental_logo}
              alt="dental_iamge_rest here"
              className="size-25 "
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className=" text-2xl ">Create Patient Account</h1>
            <h1 className="text-lg text-cyan-500">
              {" "}
             Join us and start your journey to a healthier smile
            </h1>
          </div>

          <div className=" ">
            <form className="flex flex-col">
              {/* {middledata.map((middle_data)=>(<MiddleSectionCard main_text={middle_data.main_text} second_text={middle_data.second_text}/>))} */}
             {registerpagedata.map((registerpage_data) =>
        registerpage_data.type === "checkbox" ? (
          <div key={registerpage_data.id}>
            <label className="text-cyan-500 text-sm">{registerpage_data.name}</label>
            <div>
              {registerpage_data.genders.map((gender) => (
                <label key={gender} className="text-cyan-500 p-1.5 text-lg">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                  className="gap-x-1.5"/>
                  {gender}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <InputCommonCard
            key={registerpage_data.id}
            type={registerpage_data.type}
            name={registerpage_data.name}
          />
        )
      )}
            </form>
            <div className="flex justify-center items-center p-5">
              <button className="bg-cyan-600 rounded-2xl w-[90%] p-3 text-white  mx-auto hover:bg-cyan-800 ">Sign Up</button>
            </div>
          </div>

                <div className="py-6">
                <hr />
              </div>
              <div className="flex flex-row justify-center gap-4">
                <h1 className="text-cyan-500">Have An Account?</h1>
                <a href="/login" className="text-cyan-600 hover:text-cyan-700">
                  <u>Login Here</u>
                </a>
              </div>
        </div>
        <div className="pt-10">
          <h1 className="text-cyan-900 font-light font-lg">For assistance, call us at (555) 123-4567</h1>
        </div>
      </div>




        )

}
export default RegisterPage;