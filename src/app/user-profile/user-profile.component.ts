import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//API call
import { FetchApiDataService } from '../fetch-api-data.service';

//Angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
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


  /**
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();

  }

  /**
   * Get user data which includes name, email and birthday
   */
  getUser(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {

      this.user = res;
      this.user.Birthday = this.user.Birthday.slice(0, 10);
    });
  }

  /**
   * Filters out user's list of favorites
   * @param {string} movie_Title
   * @returns {array} favourite_Movies
   */

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie.Title)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
   * Gets all movies but filters out the user favorite movies
   * @param {object} movies
   * @returns {array} favourite_Movies
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.filterFavorites(); // Calls the filter function when calling movies to show only favorites
    });
  }


  /**
   * Opens modal with movie genre information
   * @param {string} Description
   * @param {string} Name   
   *  
   */
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

  /**
   * Opens modal with movie director information that includes name, bio and birthyear
   * @param {string} Name
   * @param {string} Bio
   * @param {string} Birthyear
   * 
   */
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

  /**
   * Opens modal with movie synopsis information
   * @param {string} movie_Description
   * @param {string} movie_Title
   */
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
   * Opens dialog component used to edit user information
   */
  openUserEdit(): void {
    this.dialog.open(UserEditComponent, {
      width: "500px"
    });
  }

  /**
   * Opens dialog component used to delete a user account
   */
  openUserDelete(): void {
    this.dialog.open(UserDeleteComponent, {
      width: "500px"
    });
  }


  /**
   * Gets user favorite movies
   */
  getFavorites(): void {

    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {

      this.favorites = res.FavoriteMovies
    });
  }
}






