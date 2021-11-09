import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user = {
    Username: "",
    Email: "",
    Birthday: ""
  }

  constructor(
    public fetchDataApi: FetchApiDataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchDataApi.getUser(localStorage.getItem("user")).subscribe((results) => {
      console.log(results);
      // cut off the unneeded part of the birthday
      const birthday = results.Birthday.slice(0, 10);
      //assign the user variable
      this.user = {
        Username: results.Username,
        Email: results.Email,
        Birthday: results.Birthday,
      }
    })
  }
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



}
