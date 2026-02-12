import { TLoading } from "./loading"

export interface IAuthState {

    calender: {
        day:string,
        kcal:number,
        protein:number,
        fats:number,
        carbs:number,
        burn:number,
    }[] | [],
 
    loading: TLoading,
    error: string | null
}
