import { PostsBusiness } from "../../../src/business/PostBussiness"
import { PostsDatabase } from "../../../src/sql/database/PostDatabase"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostsDataBaseMocks } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"




describe("Testando o createPost", ()=>{
    // colocar o new userPost
    const postBussiness = new PostsBusiness(
        new PostsDataBaseMocks(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new UserDatabaseMock()
    )

    // Lista
    test("Recebe o token e deve retornar uma lista de posts", async ()=>{

    })

    // Error ZOD
    test("",()=>{
        expect.assertions(1)

        try {
            
        } catch (error) {
            
        }
    })

    //Error do token não autorizado
    test("", async()=>{
        expect.assertions(1)

        try {
            
        } catch (error) {
            
        }
    })

})