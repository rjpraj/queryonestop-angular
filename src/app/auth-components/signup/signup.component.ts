import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;

  constructor(
    private service:AuthService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router
  ){}

  ngOnInit(){
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{validator : this.confirmationValidator})
    console.log(this.signupForm)
  }

  private confirmationValidator(fg: FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if(password != confirmPassword){
      fg.get('confirmPassword')?.setErrors({passwordMismatch : true});
    }
    else{
      fg.get('confirmPassword')?.setErrors(null);
    }
  }


  signup(){
    console.log(this.signupForm.value);
    this.service.signup(this.signupForm.value).subscribe((response)=>{
      console.log(response);
      if(response.id!=null){
        this.snackBar.open("Youy are registered successfully!",'Close',{duration:5000});
        this.router.navigateByUrl('/login');
      } else {
        this.snackBar.open(response.message, 'Close',{duration: 5000})
      }
    },(error: any)=>{
      this.snackBar.open("Registartion failed, Please try later !!",'Close',{duration: 5000})
    })
  }
}
