import { ZodError } from "zod"
import { PostsBussiness } from "../../../src/business/PostBussiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { GetPostIdShema } from "../../../src/dto/PostDto/getPostIdDto"
import { BadRequestError } from "../../../src/errors/BadRequestError"

// token fulano token-mock-fulano
// token astrodev token-mock-astrodev


describe("Testando o getPostId", () => {
    // colocar o new userBusiness
    const postBussiness = new PostsBussiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock()

    )

    test("Recebe um idPost e um token , retornando o post do id junto com todos os comentários dele", async ()=>{
        const input = GetPostIdShema.parse({
            idPost:"id-mock-post-hello",
            token: "token-mock-fulano"
        })
        const output = await postBussiness.getPostId(input)
      
        expect(output).toEqual(
            {
                postId: 'id-mock-post-hello',
                content: 'Hello, how u doing? - friends',
                likes: 3,
                deslikes: 3,
                commentQuantity: 5,
                createdAt:  expect.any(String),
                updatedAt:  expect.any(String),
                creator: { name: 'Fulano', usersId: 'id-mock-fulano' },
                comments: [
                  {
                    id: 'id-mock-post-hello-comment',
                    userName: 'Astrodev',
                    comments: 'Bom dia, tenha um ótimo final de semana',
                    likes: 1,
                    deslikes: 0,
                    createdAt:  expect.any(String)
                  },
                  {
                    id: 'id-mock-post-music-comment',
                    userName: 'Fulano',
                    comments: 'Amo essa música <3',
                    likes: 0,
                    deslikes: 1,
                    createdAt:  expect.any(String)
                  }
                ]
              }
        )
    })

    test("Retorna erro ZodError", async ()=>{
        expect.assertions(1)

        try {
            const input = GetPostIdShema.parse({
                idPost:0,
                token: 0
            })
            const output = await postBussiness.getPostId(input)
        } catch (error) {
            if( error instanceof ZodError){
                expect(error.issues).toEqual(
                    [
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
                          received: 'number',
                          path: [ 'token' ],
                          message: 'Expected string, received number'
                        }
                      ]
                )
            }
        }
    })

    test("Retorna Unauthorized", async ()=>{
        expect.assertions(2)

        try {
            const input = GetPostIdShema.parse({
                idPost:"id-mock-post-hello",
                token: "token-mock-"
            })
            const output = await postBussiness.getPostId(input)
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
            const input = GetPostIdShema.parse({
                idPost:"id-mock-postlo",
                token: "token-mock-fulano"
            })
            const output = await postBussiness.getPostId(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Esse idPost está incorreto ou não existe mais")
            }
        }
    })

})