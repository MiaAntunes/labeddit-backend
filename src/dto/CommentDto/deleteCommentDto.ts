import z from "zod";

export interface DeleteCommentInputDto {
    idComment: string,
    token: string
}

export interface DeleteCommentOutInputDto {
    message: string,
}

export const DeleteCommentSchema = z.object ({
    idComment:z.string().min(
        4,
        { message: " 'content' precisa de no mínimo 4 caracteres, exemplo: u001 " 
    }),
    token:z.string().min(1)
})