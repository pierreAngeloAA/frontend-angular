import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

describe('authInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let auth: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
  });

  afterEach(() => backend.verify());

  it('adds the Bearer token', () => {
    localStorage.setItem('auth_token', 'jwt');

    http.get(`${environment.apiUrl}/customers`).subscribe();

    expect(backend.expectOne(`${environment.apiUrl}/customers`).request.headers.get('Authorization')).toBe('Bearer jwt');
  });

  it('sends no Authorization header without a token', () => {
    http.get(`${environment.apiUrl}/customers`).subscribe();

    expect(backend.expectOne(`${environment.apiUrl}/customers`).request.headers.has('Authorization')).toBeFalse();
  });

  it('on a 401 ends the session with a single logout call (no loop)', () => {
    localStorage.setItem('auth_token', 'expired');

    http.get(`${environment.apiUrl}/customers`).subscribe({ error: () => undefined });
    backend.expectOne(`${environment.apiUrl}/customers`).flush({}, { status: 401, statusText: 'Unauthorized' });

    // The logout request itself answers 401 with an expired token: it must not
    // trigger another logout.
    backend.expectOne(`${environment.apiUrl}/logout`).flush({}, { status: 401, statusText: 'Unauthorized' });
    backend.expectNone(`${environment.apiUrl}/logout`);

    expect(auth.isAuthenticated()).toBeFalse();
  });
});
