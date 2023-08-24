import { ZodError } from "zod"
import { PostsBussiness } from "../../../src/business/PostBussiness"
import { CreatePostSchema } from "../../../src/dto/PostDto/createPostdto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock"





describe("Testando o createPost", ()=>{
    // colocar o new userPost
    const postBussiness = new PostsBussiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock()
    )

    // Lista
    test("Recebe o token e deve retornar uma lista de posts", async ()=>{
        const input = CreatePostSchema.parse({
            newContent: "hello, is me",
            token: "token-mock-fulano"
        })

        const output = await postBussiness.postPost(input)

        expect(output).toEqual(
            {
                message: "Criado o novo Post"
            }
        )
    })

    // Error ZOD
    test("Recebe o content e o token do tipo number e retorna um ZodError", async()=>{
        expect.assertions(1)

        try {
            const input = CreatePostSchema.parse({
                newContent: 12 ,
                token: 0
            })
    
            const output = await postBussiness.postPost(input)
        } catch (error) {
            if(error instanceof ZodError){
                expect(error.issues).toEqual(
                    [
                        {
                            code: 'invalid_type',
                            expected: 'string',
                            received: 'number',
                            path: [ 'newContent' ],
                            message: 'Expected string, received number'
                        },
                        {
                          code: 'invalid_type',
                          expected: 'string',
                          received: 'number',
                          path: [ 'token' ],
                          message: 'Expected string, received number'
                        }
                      ]
                )
            }
        }
    })

    //Error do token não autorizado
    test("Recebe o content, porém o token está incorreto, recebendo um error UnauthorizedError", async()=>{
        expect.assertions(2)

        try {
            const input = CreatePostSchema.parse({
                newContent: "hello, is me",
                token: "token-mock-fu"
            })
    
            const output = await postBussiness.postPost(input) 
        } catch (error) {
            if(error instanceof UnauthorizedError){
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

})