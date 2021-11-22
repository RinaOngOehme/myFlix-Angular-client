import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


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
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {

      this.user = res;
      this.user.Birthday = this.user.Birthday.slice(0, 10);
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

  getAllMovies(): void {

    this.fetchApiData.getAllMovies().subscribe((res: any) => {

      this.movies = res;
      console.log(this.movies);
      return this.filterFavorites(); // Calls the filter function when calling movies to show only favorites
    });
  }



  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      width: "500px",
      //data will be passed to the Genre component
      data: {
        genre: Name,
        description: Description,
      }
    });
  }


  openDirectorDialog(Name: string, Bio: string, Birthyear: any): void {
    this.dialog.open(MovieDirectorComponent, {
      width: "500px",
      //data will be passed to the Director component
      data: {
        name: Name,
        bio: Bio,
        birthyear: Birthyear,
      }
    });
  }

  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      width: "500px",
      //data will be passed to the Synopsis component
      data: {
        title: Title,
        description: Description,
      }
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


  openBackToMovies(): void {

    this.router.navigate(['/movies']);

  }
  //check for favorite movies under user's name
  getFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
    });
  }

  /*  isFavorite(Title: string): boolean {
     return this.favorites.includes(Title);
   };
  */

  /* onToggleFavoriteMovie(Title: string): any {
     if (this.isFavorite(Title)) {
       this.fetchApiData.removeFavoriteMovie(Title).subscribe((res: any) => {
        this.snackBar.open(`"${Title}" removed from your Favorites list!`,
           'OK', {
           duration: 2000,
        });
      });
       const index = this.favorites.indexOf(Title);
       return this.favorites.splice(index, 1);
     } else {
        this.fetchApiData.addFavoriteMovie(Title).subscribe((response: any) => {
         this.snackBar.open(`"${Title}" added to your Favorites list!`,
           'OK', {
          duration: 2000,
        });
       });
     }
     return this.favorites.push(Title);
      }
   */
}







