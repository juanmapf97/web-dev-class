import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { RequestsService } from 'src/app/services/platform/requests.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Request } from '../../services/platform/requests.service'

export interface Box {
  position: number,
  boxsize: number,
  desc: string
}

let ELEMENT_DATA: Box[] = [];

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

    step4Form = new FormGroup({
      boxsize: new FormControl('', [
        Validators.required,
        Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'), /* Only Allow Numbers To Be Entered In The Input */
      ]),
      desc: new FormControl('')
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

    constructor(private service: RequestsService, private snackBar: MatSnackBar,
      private router: Router) {}



    ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
    }


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

    /**
     * Gets the correct error message for the telephone FormControl, depending on the
     * invalid Validator.
     * @returns A string representing the error message
     */
    getboxsizeErrorMessage() {
      return (this.telephone.hasError('required')) ? 'El tamaño es requerido' :
              this.telephone.hasError('pattern') ? 'Solo utilizar numeros' : 'Tamaño Invalido';
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

  displayedColumns: string[] = ['select', 'position', 'boxsize', 'desc'];
  dataSource = new MatTableDataSource<Box>(ELEMENT_DATA);
  selection = new SelectionModel<Box>(true, []);
  totalBoxes = 0;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Box): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  selected(){
    return this.selection.selected.length > 0 ? true : false;
  }

  /**
   * Function to add a box to the list/table
   */
  addBox(){
    let boxsize = this.step4Form.get('boxsize').value;
    let desc = this.step4Form.get('desc').value;
    this.totalBoxes++;
    const data = this.dataSource.data;
        data.push({
          position: this.totalBoxes,
          boxsize: Number(boxsize),
          desc: desc
        });
    this.dataSource.data = data;
    this.step4Form.get('boxsize').setValue(0);
    this.step4Form.get('desc').setValue('');
  }

  data = Object.assign( ELEMENT_DATA);
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
       let index: number = this.data.findIndex(d => d === item);
       console.log(this.data.findIndex(d => d === item));
       this.data.splice(index,1)
       this.dataSource = new MatTableDataSource<Box>(this.data);
       setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
     });
     this.selection = new SelectionModel<Box>(true, []);
  }

  /**
   * Function to format the date to the 
   * desired format
   */
  formattedDate() {
    let d = this.date.value;
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${year}-${month}-${day}T${this.time.value}:00.000-06:00`;
  }

  /**
   * Function to create the Request Object
   * that is going to be used on POST
   */
  createRequestObject(){
    let boxes = []
    let date = this.formattedDate();
    this.data.forEach(row => {
      boxes.push({ size: row.boxsize, description: row.desc })
     });
     
     let req: Request =  {
      giver_first_name: this.firstName.value,
      giver_last_name: this.lastName.value,
      giver_phone: this.telephone.value,
      pickup_time: date,
      boxes: boxes,
      street: this.address.value,
      street_info: this.hint.value,
      colony: this.city.value,
      state: this.state.value,
      postal_code: this.postalCode.value,
      comments: this.comments.value,
      latitude: 21.21231,
      longitude: 122.2234
     }
     return req;
  }

  /**
   * Function to submit the request to the service.
   */
  finishForm(){
    let req = this.createRequestObject();

    this.service.postRequest(req).subscribe((resp) => {
      this.router.navigate(['app/requests']);
    },
    (error) => {
      this.snackBar.open(error.error.message, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }
}
