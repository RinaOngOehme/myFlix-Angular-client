import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  dontDelete(): void {
    this.dialogRef.close
  }



  deleteUser(): void {
    this.fetchApiData.deleteUser(localStorage.getItem('username')).subscribe(() => {
      //upon success, this code runs to navigate to welcome screen and close the dialog
      this.dialogRef.close()
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open("Sorry That You Are Leaving Us, Your Account Has Been Deleted!", "OK", {
        duration: 2000
      })
    },
      //this code runs upon error, but http request may still succeed.
      (result) => {
        this.snackBar.open(result, "OK", {
          duration: 2000
        })
      })
  }




}
