import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message'; 
import { MessageService } from 'primeng/api'; 
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, // Required for *ngIf
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class Signup {
  private fb = inject(FormBuilder);
  private messages = inject(MessageService);
  private router = inject(Router);

  form = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Signup.regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'passwordComplexity')
        ]
      ],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    },
    { validators: [Signup.match('password', 'confirmPassword')] }
  );

  static regex(pattern: RegExp, key: string) {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value ? null : pattern.test(control.value) ? null : { [key]: true };
  }

  static match(primary: string, confirm: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const p = group.get(primary)?.value;
      const c = group.get(confirm)?.value;
      return p && c && p !== c ? { mismatch: true } : null;
    };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const users = JSON.parse(localStorage.getItem('tv_users') || '[]');
    const email = this.form.value.email!.toLowerCase();
    const username = this.form.value.username!.toLowerCase();

    const exists = users.some(
      (u: any) =>
        u.email?.toLowerCase() === email || u.username?.toLowerCase() === username
    );

    if (exists) {
      this.messages.add({
        severity: 'warn',
        summary: 'Already registered',
        detail: 'Email or username is already in use.'
      });
      return;
    }

    users.push(this.form.value);
    localStorage.setItem('tv_users', JSON.stringify(users));
    this.router.navigate(['/login']);
  }
}