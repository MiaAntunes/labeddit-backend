

export abstract class BaseError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ){
        super(message) // é obrigatório o uso do super!
    }
}