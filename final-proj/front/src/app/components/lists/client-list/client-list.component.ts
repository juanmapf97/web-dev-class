import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { BoxesService } from '../../../services/boxes/boxes.service'

export interface PeriodicElement {
  name: string;
  position: number;
  location: string;
  size: number;
  price: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, location: 'Bodega 1', name: 'Hydrogen', size: 1.0079, price: 111, status: 'Recogido'},
  {position: 2, location: 'Bodega 1', name: 'Helium', size: 4.0026, price: 200, status: 'En Bodega'},
  {position: 3, location: 'Bodega 1', name: 'Lithium', size: 6.941, price: 300, status: 'En Progreso'},
];


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(private boxesService: BoxesService) {}

  openPedir(): void {
    // this.bottomSheet.open(BottomSheetOverviewSheet);
  }

  ngOnInit(): void {
    let id = '5cd72f7a3e016036512b614b'
    this.boxesService.get_boxes(id).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'size', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}