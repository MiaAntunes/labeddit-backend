
import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { CreateUserSchema } from "../../../src/dto/UserDto/createUserdto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"




describe("Testando SignUp", ()=>{
    const userBussiness = new UserBusiness(
        new UserDatabaseMock(),
        new HashManagerMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()

    )

        // ! Testar de está retornando o token 
        test("Recebe o name, email e a password, para retonar o token", async ()=>{
            const input = CreateUserSchema.parse({
                newName:"Mia" ,
                newEmail: "miaants@email.com", 
                newPassword: "mika12sdhAA!"
            })

            const output = await userBussiness.postUser(input)
            expect(output).toEqual(
                { 
                 message: 'Criado a conta!',
                 token: 'token-mock' 
                }
            )

        })
    

        test("Recebe name, email e password retornando um ZodError", async ()=>{
            expect.assertions(1)

            try {
                const input = CreateUserSchema.parse({
                    newName:"" ,
                    newEmail: "", 
                    newPassword: 0
                })

                const output = await userBussiness.postUser(input)
                
            } catch (error) {
              if(error instanceof ZodError){
                expect(error.issues).toEqual([
                    {
                        code: 'too_small',
                        minimum: 3,
                        type: 'string',
                        inclusive: true,
                        exact: false,
                        message: " 'name' precisa de no mínimo 3 caracteres ",     
                        path: [ 'newName' ]
                      },
                      {
                        validation: 'email',
                        code: 'invalid_string',
                        message: " 'email' está incompleto, exemplo: 'usuario@email.com' .",
                        path: [ 'newEmail' ]
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: [ 'newPassword' ],
                        message: " 'password' deve ser do tipo string"
                      }
                ])


              }
            }
        })
    
        test("Recebe name, email e password e retorna o error esse email já existe ", async ()=>{
            expect.assertions(2)

            try {
                const input = CreateUserSchema.parse({
                    newName:"mia" ,
                    newEmail: "fulano@email.com", 
                    newPassword: "aksssskskA1A1A1!!!"
                })

                const output = await userBussiness.postUser(input)
            } catch (error) {
                // BadRequestError("esse email já existe.")
                if(error instanceof BadRequestError){
                    expect(error.statusCode).toBe(400)
                    expect(error.message).toBe("esse email já existe.")
                }
            }
        }) 
    
})