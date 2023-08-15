import { BaseError } from "./BaseError";


export class NotFoundError extends BaseError{
    constructor(
        message: string = "Recurso não encontrado" // Essa mensagem padrão será mandada quando não for enviado outro argumento
    ){
        super(404,message)
    }
}