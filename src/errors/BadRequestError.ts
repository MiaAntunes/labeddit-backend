import { BaseError } from "./BaseError";


export class BadRequestError extends BaseError{
    constructor(
        message: string = "Requisição Inválida" // Essa mensagem padrão será mandada quando não for enviado outro argumento
    ){
        super(400,message)
    }
}