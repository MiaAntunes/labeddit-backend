import z from "zod";

export interface CreatePostInputDto {
    newContent: string,
    token: string
}

export interface CreatePostOutInputDto {
    message: string,
}

export const CreatePostSchema = z.object ({
    newContent:z.string().min(
        4,
        { message: " 'content' precisa de no mínimo 4 caracteres, exemplo: u001 " 
    }),
    token:z.string().min(1)
})