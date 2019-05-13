import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/platform/user.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface User {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = null;

  /**
   * Declare the FormGroup and FormControls that will
   * handle all interaction with the form. Also declare
   * all pertinent validations.
   */
  updateForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \-\']+')/* Only Allow Alpha Characters (Letters) To Be Entered In The Input*/
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \-\']+')/* Only Allow Alpha Characters (Letters) To Be Entered In The Input*/
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

  /**
   * Declare getters for every FormControl inside FormGroup. This
   * enhances code readability.
   */
  get firstName() { return this.updateForm.get('firstName'); }
  get lastName() { return this.updateForm.get('lastName'); }
  get email() { return this.updateForm.get('email'); }
  get password() { return this.updateForm.get('password'); }
  get confirmPassword() { return this.updateForm.get('confirmPassword'); }

  /**
     * Gets the correct error message for the first name FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    getfirstNameErrorMessage() {
      return (this.firstName.hasError('required')) ? 'El nombre es requerido' :
              this.firstName.hasError('pattern') ? 'Solo utilizar letras' : 'Nombre invalido';
    }

    /**
     * Gets the correct error message for the last name FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    getlastNameErrorMessage() {
      return (this.lastName.hasError('required')) ? 'El apellido es requerido' :
              this.lastName.hasError('pattern') ? 'Solo utilizar letras' : 'Nombre invalido';
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

  templateDrivenForm = 'This is contenteditable text for template-driven form';
  myControl = new FormControl;

  constructor(private service: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.getUserSelf().subscribe((resp) => {
      this.user = {
        first_name: resp.first_name,
        last_name: resp.last_name,
        email: resp.email,
        password: '**************'
    }
    this.myControl.setValue(`This is contenteditable text for reactive form`);
  },
    (error) => {
      this.snackBar.open(error.error.error, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'})
    }
    );
  }

  updateProfile = false;
  editText = 'Editar Perfil'
  onClick(){
    this.updateProfile = !this.updateProfile
    if(this.updateProfile){
      this.editText = 'Cancelar';
      this.firstName.setValue(this.user.first_name)
      this.lastName.setValue(this.user.last_name)
      this.email.setValue(this.user.email)
    }
    else{
      this.editText = 'Editar Perfil';
    }
  }

  /**
   * Checks that the password and confirm password inputs match. If they don't,
   * sets the confirmPassword FormControl error to matchingPassword. Otherwise,
   * call service to register the user.
   */
  onUpdateClick() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({
        matchingPassword: true
      });
    } else {
      if (this.updateForm.valid) {
        this.service.patchUserSelf({
          username: this.email.value,
          password: this.password.value,
          first_name: this.firstName.value,
          last_name: this.lastName.value
        }).subscribe(
          (resp) => {
            localStorage.setItem('jwt', resp.token);
            this.onClick()
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
