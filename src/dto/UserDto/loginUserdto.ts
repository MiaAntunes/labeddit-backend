import z from "zod";

export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutinputDTO{
    token: string,
}

export const LoginUserShema = z.object({  
    email: z.string({
        required_error: " 'email' é obrigatório ",
        invalid_type_error: " 'email' deve ser do tipo string"
    }).email(
        {message: " 'email' está incompleto, exemplo: 'usuario@email.com' ."}
    ),
    password:z.string({
        required_error: " 'password' é obrigatório ",
        invalid_type_error: " 'password' deve ser do tipo string"
    })
})