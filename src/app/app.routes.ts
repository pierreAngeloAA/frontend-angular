import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'customers',
    canActivate: [authGuard],
    children: [
      { path: '', component: CustomerListComponent },
      { path: 'new', component: CustomerFormComponent },
      { path: ':id/edit', component: CustomerFormComponent }
    ]
  },

  { path: '**', redirectTo: '/customers' }
];
