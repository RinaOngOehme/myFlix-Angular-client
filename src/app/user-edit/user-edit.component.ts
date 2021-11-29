import { Component, OnInit, Input } from '@angular/core';

//API call
import { FetchApiDataService } from '../fetch-api-data.service';

//Angular material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  isLoading = false;

  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" }

  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


  /**
   * Update user's username, password, email and birthday
   * @param {object} user details
   */
  updateUser(): void {
    let user = localStorage.getItem("username")
    //updates the user information in the database
    this.fetchApiData.updateUser(this.userData, user).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Account Updated!", "OK", {
        duration: 2000
      })
      //resets the user in local storage
      localStorage.removeItem("username");
      localStorage.setItem("username", this.userData.Username)
      //refresh page to reflect changes made
      window.location.reload();
    }, (results) => {
      //something went wrong
      this.snackBar.open(results, "OK", {
        duration: 2000
      })
    })
  }

  /**
   * Cancel a dialog 
   */
  cancel(): void {
    this.dialogRef.close();
  }
}


