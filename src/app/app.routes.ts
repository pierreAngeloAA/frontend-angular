import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './features/customers/customer-form/customer-form.component';
import { ImportUploadComponent } from './features/imports/import-upload/import-upload.component';
import { LogoutComponent } from './features/auth/logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  {
    path: 'customers',
    canActivate: [authGuard],
    children: [
      { path: '', component: CustomerListComponent },
      { path: 'new', component: CustomerFormComponent },
      { path: ':id/edit', component: CustomerFormComponent }
    ]
  },
  {
    path: 'imports',
    canActivate: [authGuard],
    children: [
      { path: 'upload', component: ImportUploadComponent }
    ]
  },

  { path: '**', redirectTo: '/customers' }
];
