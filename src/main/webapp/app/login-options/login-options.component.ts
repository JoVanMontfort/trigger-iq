import { Component } from '@angular/core';

@Component({
  selector: 'jhi-login-options',
  imports: [],
  templateUrl: './login-options.component.html',
  styleUrl: './login-options.component.scss',
})
export class LoginOptionsComponent {
  loginWith(provider: string): void {
    // This would redirect to OAuth endpoint
    window.location.href = `/oauth2/authorization/${provider}`;
  }
}
