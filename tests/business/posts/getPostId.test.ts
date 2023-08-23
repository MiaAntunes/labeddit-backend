import { ZodError } from "zod"
import { PostsBussiness } from "../../../src/business/PostBussiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { UnauthorizedError } from "../../../src/errors/UnauthorizedError"
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock"

// token fulano token-mock-fulano
// token astrodev token-mock-astrodev


describe("Testando o getPostAll", () => {
    // colocar o new userBusiness
    const postBussiness = new PostsBussiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock()

    )

    test("Recebe um idPost e um token , retornando o post do id junto com todos os comentários dele", async ()=>{

    })

    test("Retorna erro ZodError", async ()=>{
        
    })

    test("Retorna Unauthorized", async ()=>{
        
    })

    test("Retorna BadRequestError com a mensagem 'Esse idPost está incorreto ou não existe mais'", async ()=>{
        
    })

})