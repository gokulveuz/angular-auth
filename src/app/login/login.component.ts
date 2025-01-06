import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
    console.log('loginform',this.loginForm);

  }

  onchange(env: any) {
    const len = String(env.target.value);

    if (len.length > 0) {
      this.inValid = false;
      this.warningMsg = '';
    }

  }


}
