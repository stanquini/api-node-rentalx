import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { AutenticateUserUseCase } from "./AuthenticateUserCase";

let authenticateUserUseCase: AutenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {
  
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AutenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  
  it("should be able to authenticate an user", async() => {
    
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    }
    
    await  createUserUseCase.execute(user);
    
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    
    expect(result).toHaveProperty("token");
    
  });
  
  it("should not be able to authenticate an no existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "12345"
      });
    }).rejects.toBeInstanceOf(AppError);
  })
  
  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "3443",
        password: "werooi",
        email: "user@test.com",
        name: "User Teste"
      }
      
      await createUserUseCase.execute(user);
      
      await authenticateUserUseCase.execute({
        email: user.email,
        password: '776788'
      });
    }).rejects.toBeInstanceOf(AppError);
  })
  
});