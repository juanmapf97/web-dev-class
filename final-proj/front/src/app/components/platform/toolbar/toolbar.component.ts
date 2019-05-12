import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  name: string;

  constructor(private service: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.getUser().subscribe((resp) => {
      this.name = `${resp.first_name} ${resp.last_name}`;
    },
    (error) => {
      this.snackBar.open(error.error.message, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }

}
