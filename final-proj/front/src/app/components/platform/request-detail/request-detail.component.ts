import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from 'src/app/services/platform/requests.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  request: any;
  totalPrice = 0;

  constructor(private route: ActivatedRoute, private service: RequestsService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.service.getRequest(params.id).subscribe((resp) => {
        this.request = resp;
        this.totalPrice = resp.boxes.reduce((total, elem) => {
          return total + elem.price;
        }, 0);
      },
      (error) => {
        this.snackBar.open(error.error.error, 'Ok', {
          duration: 2000,
          horizontalPosition: 'right'
        });
      });
    });
  }

  onScheduleClick() {
    this.router.navigate([`receive-form/${this.request._id}`]);
  }

}
