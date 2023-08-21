import { ZodError, boolean } from "zod"
import { LikeDeslikeBusiness } from "../../../src/business/LikeDeslikeBussiness"
import { LikeOrDeslikeSchema } from "../../../src/dto/LikeDeslikeDto/LikeOrDeslikeDto"
import { LikeDeslikeDatabaseMock } from "../../mocks/LikeDeslikeDatabaseMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"


describe("Testando o addLikeOrDeslike", () => {
    const likeDeslikeBussiness = new LikeDeslikeBusiness(
        new PostsDataBaseMocks(),
        new TokenManagerMock(),
        new LikeDeslikeDatabaseMock()
    )

    // Recebe o idPost, like, token e retorna mensagem - Dando um deslike
    test("Recebe o idPost, like, token e retorna mensagem", async () => {
        const input = LikeOrDeslikeSchema.parse({
            idPost: "id-mock-post-rotine",
            likeOrDeslike: false,
            token: "token-mock-astrodev"
        })

        const output = await likeDeslikeBussiness.putLikeOrDeslike(input)

        expect(output).toEqual({
            message: "Ok"
        })
    })

    // Recebe o idPost, like, token e retorna mensagem - Retirando o deslike
    test("Recebe o idPost, like, token e retorna mensagem", async () => {
        const input = LikeOrDeslikeSchema.parse({
            idPost: "id-mock-post-music",
            likeOrDeslike: false,
            token: "token-mock-fulano"
        })

        const output = await likeDeslikeBussiness.putLikeOrDeslike(input)

        expect(output).toEqual({
            message: "Ok"
        })
    })

    // Recebe o idPost, like, token e retorna mensagem - Retirando um like
    test("Recebe o idPost, like, token e retorna mensagem", async () => {
        const input = LikeOrDeslikeSchema.parse({
            idPost: "id-mock-post-hello",
            likeOrDeslike: true,
            token: "token-mock-astrodev"
        })

        const output = await likeDeslikeBussiness.putLikeOrDeslike(input)

        expect(output).toEqual({
            message: "Ok"
        })
    })

    // Recebe o idPost, like, token e retorna mensagem - Adicionando o like
    test("Recebe o idPost, like, token e retorna mensagem", async () => {
        const input = LikeOrDeslikeSchema.parse({
            idPost: "id-mock-post-dance",
            likeOrDeslike: true,
            token: "token-mock-fulano"
        })

        const output = await likeDeslikeBussiness.putLikeOrDeslike(input)

        expect(output).toEqual({
            message: "Ok"
        })
    })


    // Error ZOD
    test("Recebe o idPost, likeOrDeslike e o token com tipagens erradas e retorna um ZodError", async () => {
        expect.assertions(1)

        try {
            const input = LikeOrDeslikeSchema.parse({
                idPost: 0,
                likeOrDeslike: 0,
                token: boolean
            })

            const output = await likeDeslikeBussiness.putLikeOrDeslike(input)

        } catch (error) {
            if (error instanceof ZodError) {
                // console.log(error.issues)
                expect(error.issues).toEqual([
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'number',
                        path: ['idPost'],
                        message: 'Expected string, received number'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'boolean',
                        received: 'number',
                        path: ['likeOrDeslike'],
                        message: 'Expected boolean, received number'
                    },
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        received: 'function',
                        path: ['token'],
                        message: 'Expected string, received function'
                    }
                ])
            }
        }
    })

    //Error do post incorreto
    test("Recebe likeOrDeslike, token, porém o idPost incorreto, retornando um error BadRequestError", async () => {
        // expect.assertions(2)

        try {
            const input = LikeOrDeslikeSchema.parse({
                idPost: "aaaaaaaaaaaaaaa",
                likeOrDeslike: false,
                token: "token-mock-astrodev"
            })

            const output = await likeDeslikeBussiness.putLikeOrDeslike(input)
            // console.log(output)
        } catch (error) {
            if (error instanceof BadRequestError) {
                // console.log(error)
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Esse post não existe ou id está errado")
            }
        }
    })

    // Error não autorizado
    test("Recebe idPost, likeOrDeslike, porém o token incorreto, retornando um error UnauthorizedError", async () => {
        expect.assertions(2)

        try {
            const input = LikeOrDeslikeSchema.parse({
                idPost: "id-mock-post-rotine",
                likeOrDeslike: true,
                token: "token-mock-as"
            })

            const output = await likeDeslikeBussiness.putLikeOrDeslike(input)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                // console.log(error)
                expect(error.statusCode).toBe(401)
                expect(error.message).toBe("Token inválido")
            }
        }
    })

    //Error não pode curtir seu próprio post
    test("Recebe idPost, likeOrDeslike e o token, porém é o mesmo criador do post contudo retorna um erro BadRequestError", async () => {
        expect.assertions(2)

        try {
            const input = LikeOrDeslikeSchema.parse({
                idPost: "id-mock-post-music",
                likeOrDeslike: false,
                token: "token-mock-astrodev"
            })

            const output = await likeDeslikeBussiness.putLikeOrDeslike(input)
        } catch (error) {
            if (error instanceof BadRequestError) {
                // console.log(error)
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Você não pode curtir seu próprio post")
            }
        }
    })


})