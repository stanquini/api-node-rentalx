import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }create(data: ICreateUserDTO): Promise<void> {
    throw new AppError("Method not implemented.");
  }
findByEmail(email: string): Promise<User> {
    throw new AppError("Method not implemented.");
  }
;

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if(userAlreadyExists) {
      throw new AppError("User already exists");
    }
    const passwordHash = await hash(password, 8)
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash, 
      driver_license
    })
  }
}

export { CreateUserUseCase };
