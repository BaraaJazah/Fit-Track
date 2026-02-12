import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { API_URL } from "@env";
import { RootState } from "../../store";

type TData = {
  foodType: string;
  serving: string;
  goal: string;
  foodIngredients:string,
};
const actAIFoodIngredients = createAsyncThunk(
  "/actAIFoodIngredients",
  async (data: TData, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;

    const data1 = {
      foodIngredients: data.foodIngredients,
      foodType: data.foodType,
      foodLanguage: "arabic",
      numOfServing: data.serving,
      goal: data.goal,
    };

    try {
      const res = await axios.post(
        `${API_URL}/api/getFoodAIByIngredients`,
        data1,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      if (res) {
        return res.data;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.response?.data ||
            "An unexpected error"
        );
      }
    }
  }
);

export default actAIFoodIngredients;
