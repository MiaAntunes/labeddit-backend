
import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { LoginUserShema } from "../../../src/dto/UserDto/loginUserdto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { BaseError } from "../../../src/errors/BaseError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"



describe("Testando Login", () => {
    const userBussiness = new UserBusiness(
        new UserDatabaseMock(),
        new HashManagerMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()

    )


    test("Recebe o email e a senha, para retonar o token", async () => {
        const input = {
            email: "fulano@email.com",
            password: "fulano123"
        }

        const results = await userBussiness.getUser(input)
        // console.log(results)
        expect(results).toEqual({
            token: "token-mock-fulano"
        })

    })


    test("Deve receber o email e o password, e deve retorna um error E-mail e/ou senha inválido(s)", async () => {
        expect.assertions(2)

        try {
            const input = {
                email: "fulan@email.com",
                password: "fulano123"
            }

            const output = await userBussiness.getUser(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("E-mail e/ou senha inválido(s)")
            }
        }
    })

    test("Deve receber o email e o password, e deve retorna um error 'password' incorretos", async () => {
        expect.assertions(2)
        try {
            const input = {
                email: "fulano@email.com",
                password: "fulano12"
            }

            const output = await userBussiness.getUser(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                // console.log(error)
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("'password' incorretos")
            }
        }
    })

    
    test("Deve receber o email e password e retorna um ZodError", async () => {
        expect.assertions(1)

        try {
            const input = LoginUserShema.parse({
                email: "",
                password: 0
            })

        } catch (error) {
            if(error instanceof ZodError){
                // console.log(error.issues[0])
                // console.log(error.issues[1])
                expect(error.issues).toEqual(
                 [
                    {
                        validation: 'email',
                        code: 'invalid_string',
                        message: " 'email' está incompleto, exemplo: 'usuario@email.com' .",
                        path: [ 'email' ]
                    },
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: [ 'password' ],
                        message: " 'password' deve ser do tipo string"
                      }
                 ]
                )
            }
        }
    })

})