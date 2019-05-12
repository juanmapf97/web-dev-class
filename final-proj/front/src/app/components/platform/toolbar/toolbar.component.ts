import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  name: string;
  visible = false;

  constructor(private service: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.service.getUser().subscribe((resp) => {
      this.name = `${resp.first_name} ${resp.last_name}`;
    },
    (error) => {
      this.snackBar.open(error.error.error, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  onLogout() {
    this.service.logout().subscribe((resp) => {
      localStorage.removeItem('jwt');
      this.router.navigate(['auth/login']);
    },
    (error) => {
      this.snackBar.open(error.error.error, 'Ok', {
        duration: 2000,
        horizontalPosition: 'right'
      });
    });
  }

  onConfig() {

  }

}
