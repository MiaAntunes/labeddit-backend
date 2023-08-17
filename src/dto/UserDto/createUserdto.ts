import z from "zod";

export interface CreateUserInputDto {
    newName: string,
    newEmail: string,
    newPassword: string,
}

export interface CreateUserOutInputDto {
    message: string,
    token: string
}

export const CreateUserSchema = z.object({  
    newName: z.string({
        required_error: " 'name' é obrigatório ",
        invalid_type_error: " 'name' deve ser do tipo string"
    }).min(
        3,
        {message: " 'name' precisa de no mínimo 3 caracteres "
    }),

    newEmail: z.string({
        required_error: " 'email' é obrigatório ",
        invalid_type_error: " 'email' deve ser do tipo string"
    }).email(
        {message: " 'email' está incompleto, exemplo: 'usuario@email.com' ."}
    ),

    newPassword: z.string({
        required_error: " 'password' é obrigatório ",
        invalid_type_error: " 'password' deve ser do tipo string"
    }).regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        { message: "O password deve ter no mínimo 8 caractere, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e pelo menos um caractere especial."
    }),
}).transform(data => data as CreateUserInputDto)