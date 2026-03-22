import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgot-password`;


export const forgotpw=async(email)=>{

   const response= await axios.post(BASE_URL,{"email":email});
   return response.data;

  
}


