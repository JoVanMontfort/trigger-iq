import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-signup',
  templateUrl: './signup.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.warn('Signup data:', this.signupForm.value);
      // TODO: call signup service
    }
  }

  // get f() {
  //   return this.signupForm.controls;
  // }
}
