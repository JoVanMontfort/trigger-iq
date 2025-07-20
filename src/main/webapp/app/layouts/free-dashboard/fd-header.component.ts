import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/auth/authentication.service';

@Component({
  selector: 'jhi-fd-header',
  templateUrl: './fd-header.component.html',
})
export class FdHeaderComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  logout(): void {
    this.authenticationService.logout(); // clear tokens/session
    this.router.navigate(['/login']); // redirect to login page
  }
}
