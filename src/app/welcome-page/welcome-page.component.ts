import { Component, OnInit } from '@angular/core';

//Components
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

//Angular material
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   *
   * @param dialog
   */
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**
   * Opens dialog when signup button is clicked
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '480px'
    });
  }

  /**
   * Opens dialog when login button is clicked
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '480px'
    });
  }



}