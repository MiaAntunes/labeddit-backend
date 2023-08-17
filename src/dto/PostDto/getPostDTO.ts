import z from "zod";
import { PostModel } from "../../models/PostsModel";

export interface GetPostInputDTO {
    token: string
}

export type GetPostOutinputDTO = PostModel[]

export const GetPostShema = z.object({
    token: z.string()
    .min(
        1,
        { message: " 'token' precisa de no mínimo 1 caracteres, exemplo: Hi " 
    })
})