import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  favorites: any = [];


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
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {

      this.user = res;
      this.getMovies();
    });
  }
  //getUser(): void {
  //  let user = localStorage.getItem('username');
  //  this.fetchApiData.getUser(user).subscribe((response: any) => {
  //    this.user = response;
  //  });
  //}

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie.Title)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  removeFavorites(Title: string): void {
    this.fetchApiData.removeFavoriteMovie(Title).subscribe(() => {
      this.snackBar.open(`${Title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
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

  //getFavorites(): void {

  //this.fetchApiData.getUser(this.user).subscribe((response: any) => {
  //get favorites to the favorites array
  // this.favorites = response.Favorites;
  // return this.favorites;
  //})
  //}



}
