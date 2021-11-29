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

  user: any = {};


  /** 
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */
  constructor(
    //allows use of http requests, router, dialog
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {

  }

  /**
   * Cancel a dialog to not delete user
   */
  dontDelete(): void {
    this.dialogRef.close();
  }

  /**
   * Delete user 
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser(localStorage.getItem('username')).subscribe(() => {
      this.snackBar.open(
        'Your account has successfully been deleted!',
        'OK',
        {
          duration: 20000
        }
      );

      // Logs user out
      localStorage.clear();
    },
      (res: any) => {
        this.snackBar.open('Something went wrong, please try later.', 'Ok', {
          duration: 20000
        });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }
}







