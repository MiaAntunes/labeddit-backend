import { ZodError } from "zod";
import { CommentsBusiness } from "../../../src/business/CommentsBusiness";
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { LikeOrDeslikeCommentsSchema } from "../../../src/dto/CommentDto/putLikeOrDeslikeComments.dto";


describe("Testando o createComment", () => {
    const commentBussiness = new CommentsBusiness(
        new CommentDatabaseMock(),
        new PostsDataBaseMocks(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
    )

    // Recebe o idPost, like, token e retorna mensagem - Retirando o deslike
    test("Recebe o idComments, idPost, like, token e retorna mensagem - Retirando o like", async () => {
        const input = LikeOrDeslikeCommentsSchema.parse({
            idComments: "id-mock-post-hello-comment",
            likeOrDeslike: true,
            token: "token-mock-fulano"
        })
        const output = await commentBussiness.putLikeOrDeslikeComment(input)
        expect(output).toEqual(
            {
                message: 'Ok'
            }
        )
    })


    // Recebe o idPost, like, token e retorna mensagem - Retirando um like
    test("Recebe o idComments, idPost, like, token e retorna mensagem - Adicionando o deslike", async () => {
        const input = LikeOrDeslikeCommentsSchema.parse({
            idComments: "id-mock-post-hello-comment",
            likeOrDeslike: false,
            token: "token-mock-fulano"
        })
        const output = await commentBussiness.putLikeOrDeslikeComment(input)
        expect(output).toEqual(
            {
                message: 'Ok'
            }
        )
    })

    // Recebe o idPost, like, token e retorna mensagem - Adicionando o like
    test("Recebe o idComments, idPost, like, token e retorna mensagem - Retirando o deslike", async () => {
        const input = LikeOrDeslikeCommentsSchema.parse({
            idComments: "id-mock-post-music-comment",
            likeOrDeslike: false,
            token: "token-mock-astrodev"
        })
        const output = await commentBussiness.putLikeOrDeslikeComment(input)
        expect(output).toEqual(
            {
                message: 'Ok'
            }
        )
    })


    // Error ZOD
    test("Recebe o idComments, idPost, likeOrDeslike e o token com tipagens erradas e retorna um ZodError", async () => {
        expect.assertions(1)

        try {
            const input = LikeOrDeslikeCommentsSchema.parse({
                idComments: 0,
                likeOrDeslike: "false",
                token: 0
            })
            const output = await commentBussiness.putLikeOrDeslikeComment(input)
        } catch (error) {
            if (error instanceof ZodError) {
                expect(error.issues).toEqual([
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ['idComments'],
                        message: 'Expected string, received number'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'boolean',
                        received: 'string',
                        path: ['likeOrDeslike'],
                        message: 'Expected boolean, received string'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ['token'],
                        message: 'Expected string, received number'
                    }
                ])
            }
        }
    })

    test("Recebe idPost, likeOrDeslike, token, porém o idComments  incorreto, retornando um error BadRequestError", async () => {
        expect.assertions(2)

        try {
            const input = LikeOrDeslikeCommentsSchema.parse({
                idComments: "id-mock-post-music-comt",
                likeOrDeslike: false,
                token: "token-mock-astrodev"
            })
            const output = await commentBussiness.putLikeOrDeslikeComment(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Esse comentário não existe ou id está errado")
            } 
        }
    })

    // Error não autorizado
    test("Recebe idComment, idPost, likeOrDeslike, porém o token incorreto, retornando um error UnauthorizedError", async () => {
        expect.assertions(2)

        try {
            const input = LikeOrDeslikeCommentsSchema.parse({
                idComments: "id-mock-post-music-comment",
                likeOrDeslike: false,
                token: "token-mock-ast"
            })

            const output = await commentBussiness.putLikeOrDeslikeComment(input)

        } catch (error) {
            if (error instanceof UnauthorizedError) {
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    //Error não pode curtir seu próprio post
    test("Recebe idComment, idPost, likeOrDeslike e o token, porém é o mesmo criador do post contudo retorna um erro BadRequestError", async () => {
        expect.assertions(2)

        try {
            const input = LikeOrDeslikeCommentsSchema.parse({
                idComments: "id-mock-post-music-comment",
                likeOrDeslike: true,
                token: "token-mock-fulano"
            })

            const output = await commentBussiness.putLikeOrDeslikeComment(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Você não pode curtir seu próprio comentário")
            }
        }
    })

})