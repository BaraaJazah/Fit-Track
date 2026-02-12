import { TLoading } from "./loading"

export interface IUpdateState {

    update: {
        userId:number,
        app:number,
        food:number,
        exercise:number,
    }|null
 
    loading: TLoading,
    error: string | null
}
