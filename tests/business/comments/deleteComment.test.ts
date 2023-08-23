import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness";
import { DeleteCommentSchema } from "../../../src/dto/CommentDto/deleteCommentDto";
import { ZodError } from "zod";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { BadRequestError } from "../../../src/errors/BadRequestError";





describe("Testando o createComment", () => {
    const commentBussiness = new CommentsBusiness(
        new CommentDatabaseMock(),
        new PostsDataBaseMocks(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
    )

    test("Recebe um idPost e um token , retornando uma mensagem 'Seu post foi deletado' ", async ()=>{
        const input = DeleteCommentSchema.parse({
            idComment: "id-mock-post-hello-comment",
            token: "token-mock-astrodev"
        })

        const output =  await commentBussiness.deleteComment(input)
        expect(output).toEqual({
            message: "Seu post foi deletado"
        })
    })

    test("Retorna erro ZodError", async ()=>{
        expect.assertions(1)
        try {
            const input = DeleteCommentSchema.parse({
                idComment: true,
                token:0
            })
    
            const output =  await commentBussiness.deleteComment(input)
        } catch (error) {
            if(error instanceof ZodError){
                // console.log(error.issues)
                expect(error.issues).toEqual([
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'boolean',
                        path: [ 'idComment' ],
                        message: 'Expected string, received boolean'
                      },
                      {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: [ 'token' ],
                        message: 'Expected string, received number'
                      }
                ])
            }    
        }
    })

    test("Retorna Unauthorized", async ()=>{
        expect.assertions(2)
        try {
            const input = DeleteCommentSchema.parse({
                idComment: "id-mock-post-hello-comment",
                token: "token-mock-astcxv"
            })
    
            const output =  await commentBussiness.deleteComment(input)
        } catch (error) {
            if(error instanceof UnauthorizedError){
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    test("Retorna Unauthorized", async ()=>{
        expect.assertions(2)
        try {
            const input = DeleteCommentSchema.parse({
                idComment: "id-mock-post-hello-comment",
                token: "token-mock-fulano"
            })
    
            const output =  await commentBussiness.deleteComment(input)
        } catch (error) {
            if(error instanceof UnauthorizedError){
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Só podem deletar o usuário que criou")
            }
        }
    })

    test("Retorna BadRequestError com a mensagem 'Esse idPost está incorreto ou não existe mais'", async ()=>{
        expect.assertions(2)
        try {
            const input = DeleteCommentSchema.parse({
                idComment: "id-mock-post-mment",
                token: "token-mock-astrodev"
            })
    
            const output =  await commentBussiness.deleteComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                // console.log(error)
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Esse comentário está incorreto ou não existe mais")
            }
        }
    })
})