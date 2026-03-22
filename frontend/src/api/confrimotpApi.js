import axios from "axios"


const BASE_URL=`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgot-password/verify-otp`;

export const confirmotp =async(email,otp)=>{

    const response=axios.post(BASE_URL,{
        "email":email,
        "otp":otp
    });

    return response.data;
}