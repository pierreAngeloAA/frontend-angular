import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-logout',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
