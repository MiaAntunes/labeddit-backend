import { ZodError } from "zod"
import { PostsBussiness } from "../../../src/business/PostBussiness"
import { DeletePostSchema } from "../../../src/dto/PostDto/deletePostDto"
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { BadRequestError } from "../../../src/errors/BadRequestError"






describe("Testando o deletePost", ()=>{

    const postBussiness = new PostsBussiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock()
    )

    test("Recebe um idPost e um token , retornando uma mensagem 'Seu post foi deletado' ", async ()=>{
        const input = DeletePostSchema.parse({
            idPost: "id-mock-post-hello" , 
            token: "token-mock-fulano"
        })

        const output = await postBussiness.deletePost(input)
        expect(output).toEqual({
            message: "Seu post foi deletado"
        })
    })

    test("Retorna erro ZodError", async ()=>{
        expect.assertions(1)
        try {
            const input = DeletePostSchema.parse({
                idPost: 0 , 
                token: true 
            })

            const output = await postBussiness.deletePost(input)
        } catch (error) {
            if(error instanceof ZodError){
                expect(error.issues).toEqual([
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: [ 'idPost' ],
                        message: 'Expected string, received number'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'boolean',
                        path: [ 'token' ],
                        message: 'Expected string, received boolean'
                      }
                ])
            }
        }
    })

    test("Retorna Unauthorized", async ()=>{
        expect.assertions(2)
        try {
            const input = DeletePostSchema.parse({
                idPost: "id-mock-post-hello" , 
                token: "token-mock-ful"
            })

            const output = await postBussiness.deletePost(input)
        } catch (error) {
            if(error instanceof UnauthorizedError){
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Retorna BadRequestError com a mensagem 'Esse idPost está incorreto ou não existe mais'", async ()=>{
        expect.assertions(2)

        try {
            const input = DeletePostSchema.parse({
                idPost: "id-mock-poskokji" , 
                token: "token-mock-fulano"
            })

            const output = await postBussiness.deletePost(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Esse idPost está incorreto ou não existe mais")
            }
        }
    })
})