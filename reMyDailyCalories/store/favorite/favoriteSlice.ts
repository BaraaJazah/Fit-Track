import { createSlice } from '@reduxjs/toolkit'
import { IFavoriteState } from '../../type/Favorite';
import actAddFavoriteFood from './act/addFavoriteFood';
import actAddFavoriteExercise from './act/actAddFavoriteExercise';


const initialState: IFavoriteState = {
    favoriteFood: [],
    favoriteFoodIds: [],
    favoriteExercise: [],
    favoriteExerciseIds: [],

    loading: "idle",
    error: null
}


const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        changeTheme: (state, actions) => {
        },

        // add and remove  FavoriteFoods

        actAddFavoriteFoods : (state, actions) =>{

            if (state.favoriteFoodIds.includes(actions.payload.foodId)) {
                state.favoriteFoodIds = state.favoriteFoodIds.filter(
                  (element) => element !== actions.payload.foodId
                );
                state.favoriteFood = state.favoriteFood.filter(
                    (element) => element.foodId !== actions.payload.favoriteData.foodId
                  );
              } else {
                state.favoriteFoodIds.push(actions.payload.foodId);
                state.favoriteFood.push(actions.payload.favoriteData) 

              }
        },

        // add and remove  FavoriteExercises
        actAddFavoriteExercises : (state, actions) =>{

            if (state.favoriteExerciseIds.includes(actions.payload.exerciseId)) {
                state.favoriteExerciseIds = state.favoriteExerciseIds.filter(
                  (element) => element !== actions.payload.exerciseId

                );

                state.favoriteExercise = state.favoriteExercise.filter(
                    (element) => element.exerciseId !== actions.payload.exerciseData.exerciseId
                  );

              } else {
                state.favoriteExerciseIds.push(actions.payload.exerciseId);
                state.favoriteExercise.push(actions.payload.exerciseData) 
                
              }


        },
        resetFavorite : (state)=>{
            state.favoriteFood= []
            state.favoriteFoodIds= []
            state.favoriteExercise= []
            state.favoriteExerciseIds= []
        }
    },
    extraReducers(building) {
        building
        .addCase(actAddFavoriteFood.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actAddFavoriteFood.fulfilled, (state, action) => {
            state.loading = "success"
            state.favoriteFood = action.payload.data;
            state.favoriteFoodIds=[];
            action.payload.data.forEach(element => {
                state.favoriteFoodIds.push(element.foodId)
            });

            state.error = null
        })
        .addCase(actAddFavoriteFood.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload
            }
        })

        //  Exercise 

        .addCase(actAddFavoriteExercise.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        .addCase(actAddFavoriteExercise.fulfilled, (state, action) => {
            state.loading = "success"
            state.favoriteExercise = action.payload.data;
            state.favoriteExerciseIds=[];
            action.payload.data.forEach(element => {
                state.favoriteExerciseIds.push(element.exerciseId);
            });

            state.error = null
        })
        .addCase(actAddFavoriteExercise.rejected, (state, action) => {
            state.loading = "failed"
            if (typeof action.payload === "string") {
                state.error = action.payload
            }
        })
    }

})
export const { changeTheme , actAddFavoriteFoods , actAddFavoriteExercises , resetFavorite } = favoriteSlice.actions;
export { actAddFavoriteFood , actAddFavoriteExercise };
export default favoriteSlice.reducer