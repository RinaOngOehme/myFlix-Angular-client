import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//Angular material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//API call
import { FetchApiDataService } from '../fetch-api-data.service';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;
  @Input() userData = { Username: '', Password: '' };

  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * login user
   */
  userLogin(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.isLoading = false;

      // Logic for successful user login
      this.dialogRef.close();
      console.log(response)

      // Set username and password for local storage
      localStorage.setItem('username', this.userData.Username);
      localStorage.setItem('token', response.token);


      // to redirect 
      this.snackBar.open(this.userData.Username, 'Welcome!', {
        duration: 3000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.isLoading = false;
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    })
  }
}