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
    //allows use of http requests, router, dialog
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {

  }




  //Permanently deletes account from the database
  deleteUser(): void {
    this.fetchApiData.deleteUser(localStorage.getItem('username')).subscribe(() => {

      this.dialogRef.close()
      // Logs user out
      localStorage.clear();

      // Refreshes and redirects to welcome view
      this.router.navigate(['/welcome']);
      this.snackBar.open(
        'Your account has successfully been deleted!',
        'OK',
        {
          duration: 3000,
        }
      );

    }
    );
  }

  //function to close dialog
  dontDelete(): void {
    this.dialogRef.close();
  }


}
