import z from "zod";

export interface LikeOrDeslikeCommentsInputDto {
    idComments: string,
    idPost: string,
    likeOrDeslike: boolean,
    token: string
}

export interface LikeOrDeslikeCommentsOutInputDto {
    message: string,
}

export const LikeOrDeslikeCommentsSchema = z.object ({
    idComments:z.string().min(
        4,
        { message: " 'idComments' precisa de no mínimo 4 caracteres " 
    }),
    idPost:z.string().min(
        4,
        { message: " 'idPost' precisa de no mínimo 4 caracteres " 
    }),
    likeOrDeslike: z.boolean(),
    token:z.string().min(1)
}).transform(data => data as LikeOrDeslikeCommentsInputDto)