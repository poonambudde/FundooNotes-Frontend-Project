import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private user:UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z]{3,}[1-9]{1,4}[@][a-z]{4,}[.][a-z]{3,}$")]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
    });

  }

  onSubmit() {
    console.log("inside submit");
    if(this.registerForm.valid)
  {
      console.log("valid data", this.registerForm.value);
      let data={
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        address:""
      }
      this.user.registration(data).subscribe((res:any)=>{
        console.log(res);
        localStorage.setItem('token',res)
        this.snackBar.open('Registration Successfull  !','',{
          duration: 2000,
        });
        
      },error => {
       this.snackBar.open('Please enter correct data','',{
         duration: 2000,
       });
       })
  }
  else
  {
    console.log("Invalid data", this.registerForm.value);
  }
}
}