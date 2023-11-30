import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    getAllCars(): import("./interfaces/car.interface").Car[];
    getCarById(id: string): import("./interfaces/car.interface").Car;
    createCar(createCarDto: CreateCarDto): import("./interfaces/car.interface").Car;
    updateCar(id: string, updateCarDto: UpdateCarDto): import("./interfaces/car.interface").Car;
    deleteCar(id: string): string;
}
