import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {

  /**
   * This will disable any option of choosing a past date in the DatePicker
   */

    today = new Date();


  /**
   * Declare the FormGroup and FormControls that will
   * handle all interaction with the form. Also declare
   * all pertinent validations.
   */

    step1Form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \-\']+')/* Only Allow Alpha Characters (Letters) To Be Entered In The Input*/
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \-\']+')/* Only Allow Alpha Characters (Letters) To Be Entered In The Input*/
       ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'), /* Only Allow Numbers To Be Entered In The Input */
        Validators.minLength(8)/*Must Have a Minimun Length of 8 Digits*/
      ])
    });

    step2Form = new FormGroup({
      address: new FormControl('', [Validators.required]), /* This field must contain a value*/
      hint: new FormControl(''),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \-\']+'),   /* Only Allow Alpha Characters (Letters) To Be Entered In The Input*/
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \-\']+')    /* Only Allow Alpha Characters (Letters) To Be Entered In The Input*/
      ]),
      state: new FormControl('', [Validators.required]), /* This field must contain a value*/
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'), /* Only Allow Numbers To Be Entered In The Input*/
        Validators.maxLength(5), /* Must Have Exactly 5 Digits*/
        Validators.minLength(5)
      ])
    });

    step3Form = new FormGroup({
      date: new FormControl('', [Validators.required]), /* This field must contain a value*/
      time: new FormControl('', [Validators.required]), /* This field must contain a value*/
      comments: new FormControl('')
    });

    /**
     * States available for the client to choose when filling the address form.
     */
    states: any = [
      'Aguascalientes',
      'Baja California',
      'Baja California Sur',
      'Campeche',
      'Chiapas',
      'Chihuahua',
      'Coahuila de Zaragoza',
      'Colima',
      'Durango',
      'Estado de México',
      'Guanajuato',
      'Guerrero',
      'Hidalgo',
      'Jalisco',
      'Michoacán de Ocampo',
      'Morelos',
      'Nayarit',
      'Nuevo León',
      'Oaxaca',
      'Puebla',
      'Querétaro',
      'Quintana Roo',
      'San Luis Potosí',
      'Sinaloa',
      'Sonora',
      'Tabasco',
      'Tamaulipas',
      'Tlaxcala',
      'Veracruz de Ignacio de la Llave',
      'Yucatán',
      'Zacatecas'
  ];

    constructor() {}



    ngOnInit(): void {}


    /**
     * Declare getters for every FormControl inside FormGroup in step 1. This
     * enhances code readability.
     */
    get firstName() { return this.step1Form.get('firstName'); }
    get lastName() { return this.step1Form.get('lastName'); }
    get telephone() { return this.step1Form.get('telephone'); }

    /**
     * Declare getters for every FormControl inside FormGroup in step 2. This
     * enhances code readability.
     */
    get city() { return this.step2Form.get('city'); }
    get postalCode() { return this.step2Form.get('postalCode'); }
    get hint() { return this.step2Form.get('hint'); }
    get address() { return this.step2Form.get('address'); }
    get state() { return this.step2Form.get('state'); }

    /**
     * Declare getters for every FormControl inside FormGroup in step 3. This
     * enhances code readability.
     */
     get date() { return this.step3Form.get('date'); }
     get time() { return this.step3Form.get('time'); }
     get comments() { return this.step3Form.get('comments'); }


    /**
     * Gets the correct error message for the first name FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    getfirstNameErrorMessage() {
      console.log(this.firstName.value);
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
     * Gets the correct error message for the telephone FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    gettelephoneErrorMessage() {
      return (this.telephone.hasError('required')) ? 'El telefono es requerido' :
              this.telephone.hasError('pattern') ? 'Solo utilizar numeros' :
              this.telephone.hasError('minlength') ? 'Debe tener mas de 8 caracteres' : 'Telefono Invalido';
    }

    /**
     * Gets the correct error message for the city FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    getcityErrorMessage() {
      return (this.city.hasError('required')) ? 'El municipio es requerido' :
            this.city.hasError('pattern') ? 'Solo utilizar letras' : 'Ciudad Invalida';
    }

    /**
     * Gets the correct error message for the Postal Code FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    getpostalCodeErrorMessage() {
      return (this.postalCode.hasError('required')) ? 'El telefono es requerido' :
            this.postalCode.hasError('minlength') ? 'Debe tener 5 caracteres' :
            this.postalCode.hasError('maxlength') ? 'Debe tener 5 caracteres' :
            this.postalCode.hasError('pattern') ? 'Solo utilizar numeros' : 'Código Postal Invalido';
    }


    /** This function enables the user to click anywhere in the input field to access the calendar on the horizontal form */
    onClick1(event: any) {
      const element: any = document.getElementById('horizontal').childNodes[0];
      element.click();
  }
    /** This function enables the user to click anywhere in th input field to access the calendar on the vertical form */
    onClick2(event: any) {
      const element: any = document.getElementById('vertical').childNodes[0];
      element.click();
    }



}
