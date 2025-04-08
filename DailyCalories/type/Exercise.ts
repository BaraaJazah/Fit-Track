import { TLoading } from "./loading"

export interface IExerciseState {

    exercises: {
        id: number,
        name: string,
        image: string,
        exercise:
        {
            id: number,
            exerciseType_Id: number,
            name: string,
            met: number,
            image: string,
        }[]

    }[] | [],

    loading: TLoading,
    error: string | null
}

