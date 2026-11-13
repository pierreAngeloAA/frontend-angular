import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const run = (url: string) =>
    TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot),
    );

  beforeEach(() => {
    auth = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: auth }, { provide: Router, useValue: router }],
    });
  });

  it('lets authenticated users through', () => {
    auth.isAuthenticated.and.returnValue(true);

    expect(run('/customers')).toBeTrue();
  });

  it('sends anonymous users to /login remembering where they wanted to go', () => {
    auth.isAuthenticated.and.returnValue(false);

    expect(run('/customers')).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/customers' } });
  });
});
