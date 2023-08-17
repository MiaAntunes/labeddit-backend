import { UserBusiness } from "../../../src/business/UserBusiness"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"


describe("Testando Login", ()=>{
    const userBussiness = new UserBusiness(
        new UserDatabaseMock(),
        new HashManagerMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()

    )
    // ! Testar de está retornando o token 
    test("Recebe o email e a senha, para retonar o token", async ()=>{

    })

    // ! Testar o error ZOD
    test("",  ()=>{
        expect.assertions(1)

        try {
            
        } catch (error) {
            
        }
    })

    // ! Testar o error email inválido
    test("", async ()=>{
        expect.assertions(1)

        try {
            
        } catch (error) {
            
        }    
    }) 

})