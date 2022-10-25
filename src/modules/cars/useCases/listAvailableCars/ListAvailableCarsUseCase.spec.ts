import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be ableto list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "description": "Carro description",
      "daily_rate": 110.98,
      "license_plate": "SEO-1433",
      "fine_amount": 40,
      "brand": "Car_brand",
      "category_id": "category_id",
    })
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "description": "Carro description",
      "daily_rate": 110.98,
      "license_plate": "SEO-1434",
      "fine_amount": 40,
      "brand": "Car_brand_test",
      "category_id": "category_id",
    })
    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "description": "Carro description",
      "daily_rate": 100.98,
      "license_plate": "SEO-1435",
      "fine_amount": 30,
      "brand": "Car_brand_test",
      "category_id": "category_id",
    })
    const cars = await listCarsUseCase.execute({
      name: "Car3"
    });
    expect(cars).toEqual([car])
  })
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car4",
      "description": "Carro description",
      "daily_rate": 100.98,
      "license_plate": "SEO-1436",
      "fine_amount": 30,
      "brand": "Car_brand_test",
      "category_id": "category_id",
    })
    const cars = await listCarsUseCase.execute({
      category_id: "category_id",
    });
    expect(cars).toEqual([car])
  })

})