import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isRememberMe = false;
  inValid =false;
  warningMsg = '';

  constructor(private LoginService:LoginService,private fb: FormBuilder)
  {

  }

  ngOnInit()
  {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      remember_me: new FormControl('false')
    });
  }

  submit()
  {
    if (this.loginForm.invalid) {
      this.inValid = true;
      if (this.loginForm.controls['username'].value == '') {
        this.warningMsg = "User name is required";
      } else if (this.loginForm.controls['password'].value == '') {
        this.warningMsg = "Password is required";
      }
      return;
    }
    console.log('loginform',this.loginForm);
  }

  onchange(env: any) {
    const len = String(env.target.value);

    if (len.length > 0) {
      this.inValid = false;
      this.warningMsg = '';
    }

  }

  getFormValue(name: string) {
    return this.loginForm.get(name)?.value;
  }


  createLoginBody(): {
    username:String,
    password:String,
    recpatcha:String
  } {
    return {
      username: this.getFormValue('username'),
      password: this.getFormValue('password'),
      recpatcha:this.getFormValue('remember_me')
    };
  }



  enterKey(event: any, number: number) {
    const password = document.getElementById("password");
    if (event.keyCode === 13 && event.target.value !== "") {
      if (number == 1) {
        password?.focus();
      }
      else {
        password?.blur();
        this.submit();
      }
    }
  }
}
