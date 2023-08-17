
import z from "zod";

export interface CreateCommentInputDto {
    idPost:  string,
    comment: string,
    token:  string
}

export interface CreateCommentOutInputDto {
    message: string,
    comment: object
}

export const CreateCommentSchema = z.object ({
    idPost:z.string().min(
        4,
        { message: " 'content' precisa de no mínimo 4 caracteres " 
    }),
    comment: z.string(),
    token:z.string().min(1)
}).transform(data => data as CreateCommentInputDto)