import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoginService } from './login.service';

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
  loading = false;
  subscriptions: Subscription[] = [];


  constructor(private _loginService:LoginService,private fb: FormBuilder)
  {

  }

  ngOnInit()
  {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      remember_me: new FormControl(false)
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

    const doHttpRequest = () => {

      this.inValid = false;
      this.loading = true;
      this.subscriptions.push(this._loginService.login(this.createLoginBody())
        .pipe(
          catchError((err: any) => {
            if (err.error.errorCode == 110) {
              this.loading = false;
              this.inValid = true;
              this.warningMsg = "Invalid Credentials";
            }

            return of(false);
          }),
          finalize(() => this.loading = false),
        )
        .subscribe((res:any) => {
          if (res.success) {
            this._loginService.afterLogin(res);
          } else {
            this.inValid = true;
          }
        })
      );
    };
    doHttpRequest();

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
