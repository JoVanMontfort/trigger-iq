import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  loginWithGoogle(): void {
    // For JHipster OIDC-based login (e.g., Keycloak/Google)
    window.location.href = 'oauth2/authorization/google'; // your backend OIDC redirect

    // OR, if using Firebase/Auth0, integrate login logic here
  }
}
