import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStorage.clear();
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('stores the token and the user after logging in', () => {
    service.login({ email: 'a@b.com', password: 'x' }).subscribe();
    http.expectOne(`${environment.apiUrl}/login`).flush({ token: 'jwt', user: { id: 1, email: 'a@b.com' } });

    expect(service.getToken()).toBe('jwt');
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.currentUserValue).toEqual({ id: 1, email: 'a@b.com' });
  });

  it('does not log the login response (it contains the token)', () => {
    spyOn(console, 'log');

    service.login({ email: 'a@b.com', password: 'x' }).subscribe();
    http.expectOne(`${environment.apiUrl}/login`).flush({ token: 'jwt', user: { id: 1, email: 'a@b.com' } });

    expect(console.log).not.toHaveBeenCalled();
  });

  it('clears the session and goes to /login on logout', () => {
    localStorage.setItem('auth_token', 'jwt');

    service.logout();
    http.expectOne(`${environment.apiUrl}/logout`).flush(null);

    expect(service.isAuthenticated()).toBeFalse();
    expect(service.currentUserValue).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('clears the local session even if the API rejects the logout (expired token)', () => {
    localStorage.setItem('auth_token', 'expired');

    service.logout();
    http.expectOne(`${environment.apiUrl}/logout`).flush({ error: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(service.isAuthenticated()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
