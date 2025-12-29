import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
// PrimeNG Imports
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message'; 
import { MessageService } from 'primeng/api'; 
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    CheckboxModule,
    ToastModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService] // Ensure MessageService is available
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private messages = inject(MessageService);
  private router = inject(Router);

  goToSignup() { 
    this.router.navigate(['/signup']); 
  }

  // Form definition
  login = this.fb.group({
    userOrEmail: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  ngOnInit(): void {
    // Check if 'Remember Me' was previously used
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
    // 1. Validate Form Basics
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      this.messages.add({
        severity: 'error',
        summary: 'Fix errors',
        detail: 'Please enter your credentials.'
      });
      return;
    }

    const { userOrEmail, password, rememberMe } = this.login.value;

    // 2. Fetch users from LocalStorage (the "database")
    const users = JSON.parse(localStorage.getItem('tv_users') || '[]');

    // 3. Search for the user by Email OR Username
    const foundUser = users.find((u: any) => 
      u.email?.toLowerCase() === userOrEmail?.toLowerCase() || 
      u.username?.toLowerCase() === userOrEmail?.toLowerCase()
    );

    // 4. Validation Checks
    if (!foundUser) {
      this.messages.add({ 
        severity: 'error', 
        summary: 'Access Denied', 
        detail: 'User not found. Please sign up first.' 
      });
      return;
    }

    if (foundUser.password !== password) {
      this.messages.add({ 
        severity: 'error', 
        summary: 'Security Error', 
        detail: 'Incorrect password.' 
      });
      return;
    }

    // 5. Successful Login
    this.messages.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: `Welcome back, ${foundUser.fullName}!` 
    });

    // Handle "Remember Me" logic
    if (rememberMe) {
      localStorage.setItem('rememberedUser', userOrEmail!);
      localStorage.setItem('rememberedPass', password!);
    } else {
      localStorage.removeItem('rememberedUser');
      localStorage.removeItem('rememberedPass');
    }

    // Store the "Current Session" so other pages know you are logged in
    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    // Redirect to home/dashboard after a small delay to show the success message
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1200);
  }
}