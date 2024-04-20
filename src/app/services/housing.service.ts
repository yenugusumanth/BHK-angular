import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IpropertyBase } from '../model/ipropertyBase';
import { Iproperty } from '../Property/Iproperty.Interface';
import { Property } from '../model/property';



@Injectable({       //services are decorated by using @Injectable
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number){  
    return this.getAllProperties().pipe(      //getting all details from gellAllProperties method
      map(propertiesArray => {
        return propertiesArray.find(p => p.id === id) //it gives the data of specific passing id
        console.log(propertiesArray)
      })
    )
  }

  //getting all the data from local storage and properties.json
  getAllProperties(sellRent?: number): Observable<IpropertyBase[]>{
    return this.http.get('data/properties.json').pipe(  //fetching the data from data/properties.json file
      map(data => {
        const propertiesArray: Array<IpropertyBase> = []; //creating an array
        const localproperties = JSON.parse(localStorage.getItem('newProp'))

        if(localproperties){
          for (const id in localproperties) {  
            if (sellRent){ //if getting sellRent number we will return the data as per sellRent flag
              if (localproperties.hasOwnProperty(id) && localproperties[id].sellRent === sellRent){ 
                propertiesArray.push(localproperties[id]);    //pushing the data into array
             }
            }else{  //else we will return all the data getting from local storage
                propertiesArray.push(localproperties[id]); 
            }
          }
        }
        for (const id in data) {  
          if(sellRent){ // if getting sellRent number we will return the data as per sellRent flag
            if (data.hasOwnProperty(id) && data[id].sellRent === sellRent){ 
              propertiesArray.push(data[id]);    //pushing the data into array
           }
          }else{ //else we will return the data getting from the properties.json
            propertiesArray.push(data[id]);  
          }
        }
        return propertiesArray;
      })
      
    );   
  }
    addProperty(property : Property){
      let newProp = [property]; // defining array to a newProp KEY (property contains all the values)

      // Add new property to an arrat if newProp exists already
      if(localStorage.getItem('newProp')){
        newProp = [property,...JSON.parse(localStorage.getItem('newProp'))]
      }
      localStorage.setItem('newProp', JSON.stringify(newProp))
   }
   newPropId(){
    if (localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID')
    }else{
      localStorage.setItem('PID','101');
      return 101
    }
   }
}


