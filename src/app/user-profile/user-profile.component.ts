import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favorites: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  //this.fetchApiData.getUser(localStorage.getItem('username')).subscribe((results) => {
  // console.log(results);
  // cut off the unneeded part of the birthday
  // const birthday = results.Birthday.slice(0, 10);
  //assign the user variable
  //this.user = {
  // User: results.Username,
  // Email: results.Email,
  // Birthday: results.Birthday,
  //}
  //})
  /**
    * Opens dialog used to edit user information
    */
  openUserEdit(): void {
    this.dialog.open(UserEditComponent, {
      width: "500px"
    });
  }

  /**
   * Opens dialog used to delete a user account
   */
  openUserDelete(): void {
    this.dialog.open(UserDeleteComponent, {
      width: "500px"
    });
  }

  getFavorites(): void {

    this.fetchApiData.getUser(this.user).subscribe((resp: any) => {
      //get favorites to the favorites array
      this.favorites = resp.Favorites;
      return this.favorites;
    })
  }


  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }


}
