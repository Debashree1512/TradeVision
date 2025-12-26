import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router'
import { Signup } from './auth/sign-up.component/sign-up.component';



function authGuard() {
  const token = localStorage.getItem('tv_token');
  if (token) return true;
  inject(Router).navigate(['/login']);
  return false;
}

export const routes: Routes = [
//   { path: 'login', component: Login },
  { path: 'signup', component:  Signup},
{ path: '', redirectTo: 'Home', pathMatch: 'full' }
];


