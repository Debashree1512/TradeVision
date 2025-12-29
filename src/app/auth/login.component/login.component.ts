import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';   // p-message for inline errors
import { MessageService } from 'primeng/api';       // for toast notifications
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule,ButtonModule, InputTextModule, PasswordModule, MessageModule, CommonModule, CheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private messages = inject(MessageService);
  private router = inject(Router);

  login = this.fb.group(
    { userOrEmail: ['', Validators.required], 
      password: ['', [ Validators.required ]], 
      rememberMe: [false]
    }); 
  ngOnInit(): void {
    const rememberedUser = localStorage.getItem('rememberedUser'); 
    const rememberedPass = localStorage.getItem('rememberedPass');
    if (rememberedUser && rememberedPass) {
      this.login.patchValue({
        userOrEmail: rememberedUser, 
        password: rememberedPass,
        rememberMe: true
      });
    }
  }

  submit(): void {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      this.messages.add({
        severity: 'error',
        summary: 'Fix errors',
        detail: 'Please correct the highlighted fields.'
      });
      return;
    }

    const { userOrEmail, password, rememberMe } = this.login.value;

    const validUser = userOrEmail === 'aashmitha' || userOrEmail === 'aashmitha@gmail.com';
    const validPass = password === 'abc123';

    if (!validUser && !validPass) {
      this.messages.add({ severity: 'error', summary: 'Invalid credentials', detail: 'Invalid credentials.' });
      return;
    }
    if (!validUser) {
      this.messages.add({ severity: 'error', summary: 'Invalid username', detail: 'Please enter a valid username or Gmail.' });
      return;
    }
    if (!validPass) {
      this.messages.add({ severity: 'error', summary: 'Invalid password', detail: 'Please enter the correct password.' });
      return;
    }

    this.messages.add({ severity: 'success', summary: 'Welcome', detail: 'Welcome aashmitha' });

    if (rememberMe) {
      localStorage.setItem('rememberedUser', userOrEmail!);
      localStorage.setItem('rememberedPass', password!);
    } else {
      localStorage.removeItem('rememberedUser');
      localStorage.removeItem('rememberedPass');
    }
  }
}
