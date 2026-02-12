import { TLoading } from "./loading"

export interface IFavoriteState {

    favoriteFood: {
        id: number,
        catagoryId: number,
        foodId: number,
        EnName: string,
        ArName: string,
        image: string,
        kcal: number,
        protein: number,
        fats: number,
        carbs: number,
        haveExplane:number,
       
       }[] | [],
       favoriteFoodIds : number[]|[]
       favoriteExercise:{
        id: number,
        userId: number,
        catagoryId: number,
        exerciseId: number,
        EnName: string,
        ArName: string,
        image: string,
        met: number,
        haveExplane: number,
       }[]|[]
       
       favoriteExerciseIds:{}[]|[]

    loading: TLoading,
    error: string | null
}

