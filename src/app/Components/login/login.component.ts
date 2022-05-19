import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private user: UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z]{3,}[1-9]{1,4}[@][a-z]{4,}[.][a-z]{3,}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  onSubmit() {
    console.log("inside submit");
    if (this.loginForm.valid) {
      console.log("valid data", this.loginForm.value);
      let data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      this.user.userlogin(data).subscribe((result: any) => {
        console.log(result.message)
         localStorage.setItem('token', result.message)
             this.snackBar.open('login Successful !','',{
               duration: 2000,
             });

           },error =>{
            this.snackBar.open('Please enter correct data','',{
              duration: 2000,
            });
      })
    }
    else {
      console.log("Invalid data", this.loginForm.value);
    }
  }
}