import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/platform/requests.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

export interface Request {
  id: string;
  boxes: number;
  status: string;
  time: Date;
  cost: number;
}

const statuses = [ 'En Proceso', 'Recogido', 'En Bodega' ];

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  displayedColumns: string[] = ['time', 'status', 'boxes', 'price', 'symbol'];
  ELEMENT_DATA: Request[] = [];
  dataSource = this.ELEMENT_DATA;
  totalBoxes = 0;
  totalCost = 0;
  isAdmin = (localStorage.getItem('is_admin') === 'true');

  constructor(private service: RequestsService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.service.getRequests().subscribe((resp) => {
      for (const req in resp) {
        if (resp.hasOwnProperty(req)) {
          const element = resp[req];
          const cost = element.boxes.reduce((total, elem) => {
            return total + elem.price;
          }, 0);
          this.ELEMENT_DATA = this.ELEMENT_DATA.concat({
            id: element._id,
            boxes: element.boxes.length,
            status: statuses[element.status],
            time: element.pickup_time,
            cost
          });
          this.totalBoxes += element.boxes.length;
          this.totalCost += cost;
        }
      }
      this.dataSource = this.ELEMENT_DATA;
    },
    (error) => {
      this.snackBar.open(error.error.message, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }

  onDetailClick(request) {
    this.router.navigate([`app/detail/${request.id}`]);
  }

  onNewClick() {
    this.router.navigate([`info-form`]);
  }

  onDeleteClick(request) {
    this.service.deleteRequest(request.id).subscribe((response) => {
      this.ELEMENT_DATA = [];
      this.totalBoxes = 0;
      this.totalCost = 0;
      this.service.getRequests().subscribe((resp) => {
        for (const req in resp) {
          if (resp.hasOwnProperty(req)) {
            const element = resp[req];
            const cost = element.boxes.reduce((total, elem) => {
              return total + elem.price;
            }, 0);
            this.ELEMENT_DATA = this.ELEMENT_DATA.concat({
              id: element._id,
              boxes: element.boxes.length,
              status: statuses[element.status],
              time: element.pickup_time,
              cost
            });
            this.totalBoxes += element.boxes.length;
            this.totalCost += cost;
          }
        }
        this.dataSource = this.ELEMENT_DATA;
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 2000,
          horizontalPosition: 'right'
        });
      });
    }, (error) => {
      this.snackBar.open(error.error.message, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }
}
