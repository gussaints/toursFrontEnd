import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ToursService } from 'src/app/services/services.index';

@Component({
  selector: 'app-make-bus',
  templateUrl: './make-bus.component.html',
  styleUrls: ['./make-bus.component.sass']
})
export class MakeBusComponent implements OnInit {

  totalArray = 1;
  myForm: FormGroup;
  way2form: any;
  qtyRows = 5;
  totalSeats = 20;
  difRows: boolean;
  difSeats: boolean;

  constructor(
    private fb: FormBuilder,
    // tslint:disable-next-line: variable-name
    public _toursSrvc: ToursService
  )  { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name:  [null, Validators.compose([Validators.required])],
      qtyRows: [this.qtyRows, [Validators.required, Validators.min(5), Validators.max(20)]],
      totalSeats: [this.totalSeats, [Validators.required, Validators.min(20), Validators.max(60)]],
      num: [null, [Validators.required, Validators.min(1)]],
      way2form: this.fb.array([this.createRow(1)])
    });

  // set way2form to the myForm control containing way2form
    this.way2form = this.myForm.get('way2form') as FormArray;
  }

  createRow(numRow: number): FormGroup {
    return this.fb.group({
      totalSeats: [1, [Validators.required, Validators.min(2), Validators.max(4)]],
      numRow: [numRow, [Validators.minLength(numRow), Validators.maxLength(numRow)]]
    });
  }

  addRow() {
    const row = this.way2form.controls.length + 1;
    this.way2form.push(this.createRow(row));
  }

  get way2formGroup() {
    return this.myForm.get('way2form') as FormArray;
  }

  getway2formGroup(index): FormGroup {
    this.way2form = this.myForm.get('way2form') as FormArray;
    const formGroup = this.way2form.controls[index] as FormGroup;
    return formGroup;
  }

  removeRow(index) {
    this.way2form.removeAt(index);
  }

  saveBus(myrows) {
    console.log(this.myForm.value);
    console.log( '✂️✂️✂️✂️✂️✂️✂️' );
    console.log( myrows );
  }

  summingRows() {
    const allmyrowssum = this.myForm.value.way2form.length;
    const allmyrowsform = this.myForm.controls.qtyRows.value;
    this.difRows = allmyrowssum === allmyrowsform;

    console.log( `allmyrowssum ${allmyrowssum} === ${allmyrowsform} allmyrowsform = ${this.difRows}` );

    return this.difRows;

  }

  summingSeats() {
    const myrows = this.myForm.value.way2form;
    const totalseatsform = this.myForm.controls.totalSeats.value;
    let totalseatssum = 0;

    myrows.map((row: any) => {
      totalseatssum += row.totalSeats;
    });

    this.difSeats = totalseatssum === totalseatsform;
    console.log( `totalseatssum ${totalseatssum} === ${totalseatsform} totalseatsform = ${this.difSeats}` );

    return this.difSeats;
  }

  async verifying() {
    const difseats = await this.summingSeats();
    const difrows = await this.summingRows();
    let msgerror = '';
    const resultado = this.myForm.valid && difseats && difrows;

    if ( !resultado ) {
      msgerror = `Your form lacks some information`;
    }
    if ( !difseats ) {
      msgerror = `Total seats are not equal to the sum of seats per rows`;
    }
    if ( !difrows ) {
      msgerror = `Quantity rows is not equal to the sum of rows`;
    }
    if (!resultado) {
      swal('Error 🚨', `${msgerror}`, 'error');
    } else {
      this._toursSrvc.saveBus(this.myForm.value)
      .subscribe((info: any) => {
        swal('Success 🍏', `Your form is complete`, 'success');
      });
    }
  }

}
