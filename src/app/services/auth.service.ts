import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authUser(user : any){ 
    let userArray=[];  //creating Array
    if (localStorage.getItem('Users')){ //if data is available in the local storage
      userArray = JSON.parse(localStorage.getItem('Users')); //adding the data inti userArray
    }
    return userArray.find(p => p.userName === user.userName && p.password === user.password)

  }
}
