import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

//confirma match entre password
export function passwordMatchValidator (passwordKey:string, confirmPasswordKey:string) : ValidatorFn{
  return (control : AbstractControl) : {[key : string] : any} | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;
    return password === confirmPassword ? null : {passwordMismatch : true};
  } 
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent  implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private accountService:AccountService) { }

  registerForm = this.fb.group({
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])[a-z\d]*(?=.*[^A-Za-z0-9]{2,}).{8,}$")]),
    confirmPassword : new FormControl('')
  },{
    validator : passwordMatchValidator('password', 'confirmPassword')
  });

  ngOnInit() {}

  backToLogin(){
    this.router.navigate(['/']);
  }

  submitForm(){
    console.log("submit");
    this.accountService.register(this.registerForm.value);
  }

}
