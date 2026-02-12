import { TLoading } from "./loading"

export interface IUserSettingState {
    sendMessage: {
        subject:string,
        message:string

    } | null

    accessToken: string | null,
    loading: TLoading,
    error: string | null
}


