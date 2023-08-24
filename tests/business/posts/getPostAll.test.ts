import { ZodError } from "zod"
import { PostsBussiness } from "../../../src/business/PostBussiness"
import { GetPostShema } from "../../../src/dto/PostDto/getPostDTO"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock"

// token fulano token-mock-fulano
// token astrodev token-mock-astrodev


describe("Testando o getPostAll", ()=>{
    // colocar o new userBusiness
    const postBussiness = new PostsBussiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock()

    )


    test("Recebe o token e deve retornar uma lista de posts",async ()=>{
        const input = GetPostShema.parse({
            token: "token-mock-fulano"
        })

        const output = await postBussiness.getPostsAll(input)
        expect(output).toEqual(
            [
                {
                    postId: 'id-mock-post-hello',
                    content: 'Hello, how u doing? - friends',
                    likes: 3,
                    deslikes: 0,
                    comments: 5,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    creator: { usersId: 'id-mock-fulano', name: 'Fulano' }
                  },
                  {
                    postId: 'id-mock-post-rotine',
                    content: 'Rotine my day',
                    likes: 100,
                    deslikes: 0,
                    comments: 10,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    creator: { usersId: 'id-mock-fulano', name: 'Fulano' }
                  },
                  {
                    postId: 'id-mock-post-music',
                    content: 'Dance',
                    likes: 103,
                    deslikes: 1,
                    comments: 10,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    creator: { usersId: 'id-mock-astrodev', name: 'Astrodev' }
                  },
                  {
                    postId: 'id-mock-post-dance',
                    content: 'Music',
                    likes: 103,
                    deslikes: 1,
                    comments: 10,
                    createdAt:expect.any(String),
                    updatedAt: expect.any(String),
                    creator: { usersId: 'id-mock-astrodev', name: 'Astrodev' }
                  }
            ]
        )
    })

    // Error ZOD
    test("Recebe um token que não é uma string e retorna um ZodError", async()=>{
        expect.assertions(1)

        try {
            const input = GetPostShema.parse({
                token: 0
            })
    
            const output = await postBussiness.getPostsAll(input)
        } catch (error) {
            if(error instanceof ZodError){
                expect(error.issues).toEqual(
                    [
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
    test("Recebe um token incorreto e retorna um error UnauthorizedError", async ()=>{
        expect.assertions(2)

        try {
            const input = GetPostShema.parse({
                token: "token-mock-fulan"
            })
            const output = await postBussiness.getPostsAll(input)

        } catch (error) {
            if(error instanceof UnauthorizedError){
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

})