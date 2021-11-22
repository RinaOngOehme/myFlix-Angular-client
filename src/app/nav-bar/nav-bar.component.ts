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

  }



  //  navProfile(): void {
  //  this.router.navigate(['/profile'])
  //  .then(success => console.log('navigation success?', success))
  //.catch(console.error);
  //}

  // navMovies(): void {
  // this.router.navigate(['/movies'])
  // .then(success => console.log('navigation success?', success))
  // .catch(console.error);
  //}

  // Log out user
  navSignOut(): void {
    localStorage.clear();

    this.router.navigate(['/welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }


}
