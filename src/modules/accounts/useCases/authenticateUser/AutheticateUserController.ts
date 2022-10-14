import { Request } from "express";
import { container } from "tsyringe";
import { AutenticateUserUseCase } from "./AuthenticateUserCase";


class AuthenticateUsercontroller {
  
  async handle(req: Request, res: Response): Promise<Response>{
    const { password, email } = req.body;
    const authenticateUserUseCase = container.resolve(AutenticateUserUseCase);
    const token =  await authenticateUserUseCase.execute({password, email});
    return res.json(token);
  }
}

export { AuthenticateUsercontroller };
