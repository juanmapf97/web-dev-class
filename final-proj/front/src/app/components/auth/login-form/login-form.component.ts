import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base-config/base.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
/**
 * Login form component. Handles all login related
 * views. HTML is divided into 2 sections, the onboarding or background section
 * (left) and the form section (right).
 */
export class LoginFormComponent implements OnInit {
  /**
   * Declare the FormGroup and FormControls that will
   * handle all interaction with the form. Also declare
   * all pertinent validations.
   */
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    remember: new FormControl(true)
  });

  constructor(private service: AuthService, private base: BaseService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Getters for every FormControl inside FormGroup. This
   * enhances code readability.
   */
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get remember() { return this.loginForm.get('remember'); }

  /**
   * Gets the correct error message for the email FormControl, depending on the
   * invalid Validator.
   * @returns A string representing the error message
   */
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'El correo electrónico es requerido' :
           this.email.hasError('email') ? 'Correo electrónico invalido' : '';
  }

  /**
   * Gets the correct error message for the password FormControl, depending on the
   * invalid Validator.
   * @returns A string representing the error message
   */
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'La contraseña es requerida' : '';
  }

  /**
   * Handles the login button clicked. Calls the login service with the
   * data from the FormGroup and redirects to home.
   */
  onLoginClick() {
    if (this.loginForm.valid) {
      this.service.login(this.email.value, this.password.value).subscribe(
        (resp) => {
          localStorage.setItem('jwt', resp.token);
          localStorage.setItem('is_admin', resp.user.is_admin);
          this.router.navigate(['app']);
        },
        (error) => {
          this.snackBar.open(error.error.error, 'Ok', {
            duration: 2000,
            horizontalPosition: 'right'
          });
        }
      );
    }
  }

}
