
// import { Component, inject } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// import { InputTextModule } from 'primeng/inputtext';
// import { PasswordModule } from 'primeng/password';
// import { ButtonModule } from 'primeng/button';
// import { MessageModule } from 'primeng/message';   // p-message for inline errors
// import { MessageService } from 'primeng/api';       // for toast notifications
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, MessageModule,CommonModule],
//   templateUrl: './login.html'
// })
// export class Login {
//   private fb = inject(FormBuilder);
//   private messages = inject(MessageService);
//   private router = inject(Router);

//   loading = false;

//   form = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });

//   submit(): void {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();

//       // Global toast telling user to fix errors
//       this.messages.add({
//         severity: 'error',
//         summary: 'Fix errors',
//         detail: 'Please correct the highlighted fields.'
//       });
//       return;
//     }

//     this.loading = true;

//     // Simulate login (replace with real AuthService)
//     setTimeout(() => {
//       localStorage.setItem('tv_token', 'FAKE_JWT_' + Date.now());
//       this.loading = false;

//       this.messages.add({
//         severity: 'success',
//         summary: 'Welcome',
//         detail: 'Login successful.'
//       });

//       this.router.navigate(['/home']);
//     }, 600);
//   }
// }







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
  selector: 'app-signup',
  standalone: true,
  imports: [
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
export class Signup{
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

  // Field-level validator factory (e.g., password complexity)
  static regex(pattern: RegExp, key: string) {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value ? null : pattern.test(control.value) ? null : { [key]: true };
  }

  // Form-level validator to compare two fields
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
      this.messages.add({
        severity: 'error',
        summary: 'Fix errors',
        detail: 'Please correct the highlighted fields.'
      });
      return;
    }

    // Simulate registration (replace with API call)
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

    this.messages.add({
      severity: 'success',
      summary: 'Account created',
      detail: 'Please log in.'
    });
    this.router.navigate(['/login']);
  }
}

