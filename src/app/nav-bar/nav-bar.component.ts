import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: any;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.user()
  }


  public getUser(): void {
    this.user = localStorage.getItem('user');
  }

  // Log out user
  signOut(): void {
    localStorage.clear();
    this.router.navigate(['Welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }


}
