import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
/**
 * Registration form component. Handles all registration related
 * views. HTML is divided into 2 sections, the onboarding or background section
 * (left) and the form section (right).
 */
export class RegistrationFormComponent implements OnInit {
  /**
   * Declare the FormGroup and FormControls that will
   * handle all interaction with the form. Also declare
   * all pertinent validations.
   */
  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private service: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Declare getters for every FormControl inside FormGroup. This
   * enhances code readability.
   */
  get name() { return this.registrationForm.get('name'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  /**
   * Gets the correct error message for the name FormControl, depending on the
   * invalid Validator.
   * @returns A string representing the error message
   */
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'El nombre es requerido' : '';
  }

  /**
   * Gets the correct error message for the lastName FormControl, depending on the
   * invalid Validator.
   * @returns A string representing the error message
   */
  getLastNameErrorMessage() {
    return this.name.hasError('required') ? 'El apellido es requerido' : '';
  }

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
    return this.password.hasError('required') ? 'La contraseña es requerida' :
           this.password.hasError('minlength') ? 'La contraseña debe tener más de 8 caracteres' : '';
  }

  /**
   * Gets the correct error message for the confirmPassword FormControl, depending on the
   * invalid Validator.
   * @returns A string representing the error message
   */
  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'No olvides confirmar la contraseña' :
           this.confirmPassword.hasError('matchingPassword') ? 'Las contraseñas deben de coincidir' : '';
  }

  /**
   * Checks that the password and confirm password inputs match. If they don't,
   * sets the confirmPassword FormControl error to matchingPassword. Otherwise,
   * call service to register the user.
   */
  onRegistrationClick() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({
        matchingPassword: true
      });
    } else {
      if (this.registrationForm.valid) {
        this.service.registration({
          username: this.email.value,
          password: this.password.value,
          first_name: this.name.value,
          last_name: this.lastName.value
        }).subscribe(
          (resp) => {
            localStorage.setItem('jwt', resp.token);
            this.router.navigate(['app']);
          },
          (error) => {
            this.snackBar.open(error, 'Ok', {
              duration: 2000,
              horizontalPosition: 'right'
            });
          });
      }
    }
  }

}
