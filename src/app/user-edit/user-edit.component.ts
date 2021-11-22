import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
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

  constructor(
    public fetchDataApi: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  updateUser(): void {
    let user = localStorage.getItem("username")
    //updates the user information in the database
    this.fetchDataApi.updateUser(this.userData, user).subscribe(() => {
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

  cancel(): void {
    this.dialogRef.close();
  }
}


