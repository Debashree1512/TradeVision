import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Signup } from './auth/sign-up.component/sign-up.component';
import { Home } from './home/home';

function authGuard() {
  const token = localStorage.getItem('tv_token');
  if (token) return true;
  inject(Router).navigate(['/login']);
  return false;
}

export const routes: Routes = [
//   { path: 'login', component: Login },
  { path: 'signup', component:  Signup},
  { path: 'home', component:Home , canActivate: [authGuard] },
//   { path: '', redirectTo: 'login', pathMatch: 'full' }
];


