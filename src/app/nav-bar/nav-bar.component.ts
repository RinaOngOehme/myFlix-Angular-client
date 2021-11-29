import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Angular material
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: any;

  /**
   * @param snackBar
   * @param router
   */
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {

  }



  /**
   * Log out user
   */
  navSignOut(): void {
    localStorage.clear();

    this.router.navigate(['/welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }


}
