import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';
export declare class SeedService {
    private readonly carService;
    private readonly brandService;
    constructor(carService: CarsService, brandService: BrandsService);
    populateDB(): string;
}
