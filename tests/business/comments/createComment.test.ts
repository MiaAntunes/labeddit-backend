import { ZodError } from "zod";
import { CommentsBusiness } from "../../../src/business/CommentsBusiness";
import { CreateCommentSchema } from "../../../src/dto/CommentDto/createComments";
import { CommentDatabaseMock } from "../../mocks/CommentsDatabasMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { BadRequestError } from "../../../src/errors/BadRequestError";


describe("Testando o createComment", () => {
    const commentBussiness = new CommentsBusiness(
        new CommentDatabaseMock(),
        new PostsDataBaseMocks(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
    )

  
    test("Recebe idPost, comment e o token, e retorna uma mensagem", async () => {
        const input = CreateCommentSchema.parse({
            idPost: "id-mock-post-hello",
            comment: "Como você está?",
            token: "token-mock-fulano"
        })
        const output = await commentBussiness.postComment(input)
        // console.log(output)
        expect(output).toEqual(
            {
                message: 'Seu comentário foi criado',
                comment: {
                  id: 'id-mock',     
                  userId: 'id-mock-fulano',
                  userName: 'Fulano',          postId: 'id-mock-post-hello',
                  comment: 'Como você está?',
                  likes: 0,
                  deslike: 0,        
                  createdAt: expect.any(String)
                }
              }
        )
    })

    // Error ZOD
    test("Recebe um idPost, comment e o token do tipo number e retorna um ZodError",async () => {
        expect.assertions(1)

        try {
            const input = CreateCommentSchema.parse({
                idPost: 0,
                comment: 0,
                token: 0
            })
            const output = await commentBussiness.postComment(input)
        } catch (error) {
            if(error instanceof ZodError){
                // console.log(error.issues)
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
                            path: [ 'comment' ],       
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

    //Error do token incorreto
    test("Recebe um idPost, comment porém o token etsá incorreto, retornando um error UnauthorizedError", async () => {
        expect.assertions(2)

        try {
            const input = CreateCommentSchema.parse({
                idPost: "id-mock-post-hello",
                comment: "Como você está?",
                token: "token-mock-ful"
            })
            const output = await commentBussiness.postComment(input)
        } catch (error) {
            if(error instanceof UnauthorizedError){
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    //Error esse post não existe
    test("Recebe um comment, token porém o idPost está incorreto, retornando um error BadRequestError",async () => {
        expect.assertions(2)

        try {
            const input = CreateCommentSchema.parse({
                idPost: "id-mock-post-ho",
                comment: "Como você está?",
                token: "token-mock-fulano"
            })
            const output = await commentBussiness.postComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                // console.log(error)
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Esse post não existe")
            }
        }
    })

})