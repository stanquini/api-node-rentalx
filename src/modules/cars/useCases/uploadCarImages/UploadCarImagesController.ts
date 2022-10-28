import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUserCase";

interface IFiles {
  filename: string;
}
class UploadCarImagesController {
  async handle(req: Request, response: Response) {

    const { id } = req.params;
    const images = req.files as IFiles[];
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);
    const images_name = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });
    
    return response.status(201).send();
  }
  
}

export { UploadCarImagesController };
