import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/platform/requests.service';
import { MatSnackBar } from '@angular/material';

export interface Request {
  boxes: number;
  status: string;
  time: Date;
  cost: number;
}

const statuses = [ 'En Proceso', 'Recogido', 'En Bodega' ];

let ELEMENT_DATA: Request[] = [];

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  displayedColumns: string[] = ['time', 'status', 'boxes', 'price', 'symbol'];
  dataSource = ELEMENT_DATA;
  totalBoxes = 0;
  totalCost = 0;

  constructor(private service: RequestsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.getRequests().subscribe((resp) => {
      for (const req in resp) {
        if (resp.hasOwnProperty(req)) {
          const element = resp[req];
          const cost = element.boxes.reduce((total, elem) => {
            return total + elem.price;
          }, 0);
          ELEMENT_DATA = ELEMENT_DATA.concat({
            boxes: element.boxes.length,
            status: statuses[element.status],
            time: new Date(element.time),
            cost
          });
          this.totalBoxes += element.boxes.length;
          this.totalCost += cost;
        }
      }
      this.dataSource = ELEMENT_DATA;
    },
    (error) => {
      this.snackBar.open(error.error.message, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }

}
