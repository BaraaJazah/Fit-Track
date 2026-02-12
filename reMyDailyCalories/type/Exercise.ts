import { TLoading } from "./loading"

export interface IExerciseState {

    exercises: {
        id: number,
        EnName: string,
        ArName:string,
        TrName: string,
        DeName: string,
        image: string,
        created_at: string | null,
        updated_at: string | null,
        exercise_types:{
            id: number,
            catagoryId: number,
            EnName: string,
            ArName: string,
            TrName: string,
            DeName: string,
            created_at:string | null,
            updated_at:string | null,
            exercises: {
                id: number,
                typeId : number,
                EnName: string,
                ArName:string,
                TrName: string,
                DeName: string,
                image: string,
                met:number,
                haveExplane:string,
                created_at: string | null,
                updated_at: string | null,
            }[]|[]
        }[]|[]
    }[] | [],

    searchExercise:{

        id: number,
        typeId : number,
        EnName: string,
        ArName:string,
        TrName: string,
        DeName: string,
        image: string,
        met:number,
        haveExplane:string,

    }[] | []

    loading: TLoading,
    error: string | null
}
