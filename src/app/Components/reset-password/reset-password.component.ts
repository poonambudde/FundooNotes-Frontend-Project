import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  [x: string]: any;
  resetPasswordForm!:FormGroup;
  submitted=false;
token:any
  constructor(private formBuilder: FormBuilder, private user:UserService, private activeRoute:ActivatedRoute,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetPasswordForm=this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required]
    });
    this.token = this.activeRoute.snapshot.paramMap.get('token');
    console.log(this.token);
  } 
  
  onSubmit() {
    console.log("inside submit");
    if(this.resetPasswordForm.valid)
  {
      console.log("valid data", this.resetPasswordForm.value);
      let data = {      
        password: this.resetPasswordForm.value.password,
        confirmpassword: this.resetPasswordForm.value.confirmpassword,
      }
        this.user.resetPassword(data,this.token).subscribe((res:any)=>{
          console.log(res);
          this.snackBar.open('reset password set successfully','',{
            duration: 2000,
          });

        },error =>{
         this.snackBar.open('Please enter correct data','',{
           duration: 2000,
         });
        })
  }
  else
  {
    console.log("Invalid data", this.resetPasswordForm.value);
  }
}
}
