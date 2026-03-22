import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgot-password/reset`;

export const resetpassword=async(email,password)=>{
    const response=axios.post(BASE_URL,{"email":email,"newPassword":password});

    return (await response).data;

};