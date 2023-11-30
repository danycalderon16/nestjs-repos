import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';
export declare class CarsService {
    private cars;
    findAll(): Car[];
    findOneById(id: string): Car;
    create(createCarDto: CreateCarDto): Car;
    update(id: string, updateCarDto: UpdateCarDto): Car;
    delete(id: string): string;
    fillCarsWithSeedData(cars: Car[]): Car[];
}
