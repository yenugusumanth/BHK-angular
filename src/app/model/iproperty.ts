import { IpropertyBase } from './ipropertyBase';

export interface IProperty extends IpropertyBase {  //It extends the ipropertyBase such as all key:values  (inheritance)
  Description: string;
}