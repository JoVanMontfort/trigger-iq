import { Routes } from '@angular/router';
import { SignupComponent } from './signup.component';

export const signupRoute: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      pageTitle: 'Sign Up',
    },
  },
];
