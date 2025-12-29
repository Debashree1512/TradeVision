import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router'
import { Signup } from './auth/sign-up.component/sign-up.component';
import { Home } from './home/home';
import { LoginComponent } from './auth/login.component/login.component';




function authGuard() {
  const token = localStorage.getItem('tv_token');
  if (token) return true;
  inject(Router).navigate(['/login']);
  return false;
}

export const routes: Routes = [
  {path:'', component:Home},
  {path:'signup', component:Signup},
  {path:"login", component:LoginComponent}
];


