import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  
  private cars:Car[] = [
    
  ]

  findAll(){
    return this.cars;
  }
  findOneById(id:string){
    const car = this.cars.find(car => car.id === id);
    if(!car) throw new NotFoundException(`Cart with id ${id} not found`);
    
    return car ;
  }
  create(createCarDto:CreateCarDto){
    const car:Car = {id:uuid(),...createCarDto}

    this.cars.push(car);

    return car;
  }
  update(id:string, updateCarDto:UpdateCarDto){
    let carDB = this.findOneById(id);

    if(updateCarDto.id && updateCarDto.id !==id){
      throw new BadRequestException(`Car id is not valid inside body`);
    }

    this.cars = this.cars.map(car => {
      
      if(car.id === id){
        carDB = { ...carDB, ...updateCarDto, id}
        console.log(carDB);
        return carDB;
      }
    })

    return carDB;
  }

  delete(id:string){
    const car = this.findOneById(id);
    if(!car) throw new BadRequestException(`Car with id ${id} not found`);
    this.cars = this.cars.filter(car => car.id !== id);

    return "ok"
  }

  fillCarsWithSeedData(cars:Car[]){
    return this.cars = cars;
  }
}
