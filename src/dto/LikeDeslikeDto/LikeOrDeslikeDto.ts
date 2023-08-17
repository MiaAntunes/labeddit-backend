import z from "zod";

export interface LikeOrDeslikeInputDto {
    idPost: string,
    likeOrDeslike: boolean,
    token: string
}

export interface LikeOrDeslikeOutInputDto {
    message: string,
}

export const LikeOrDeslikeSchema = z.object ({
    idPost:z.string().min(
        4,
        { message: " 'content' precisa de no mínimo 4 caracteres " 
    }),
    likeOrDeslike: z.boolean(),
    token:z.string().min(1)
}).transform(data => data as LikeOrDeslikeInputDto)