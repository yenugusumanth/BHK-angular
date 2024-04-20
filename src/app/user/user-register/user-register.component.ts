import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';
import { AlertyfyService } from 'src/app/services/alertyfy.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent { //ReactiveForm Logic flows from ts to html file.
  registerationForm: FormGroup;  //FormGroup is a class used to organize and manage the related Form Controls and validates each controls added in this class(FormGroup)
  user : User;
  userSubmitted: boolean;
  constructor(private fb : FormBuilder,
              private userService : UserServiceService,
              private alertify : AlertyfyService ){ } //FormBuilder easier Reactive Forms
  ngOnInit(){
    // this.registerationForm =new FormGroup({   // FormGroup  should contain an object. must declare FormControl
    //   userName : new FormControl("SUM",Validators.required), //FormControl should contain ('value',validators)
    //   email : new FormControl(null,[Validators.required,Validators.email]), //To add multiple validators sholud add in array
    //   password : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //   confirmPassword : new FormControl(null,[Validators.required]),
    //   mobile : new FormControl(null,[Validators.required,Validators.minLength(10)])
    // },this.passwordMatchValidators,
    this.createRegistrationForm()
  }
   createRegistrationForm(){
    this.registerationForm = this.fb.group({
        userName : [null,Validators.required],
        email : [null,[Validators.required,Validators.email]], //To add multiple validators sholud add in array
        password :[null,[Validators.required,Validators.minLength(8)]],
        confirmPassword : [null,[Validators.required]],
        mobile : [null,[Validators.required,Validators.minLength(10)]],
      },{validators:this.passwordMatchValidators})
   }
   passwordMatchValidators(fg : FormGroup): Validators{
      return fg.get("password").value === fg.get("confirmPassword").value ? null :   //It is like customvalidators function should contain parameters : validators(validatora should return null if true else json object (key : value))
      {notmatched : true}
   }

   onSubmit(){
    console.log(this.registerationForm.value);
    this.userSubmitted=true

    if(this.registerationForm.valid){
      //this.user = Object.assign(this.user,this.registerationForm.value) //the values given storing in the user key
      this.userService.addUser(this.UserData()) //Implemented addUser() method  in userservice file retriving by importing here 
      this.userSubmitted=false
      this.alertify.success("Congrats , You are successfully registered") //success method created in services
    }else {
      this.alertify.error("Kindly Provide the Details")
    }
 }
 
 UserData(): User {
  return this.user ={
    userName: this.userName.value,
    email: this.email.value,
    password: this.password.value,
    mobile: this.mobile.value
  }
 }

   // getter methods for all form controls
   get userName(){
    return this.registerationForm.get('userName') as FormControl;
   };
   get email(){
    return this.registerationForm.get('email') as FormControl;
   };
   get password(){
    return this.registerationForm.get('password') as FormControl;
   };
   get confirmPassword(){
    return this.registerationForm.get('confirmPassword') as FormControl;
   };
   get mobile(){
    return this.registerationForm.get('mobile') as FormControl;
   }
 
}