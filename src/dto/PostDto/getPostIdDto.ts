import z from "zod";
import { PostModel } from "../../models/PostsModel";

export interface GetPostIdInputDTO {
    idPost: string,
    token: string
}

export type GetPostIdOutinputDTO = PostModel[]

export const GetPostIdShema = z.object({
    idPost: z.string()
    .min(
        1,
        { message: " 'token' precisa de no mínimo 1 caracteres, exemplo: Hi " 
    }),
    token: z.string()
    .min(
        1,
        { message: " 'token' precisa de no mínimo 1 caracteres, exemplo: Hi " 
    })
})