import { IpropertyBase } from './ipropertyBase';

export class Property implements IpropertyBase{   //It implements the IpropertyBase (polymorphism)
    id: number; 
    sellRent: number;
    name: string;
    pType: string;
    BHK: number;
    fType: string;
    price: number;
    builtArea: number;
    carpetArea?: number;
    address: string;
    address2?: string;
    city: string;
    floorNo: number;
    totalFloor?: number;
    RTM: number;
    AOP?: string;
    mainEntrance?: string;
    security?: number;
    gated?: number;
    maintenance?: number;
    possession?: string;
    image?: string;
    description?: string;
    postedOn: string;
    postedBy: number;
}