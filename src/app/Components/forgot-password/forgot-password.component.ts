import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,  private user:UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z]{3,}[1-9]{1,4}[@][a-z]{4,}[.][a-z]{3,}$")]],
    });

  }

  onSubmit() {
    console.log("inside submit");
    if(this.forgotPasswordForm.valid)
  {
      console.log("valid data", this.forgotPasswordForm.value);
      let data = {
        email: this.forgotPasswordForm.value.email,
        password: this.forgotPasswordForm.value.password,
      }
       this.user.forgotPassword(data).subscribe((res:any)=>{
         console.log(res);
         this.snackBar.open('Mail Sent Successfully','',{
          duration: 2000,
        });

      },error =>{
       this.snackBar.open('mail not sent','',{
         duration: 2000,
       });
       })
  }
  else
  {
    console.log("Invalid data", this.forgotPasswordForm.value);
  }
}

}