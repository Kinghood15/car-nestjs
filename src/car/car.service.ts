import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './car.dto';
import { Types } from 'mongoose'

const carProjection = {
  __v: false,
  _id: true,
};

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

  public async getCars(): Promise<CarDto[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public async postCar(newCar: CarDto) {
    const car = await new this.carModel(newCar);
    return car.save();
  }

  public async getCarById(id: string): Promise<CarDto> {
    const car = await this.carModel.findOne({ _id:new Types.ObjectId(id) }, carProjection).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async deleteCarById(id: string ): Promise<CarDto> {
    const car = await this.carModel.deleteOne({ _id:new Types.ObjectId(id) }).exec();
    if (car.deleteCount === 0) {
      throw new HttpException('Not Found', 404);
    }else if(car.deleteCount === 1){

    }
    return car;
  }

  public async putCarById(
    id: string,
    propertyName: string,
    propertyValue: string,
  ): Promise<CarDto> {
    const car = await this.carModel
      .findOneAndUpdate(
        { id },
        {
          [propertyName]: propertyValue,
        },
      )
      .exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}
