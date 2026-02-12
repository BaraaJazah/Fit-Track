import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../../type/Foods';
import actGetFoods from './act/actGetFoods';
import actAIFood from './act/actAIFood';
import actAIFoodSuggestion from './act/actAIFoodSuggestion';
import actAIFoodIngredients from './act/actAIFoodIngredients';

const initialState: IAuthState = {
    foods: [],
    foodAI:null,
    searchFood:[],
    loading: "idle",
    error: null
}
const themeSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        actSearchFood: (state, actions) => {

            const searchTerm = actions.payload?.toLowerCase()?.trim() || '';
            state.searchFood = state.foods.flatMap(category => {
                return category.food_types.flatMap(type => {
                    const filteredFoods = type.foods.filter(food => 
                    food.EnName.toLowerCase().includes(searchTerm) || 
                    food.ArName.toLowerCase().includes(searchTerm)
                    );
                    return filteredFoods.map(food => ({
                    ...food,
                    catagoryId: type.catagoryId
                    }));
                });
            });

        },

        actSortFood: (state, action) => {
            const sortKey = action.payload?.key || 'kcal';  // 'kcal', 'protein', ...
            const sortOrder = action.payload?.order || 'desc'; // 'asc' or 'desc'
          
            state.foods = state.foods.map(food => ({
              ...food,
              food_types: food.food_types.map(foodType => ({
                ...foodType,
                foods: [...foodType.foods].sort((a, b) => {
                  if (sortOrder === 'asc') {
                    return a[sortKey] - b[sortKey];
                  } else {
                    return b[sortKey] - a[sortKey];
                  }
                })
              }))
            }));
          }
    },

    extraReducers(building) {
        building
            .addCase(actGetFoods.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actGetFoods.fulfilled, (state, action) => {
                state.loading = "success"
                state.foods = action.payload.data
                state.error = null
            })
            .addCase(actGetFoods.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

            //  food by AI
            .addCase(actAIFood.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actAIFood.fulfilled, (state, action) => {
                state.loading = "success"
                // state.foodAI = action.payload.data
                state.error = null
            })
            .addCase(actAIFood.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })

             //  food by AI by suggestion
             .addCase(actAIFoodSuggestion.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actAIFoodSuggestion.fulfilled, (state, action) => {
                state.loading = "success"
                // state.foodAI = action.payload.data
                state.error = null
            })
            .addCase(actAIFoodSuggestion.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })


             //  food by AI By Ingredients
             .addCase(actAIFoodIngredients.pending, (state) => {
                state.loading = "pending"
                state.error = null
            })
            .addCase(actAIFoodIngredients.fulfilled, (state, action) => {
                state.loading = "success"
                // state.foodAI = action.payload.data
                state.error = null
            })
            .addCase(actAIFoodIngredients.rejected, (state, action) => {
                state.loading = "failed"
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
            })


            




            
    }
})
export const { actSearchFood  , actSortFood } = themeSlice.actions;
export { actGetFoods , actAIFood , actAIFoodSuggestion  ,
    actAIFoodIngredients
};
export default themeSlice.reducer