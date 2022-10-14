import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, "d1e5204e076f93a196104b2661aed388") as IPayload;
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);
    if(!user) {
      throw new AppError("User does not existis!", 401);
    }
    
    req.user = {
      id: user_id
    }
    
    next();
  }
  catch {
    throw new AppError("Invalid token!", 401);
  }
}