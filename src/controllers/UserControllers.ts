import { Request, Response } from "express";

import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { LoginUserShema } from "../dto/UserDto/loginUserdto";
import { CreateUserSchema } from "../dto/UserDto/createUserdto";
import { UserBusiness } from "../business/UserBusiness";



export class UserControllers {

    constructor(
        private userBusiness:UserBusiness
    ){}


    public login = async (req: Request, res: Response) => {
        try {

            const input = LoginUserShema.parse({
                email: req.body.email as string,
                password: req.body.password as string
            })

            const response = await this.userBusiness.getUser(input)

            res.status(200).send(response)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }

    public signUp = async (req: Request, res: Response) => {
        try {

            const input = CreateUserSchema.parse({
                newName: req.body.name,
                newEmail: req.body.email,
                newPassword:  req.body.password, 
            })

            const response = await  this.userBusiness.postUser(input)


            res.status(200).send(response)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }
}