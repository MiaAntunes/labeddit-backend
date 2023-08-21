import { ZodError } from "zod"
import { PostsBussiness } from "../../../src/business/PostBussiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"

// token fulano token-mock-fulano
// token astrodev token-mock-astrodev


describe("Testando o getPostAll", () => {
    // colocar o new userBusiness
    const postBussiness = new PostsBussiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock()
    )

    // Receber idPost e o token retornando o post e todos os comentários.
    test("Receber idPost e o token retornando o post e todos os comentários.", async () => {

    })

    // Receber idPost e o token porém com tipagens erradas, retornando um Zod E.
    test("Receber idPost e o token porém com tipagens erradas, retornando um ZodError", async () => {
        expect.assertions(1)

        try {
            
        } catch (error) {
            
        }
    })

    // Receber idPost porém um token inválido retornando um UnauthorizedError.
    test("Receber idPost porém um token inválido retornando um UnauthorizedError.", async () => {
        expect.assertions(2)

        try {
            
        } catch (error) {
            
        }
    })

    // Receber token porém o idPost errado retornando um error BadRequestError.
    test("Receber idPost e o token retornando o post e todos os comentários.", async () => {
        expect.assertions(2)

        try {
            
        } catch (error) {
            
        }
    })

})