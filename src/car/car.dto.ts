import { IsString,IsInt,Min,Max,IsNumber,validate  } from 'class-validator'
export class CarDto {
  @IsString()
  brand: string;
  @IsString()
  color: string;
  @IsString()
  model: string;
  @IsString()
  make:string;
  @IsInt()
  @Min(1850)
  @Max(2023)
  year:number;
}

let car = new CarDto();

car.brand = 'invalid not string'; 
car.color = 'invalid not string'; 
// car.name = 'not valid';
// car.welcome = 'helo';

validate(car).then(errors => {
  // ...
}); // it will return errors for email, title and text properties