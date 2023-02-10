import { Document } from 'mongoose';

export interface ICar extends Document {
   brand: string;
   color: string;
   model: string;
   make:string;
   year:number;
}
