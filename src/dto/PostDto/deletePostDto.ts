import z from "zod";

export interface DeletePostInputDto {
    idPost: string,
    token: string
}

export interface DeletePostOutInputDto {
    message: string,
}

export const DeletePostSchema = z.object ({
    idPost:z.string().min(
        4,
        { message: " 'content' precisa de no mínimo 4 caracteres, exemplo: u001 " 
    }),
    token:z.string().min(1)
})