
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import {API_URL } from "@env"
import { RootState } from "../../store";

type TData ={
  subject:string,
  message:string,

}
const actSendSupportMsg = createAsyncThunk("/actSendSupportMsg", async (data:TData, { rejectWithValue , getState }) => {
    const { auth } = getState() as RootState
        const data1 ={
            name:auth.user.name,
            email:auth.user.email,
            subject:data.subject,
            message:data.message,
            
        }
        try {
       
          const res = await axios.post(`${API_URL}/api/supportMsg` ,data1,{
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        }
       )
          if (res) {
              return res.data
          }
      
      } catch (error) {
          if (isAxiosError(error)) {
              return rejectWithValue(error.response?.data?.message || error.response?.data || "An unexpected error")
          }
      }

})

export default actSendSupportMsg