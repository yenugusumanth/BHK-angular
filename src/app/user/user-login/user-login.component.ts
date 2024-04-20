import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(private authService : AuthService,
              private alertify : AlertyfyService,
              private router : Router){}
   
  ngOnInit(){
  }
  onLogin(loginForm : NgForm){
    console.log(loginForm.value)
    const token =  this.authService.authUser(loginForm.value);
    if(token){
      localStorage.setItem('token',token.userName) //token has been generated and we assigned that token name is 'token'
      this.alertify.success("Login successful");
      this.router.navigate(['/']);
    }else{
     this.alertify.error('Invalid credintials')
    }
  }
}
